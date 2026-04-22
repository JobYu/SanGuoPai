#!/usr/bin/env node
/**
 * SanGuoPai Game Parameter Tuner
 *
 * Optimizes game balance by tuning parameters across player skill profiles.
 *
 * Usage:
 *   node run_tuner.js --runs 50
 *   node run_tuner.js --runs 50 --iterations 20
 *   node run_tuner.js --runs 50 --daemon
 */

import { runBatchWithParams } from './harness_params.js';
import { applyParams, defaultParams, paramSchema, randomizeParams, validateParams } from './game_params.js';
import { playerProfiles } from './player_profiles.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { createHash } from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI Args
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    runs: 50,
    iterations: 1,
    daemon: false,
    experimentDir: join(__dirname, 'experiments'),
    leaderboardPath: join(__dirname, 'experiments', 'leaderboard.json'),
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--runs':
        options.runs = parseInt(args[++i], 10);
        break;
      case '--iterations':
        options.iterations = parseInt(args[++i], 10);
        break;
      case '--daemon':
        options.daemon = true;
        break;
      case '--experiment-dir':
        options.experimentDir = args[++i];
        break;
    }
  }
  return options;
}

// ---------------------------------------------------------------------------
// Balance Targets
// ---------------------------------------------------------------------------

const DIFFICULTIES = ['入門', '標準', '困難'];

// Target average stages cleared for each (profile, difficulty) combo
// Adjusted to match actual game capability with new damage formula + partial bust
const BALANCE_TARGETS = {
  'newbie-入門':   4.0,
  'newbie-標準':   3.0,
  'newbie-困難':   2.0,
  'casual-入門':   4.5,
  'casual-標準':   3.5,
  'casual-困難':   2.5,
  'hardcore-入門': 5.0,
  'hardcore-標準': 4.5,
  'hardcore-困難': 3.5,
};

// Weights for each combo (higher = more important)
const TARGET_WEIGHTS = {
  'newbie-入門':   1.0,
  'newbie-標準':   0.8,
  'newbie-困難':   0.5,
  'casual-入門':   1.0,
  'casual-標準':   1.2,
  'casual-困難':   1.0,
  'hardcore-入門': 0.6,
  'hardcore-標準': 1.2,
  'hardcore-困難': 1.5,
};

// ---------------------------------------------------------------------------
// Fitness Calculation
// ---------------------------------------------------------------------------

function computeBalanceFitness(profileResults) {
  let totalScore = 0;
  let totalWeight = 0;
  let skillExpression = 0;

  for (const diff of DIFFICULTIES) {
    const newbieStages   = profileResults.newbie?.byDifficulty?.find(d => d.difficulty === diff)?.avgStagesCleared   || 0;
    const casualStages   = profileResults.casual?.byDifficulty?.find(d => d.difficulty === diff)?.avgStagesCleared   || 0;
    const hardcoreStages = profileResults.hardcore?.byDifficulty?.find(d => d.difficulty === diff)?.avgStagesCleared || 0;

    for (const [profile, stages] of [['newbie', newbieStages], ['casual', casualStages], ['hardcore', hardcoreStages]]) {
      const key = `${profile}-${diff}`;
      const target = BALANCE_TARGETS[key];
      const weight = TARGET_WEIGHTS[key];

      const error = Math.abs(stages - target);
      const normalizedError = error / Math.max(target, 1);
      const score = Math.max(0, 1 - normalizedError);

      totalScore += score * weight;
      totalWeight += weight;
    }

    // Skill expression: hardcore should outperform newbie significantly
    skillExpression += (hardcoreStages - newbieStages);
  }

  const balanceScore = totalScore / totalWeight; // 0~1
  const avgSkillExpression = skillExpression / DIFFICULTIES.length;
  // Normalize skill expression: expect at least 2 stages gap on average
  const skillBonus = Math.min(1, Math.max(0, avgSkillExpression / 3));

  // Final fitness: 70% balance + 30% skill expression
  const fitness = balanceScore * 0.7 + skillBonus * 0.3;

  return {
    fitness,
    balanceScore,
    skillBonus,
    avgSkillExpression,
    details: profileResults,
  };
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

function loadLeaderboard(path) {
  if (!existsSync(path)) return { entries: [], bestFitness: 0, bestExperiment: null };
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return { entries: [], bestFitness: 0, bestExperiment: null };
  }
}

