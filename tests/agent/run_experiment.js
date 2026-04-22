#!/usr/bin/env node
/**
 * SanGuoPai Experiment Runner
 *
 * Usage:
 *   node run_experiment.js --runs 100 --difficulty 標準
 *   node run_experiment.js --runs 100 --difficulties 入門,標準,困難
 *   node run_experiment.js --runs 100 --verbose
 *   node run_experiment.js --daemon --runs 100
 *
 * In daemon mode, the runner waits for agent.js to be modified,
 * then automatically runs experiments and keeps/reverts based on fitness.
 */

import { runBatch } from './harness.js';
import { decide } from './agent.js';
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
    runs: 100,
    difficulties: ['標準'],
    verbose: false,
    daemon: false,
    experimentDir: join(__dirname, 'experiments'),
    leaderboardPath: join(__dirname, 'experiments', 'leaderboard.json'),
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--runs':
        options.runs = parseInt(args[++i], 10);
        break;
      case '--difficulty':
        options.difficulties = [args[++i]];
        break;
      case '--difficulties':
        options.difficulties = args[++i].split(',');
        break;
      case '--verbose':
        options.verbose = true;
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

async function runExperiment(options) {
  const startTime = Date.now();
  const expId = getNextExperimentId(options.experimentDir);
  const expDir = join(options.experimentDir, expId);

  console.log(`\n========================================`);
  console.log(`Experiment ${expId}`);
  console.log(`Runs: ${options.runs} per difficulty`);
  console.log(`Difficulties: ${options.difficulties.join(', ')}`);
  console.log(`========================================\n`);

  // Run batch
  const results = runBatch(decide, {
    runs: options.runs,
    difficulties: options.difficulties,
    verbose: options.verbose,
  });

  const elapsed = (Date.now() - startTime) / 1000;
  const fitness = results.summary.averageWeightedScore;

  // Print summary
  console.log(`\n--- Results ---`);
  console.log(`Total runs: ${results.summary.totalRuns}`);
  console.log(`Average weighted score (fitness): ${fitness.toFixed(3)}`);
  console.log(`Max stages cleared: ${results.summary.maxStagesCleared}`);
  console.log(`Elapsed: ${elapsed.toFixed(1)}s`);

  for (const bd of results.summary.byDifficulty) {
    console.log(`\n[${bd.difficulty}]`);
    console.log(`  Avg stages: ${bd.avgStagesCleared.toFixed(2)}`);
    console.log(`  Avg weighted: ${bd.avgWeightedScore.toFixed(3)}`);
    console.log(`  Max stages: ${bd.maxStages}`);
    console.log(`  Stage distribution:`, bd.stageDist);
  }

  // Save experiment
  mkdirSync(expDir, { recursive: true });

  // Copy agent snapshot
  copyFileSync(
    join(__dirname, 'agent.js'),
    join(expDir, 'agent.js')
  );

  // Save results
  writeFileSync(
    join(expDir, 'results.json'),
    JSON.stringify({
      experimentId: expId,
      timestamp: new Date().toISOString(),
      options,
      summary: results.summary,
    }, null, 2),
    'utf-8'
  );

  // Load leaderboard and determine if improved
  const lb = loadLeaderboard(options.leaderboardPath);
  const isImprovement = fitness > lb.bestFitness;

  // Write summary
  const summaryLines = [
    `# Experiment ${expId}`,
    ``,
    `- **Timestamp**: ${new Date().toISOString()}`,
    `- **Fitness**: ${fitness.toFixed(4)}`,
    `- **Previous Best**: ${lb.bestFitness.toFixed(4)}`,
    `- **Status**: ${isImprovement ? '✅ IMPROVEMENT' : '❌ No improvement'}`,
    `- **Max Stages**: ${results.summary.maxStagesCleared}`,
    `- **Elapsed**: ${elapsed.toFixed(1)}s`,
    ``,
    `## Per-Difficulty Results`,
    ``,
    ...results.summary.byDifficulty.map(bd =>
      `- **${bd.difficulty}**: avg ${bd.avgStagesCleared.toFixed(2)} stages, weighted ${bd.avgWeightedScore.toFixed(3)}`
    ),
    ``,
    `## Stage Distribution`,
    ``,
    '```json',
    JSON.stringify(results.summary.stageDistribution, null, 2),
    '```',
    ``,
    isImprovement ? `## Key Changes\n\n[Agent should document what changed and why here]` : '',
  ];

  writeFileSync(join(expDir, 'summary.md'), summaryLines.join('\n'), 'utf-8');

  // Update leaderboard
  lb.entries.push({
    id: expId,
    fitness,
    maxStages: results.summary.maxStagesCleared,
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

  return { expId, fitness, isImprovement, results };
}

// ---------------------------------------------------------------------------
// Daemon Mode
// ---------------------------------------------------------------------------

async function daemonLoop(options) {
  console.log('Daemon mode started. Watching for agent.js changes...');
  console.log('Press Ctrl+C to stop.\n');

  let lastAgentHash = getFileHash(join(__dirname, 'agent.js'));

  while (true) {
    await sleep(5000);

    const currentHash = getFileHash(join(__dirname, 'agent.js'));
    if (currentHash === lastAgentHash) continue;

    lastAgentHash = currentHash;
    console.log(`\n[${new Date().toISOString()}] Detected agent.js change, running experiment...`);

    const result = await runExperiment(options);

    if (result.isImprovement) {
      // Commit the improvement
      try {
        execSync(`git add agent.js experiments/ && git commit -m "exp-${result.expId}: fitness=${result.fitness.toFixed(4)}"`, {
          cwd: __dirname,
          stdio: 'pipe',
        });
        console.log(`✅ Committed experiment ${result.expId}`);
      } catch (err) {
        console.log('⚠️  Git commit failed:', err.message);
      }
    } else {
      // Revert agent.js to last committed version
      try {
        execSync('git checkout -- agent.js', { cwd: __dirname, stdio: 'pipe' });
        console.log(`🔄 Reverted agent.js to previous best`);
      } catch (err) {
        console.log('⚠️  Git revert failed:', err.message);
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
    await runExperiment(options);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
