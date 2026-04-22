# SanGuoPai Auto-Play Agent — Research Program

## Objective

Develop an autonomous decision-making agent for SanGuoPai that maximizes the weighted stage clear score across all difficulty levels.

## Fitness Metric (Primary)

```
fitness = average_weighted_stages_cleared_per_run

where per-run score =
  sum of (stage_index * difficulty_multiplier) for each cleared stage

difficulty_multiplier:
  入门 (easy):   1.0
  標準 (normal): 2.0
  困難 (hard):   3.5
```

The agent is evaluated on 100 consecutive runs on 標準 difficulty. The score is the average weighted stage clear count. Higher is better.

## What You Can Modify

**ONLY `agent.js`.** Specifically, only the `decide()` function and any helper functions it calls.

You MUST NOT modify:
- `harness.js` (test framework)
- `run_experiment.js` (experiment runner)
- Game engine files in `js/engine/`
- Game data JSON files

## State Interface

The `decide(state)` function receives a `state` object with the following fields:

```javascript
{
  // --- Player State ---
  playerPoints: number,           // Current hand total points
  playerCards: Card[],            // Current hand cards
  hitsThisRound: number,          // How many hits taken this round (0-3)
  hitLimit: number,               // Max hits per round (usually 3)
  handsRemaining: number,         // Hands left this battle
  discardsRemaining: number,      // Discards left this battle
  selectedCardIndices: number[],  // Currently selected cards for discard

  // --- Enemy State ---
  enemyVisibleCard: Card|null,    // Enemy's face-up card (null if unknown)
  enemyPoints: number,            // Enemy total points (only visible after reveal)
  enemyTendency: string,          // '莽撞' | '穩健' | '狡詐'
  enemyStandThreshold: number,    // Enemy's stand threshold

  // --- Battle Context ---
  battleMoney: number,            // Money earned so far this battle
  moneyTarget: number,            // Target to clear this stage
  currentRound: number,           // Current round (1-based)
  maxRounds: number,              // Max rounds allowed
  money: number,                  // Total accumulated money (for shop)
  difficulty: string,             // '入門' | '標準' | '困難'

  // --- Loadout ---
  selectedGenerals: General[],    // Equipped generals with skills
  schemes: Scheme[],              // Available schemes
  relics: Relic[],                // Equipped relics
  maxSlots: number,               // Max general slots

  // --- Derived / Useful ---
  canHit: boolean,                // Can take another card
  canStand: boolean,              // Can stand
  canDoubleDown: boolean,         // Can double down
  canSplit: boolean,              // Can split pair
  canDiscard: boolean,            // Can discard selected cards
  roundsRemaining: number,        // maxRounds - currentRound
  progressRatio: number,          // battleMoney / moneyTarget (0-1+)
}
```

## Action Interface

The `decide()` function must return an object:

```javascript
{
  action: 'HIT' | 'STAND' | 'PLAY_HAND' | 'DOUBLE_DOWN' | 'SPLIT' | 'DISCARD' | 'USE_SCHEME',
  // Optional params depending on action:
  schemeIndex?: number,           // For USE_SCHEME
}
```

Actions:
- `HIT`: Draw another card
- `STAND`: End turn for this hand (auto-stand if only one hand)
- `PLAY_HAND`: Commit hand, resolve against enemy (consumes 1 hand)
- `DOUBLE_DOWN`: Double bet, draw 1 card, auto-stand
- `SPLIT`: Split pair into two hands
- `DISCARD`: Discard selected cards and redraw
- `USE_SCHEME`: Use a scheme (requires schemeIndex)

## Constraints

1. **Simplicity Rule**: The `decide()` function must be UNDER 150 lines of code (excluding comments). Simpler strategies are preferred over complex nested conditionals.

2. **Deterministic Rule**: The strategy should be deterministic given the same state. Do not use `Math.random()` inside `decide()`. Randomness comes from the game engine only.

3. **No Future Peeking**: The agent must not use information not available to a human player (e.g., enemy hidden card before reveal).

4. **Fallback Rule**: If the agent returns an invalid action, the harness falls back to a safe default (usually STAND then PLAY_HAND).

5. **Never Stop Rule**: If running in daemon mode, the loop continues indefinitely. Each experiment runs exactly 100 games. Improvements are committed; regressions are reverted.

## Strategy Guidelines

### Basic Blackjack Heuristics (starting point)
- Generally stand at 17+ points
- Generally hit at 11 or below
- Consider enemy visible card for borderline decisions (12-16)

### Game-Specific Considerations
- **Money target pressure**: If `progressRatio` is low and `roundsRemaining` is few, be more aggressive
- **Hands as resource**: You have limited hands (3) per battle. Don't waste them on weak positions.
- **Discard value**: Discards can turn bad hands into good ones. Use them when playerPoints < 15 and you have discards remaining.

### General Synergies to Consider
- **關羽 (Guan Yu)**: Skill triggers at 20 or 21 → slightly more aggressive pursuit of high points
- **張遼 (Zhang Liao)**: Bonus for 0 hits → consider standing on initial deal more often
- **周瑜 (Zhou Yu)**: Bonus for ≥2 hits → hit more aggressively
- **孫尚香 (Sun Shangxiang)**: Bonus for 2+ same suit → slightly favor keeping same-suit cards
- **諸葛亮 (Zhuge Liang)**: 2.2x multiplier if no bust → be more conservative near 17+
- **夏侯惇 (Xiahou Dun)**: Bust gives next-round buff → can tolerate more risk
- **張角 (Zhang Jiao)**: Flat +60 → consistent value, no playstyle change needed

### Difficulty Scaling
- 困難: Enemy gets threshold modifier (-1 to -2), 25% chance to penalize on loss
- Adjust stand threshold down by 1-2 points in hard mode

## Experiment Protocol

1. Read current `agent.js`
2. Propose ONE focused improvement (e.g., "tune stand threshold for hard mode" or "add suit-awareness for Sun Shangxiang")
3. Run experiment: `node run_experiment.js --runs 100`
4. Compare fitness against previous best
5. If fitness improves by ≥1% → `git add agent.js && git commit -m "exp-XXX: [description]"`
6. If fitness regresses → `git checkout -- agent.js`
7. Record experiment in `experiments/XXX/summary.md`
8. GOTO 1

## Current Best

Check `experiments/leaderboard.json` for the current best fitness and the strategy that achieved it.

## NEVER STOP

Keep iterating. Even small improvements compound. Document what you learn in experiment summaries.