function saveLeaderboard(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

function getNextExperimentId(dir) {
  if (!existsSync(dir)) return '001';
  const existing = readdirSync(dir)
    .filter(f => /^\d{3}$/.test(f))
    .map(f => parseInt(f, 10))
    .sort((a, b) => a - b);
  const next = existing.length > 0 ? existing[existing.length - 1] + 1 : 1;
  return String(next).padStart(3, '0');
}

// ---------------------------------------------------------------------------
// Experiment Runner
// ---------------------------------------------------------------------------

async function runTunerExperiment(params, options) {
  const startTime = Date.now();
  const expId = getNextExperimentId(options.experimentDir);
  const expDir = join(options.experimentDir, expId);

  console.log(`\n========================================`);
  console.log(`Tuner Experiment ${expId}`);
  console.log(`Runs: ${options.runs} per profile per difficulty`);
  console.log(`========================================\n`);

  // Validate params
  const errors = validateParams(params);
  if (errors.length > 0) {
    console.log('Parameter validation errors:', errors);
    return null;
  }

  // Apply params to game data
  const gameData = applyParams(params);

  // Run for each player profile
  const profileResults = {};
  for (const [profileKey, profile] of Object.entries(playerProfiles)) {
    console.log(`  Running ${profile.name}...`);
    const results = runBatchWithParams(profile.decide, gameData, {
      runs: options.runs,
      difficulties: DIFFICULTIES,
      verbose: false,
    });
    profileResults[profileKey] = results.summary;
    console.log(`    Avg stages: 入門=${results.summary.byDifficulty[0]?.avgStagesCleared.toFixed(2)} 標準=${results.summary.byDifficulty[1]?.avgStagesCleared.toFixed(2)} 困難=${results.summary.byDifficulty[2]?.avgStagesCleared.toFixed(2)}`);
  }

  const elapsed = (Date.now() - startTime) / 1000;
  const fitnessResult = computeBalanceFitness(profileResults);
  const fitness = fitnessResult.fitness;

  // Print summary
  console.log(`\n--- Results ---`);
  console.log(`Balance Score: ${fitnessResult.balanceScore.toFixed(4)}`);
  console.log(`Skill Expression: ${fitnessResult.avgSkillExpression.toFixed(2)} stages (bonus: ${fitnessResult.skillBonus.toFixed(4)})`);
  console.log(`Overall Fitness: ${fitness.toFixed(4)}`);
  console.log(`Elapsed: ${elapsed.toFixed(1)}s`);

  // Save experiment
  mkdirSync(expDir, { recursive: true });

  writeFileSync(
    join(expDir, 'params.json'),
    JSON.stringify(params, null, 2),
    'utf-8'
  );

  writeFileSync(
    join(expDir, 'results.json'),
    JSON.stringify({
      experimentId: expId,
      timestamp: new Date().toISOString(),
      options,
      fitness,
      balanceScore: fitnessResult.balanceScore,
      skillBonus: fitnessResult.skillBonus,
      avgSkillExpression: fitnessResult.avgSkillExpression,
      profileResults,
    }, null, 2),
    'utf-8'
  );

  // Load leaderboard and determine if improved
  const lb = loadLeaderboard(options.leaderboardPath);
  const isImprovement = fitness > lb.bestFitness;

  // Write summary markdown
  const summaryLines = [
    `# Tuner Experiment ${expId}`,
    ``,
    `- **Timestamp**: ${new Date().toISOString()}`,
    `- **Fitness**: ${fitness.toFixed(4)}`,
    `- **Previous Best**: ${lb.bestFitness.toFixed(4)}`,
    `- **Status**: ${isImprovement ? '✅ IMPROVEMENT' : '❌ No improvement'}`,
    `- **Balance Score**: ${fitnessResult.balanceScore.toFixed(4)}`,
    `- **Skill Expression**: ${fitnessResult.avgSkillExpression.toFixed(2)} stages`,
    `- **Elapsed**: ${elapsed.toFixed(1)}s`,
    ``,
    `## Parameter Changes`,
    ``,
    '```json',
    JSON.stringify(params, null, 2),
    '```',
    ``,
    `## Per-Profile Results`,
    ``,
    ...Object.entries(playerProfiles).map(([key, profile]) => {
      const r = profileResults[key];
      return [
        `### ${profile.name}`,
        ...r.byDifficulty.map(bd =>
          `- **${bd.difficulty}**: avg ${bd.avgStagesCleared.toFixed(2)} stages (max ${bd.maxStages})`
        ),
        '',
      ].join('\n');
    }),
    `## Targets vs Actual`,
    ``,
    '| Profile | Difficulty | Target | Actual | Score |',
    '|---------|------------|--------|--------|-------|',
    ...Object.entries(BALANCE_TARGETS).map(([key, target]) => {
      const [profile, diff] = key.split('-');
      const actual = profileResults[profile]?.byDifficulty?.find(d => d.difficulty === diff)?.avgStagesCleared || 0;
      const error = Math.abs(actual - target);
      const score = Math.max(0, 1 - error / Math.max(target, 1));
      return `| ${playerProfiles[profile]?.name || profile} | ${diff} | ${target} | ${actual.toFixed(2)} | ${score.toFixed(2)} |`;
    }),
    ``,
    isImprovement ? `## Key Changes\n\n[Tuner should document what changed and why here]` : '',
  ];

  writeFileSync(join(expDir, 'summary.md'), summaryLines.join('\n'), 'utf-8');

  // Update leaderboard
  lb.entries.push({
    id: expId,
    fitness,
    balanceScore: fitnessResult.balanceScore,
    skillExpression: fitnessResult.avgSkillExpression,
    timestamp: new Date().toISOString(),
    isImprovement,
  });
  lb.entries.sort((a, b) => b.fitness - a.fitness);

  if (isImprovement) {
    lb.bestFitness = fitness;
    lb.bestExperiment = expId;
    console.log(`\n🎉 NEW BEST! Fitness: ${fitness.toFixed(4)} (was ${lb.bestFitness.toFixed(4)})`);
  } else {
    console.log(`\n📊 Fitness: ${fitness.toFixed(4)} (best: ${lb.bestFitness.toFixed(4)})`);
  }

  saveLeaderboard(options.leaderboardPath, lb);

  return { expId, fitness, isImprovement, params, profileResults };
}

// ---------------------------------------------------------------------------
// Hill-Climbing Tuner Loop
// ---------------------------------------------------------------------------

async function hillClimb(options) {
  console.log('Starting hill-climbing parameter tuner...\n');

  let currentParams = { ...defaultParams };
  let currentFitness = 0;

  // First run with default params
  const baseline = await runTunerExperiment(currentParams, options);
  if (baseline) {
    currentFitness = baseline.fitness;
  }

  for (let iter = 0; iter < options.iterations; iter++) {
    console.log(`\n--- Iteration ${iter + 1}/${options.iterations} ---`);

    // Generate neighbor by randomizing current best params (smaller magnitude)
    const neighborParams = randomizeParams(currentParams, 0.15);
    const result = await runTunerExperiment(neighborParams, options);

    if (!result) continue;

    if (result.fitness > currentFitness) {
      console.log(`  ✅ Accepting new params (fitness ${result.fitness.toFixed(4)} > ${currentFitness.toFixed(4)})`);
      currentParams = { ...neighborParams };
      currentFitness = result.fitness;
    } else {
      console.log(`  ❌ Rejecting (fitness ${result.fitness.toFixed(4)} <= ${currentFitness.toFixed(4)})`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Tuning complete!`);
  console.log(`Best fitness: ${currentFitness.toFixed(4)}`);
  console.log('Best params:');
  console.log(JSON.stringify(currentParams, null, 2));
  console.log(`========================================`);

  return { bestParams: currentParams, bestFitness: currentFitness };
}

// ---------------------------------------------------------------------------
// Daemon Mode
// ---------------------------------------------------------------------------

async function daemonLoop(options) {
  console.log('Tuner daemon mode started. Watching for params changes...');
  console.log('Press Ctrl+C to stop.\n');

  let currentParams = { ...defaultParams };
  let currentFitness = 0;

  // Baseline
  const baseline = await runTunerExperiment(currentParams, options);
  if (baseline) currentFitness = baseline.fitness;

  let lastParamsHash = getFileHash(join(__dirname, 'game_params.js'));

  while (true) {
    await sleep(10000);

    const currentHash = getFileHash(join(__dirname, 'game_params.js'));
    if (currentHash === lastParamsHash) continue;

    lastParamsHash = currentHash;
    console.log(`\n[${new Date().toISOString()}] Detected game_params.js change, running experiment...`);

    // Re-run with current defaultParams (user may have edited game_params.js defaults)
    const result = await runTunerExperiment({ ...defaultParams }, options);

    if (!result) continue;

    if (result.fitness > currentFitness) {
      try {
        execSync(`git add tests/tuner/ && git commit -m "tuner-${result.expId}: fitness=${result.fitness.toFixed(4)}"`, {
          cwd: join(__dirname, '../..'),
          stdio: 'pipe',
        });
        console.log(`✅ Committed tuner experiment ${result.expId}`);
      } catch (err) {
        console.log('⚠️  Git commit failed:', err.message);
      }
    }

    console.log('\nWaiting for next change...');
  }
}

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------

function getFileHash(path) {
  try {
    const content = readFileSync(path, 'utf-8');
    return createHash('md5').update(content).digest('hex');
  } catch {
    return '';
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const options = parseArgs();

  // Ensure experiment dir exists
  mkdirSync(options.experimentDir, { recursive: true });

  if (options.daemon) {
    await daemonLoop(options);
  } else {
    await hillClimb(options);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
