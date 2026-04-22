# Tuner Experiment 038

- **Timestamp**: 2026-04-22T11:58:13.165Z
- **Fitness**: 0.8550
- **Previous Best**: 0.8546
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.8471
- **Skill Expression**: 2.62 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.3,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1.5,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.7000000000000002,
  "difficulty.hard_ai_penalty": 0.65,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 7,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.1,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.82 stages (max 11)
- **標準**: avg 2.66 stages (max 8)
- **困難**: avg 2.34 stages (max 8)

### 休闲玩家
- **入門**: avg 4.74 stages (max 11)
- **標準**: avg 4.08 stages (max 10)
- **困難**: avg 3.06 stages (max 9)

### 硬核玩家
- **入門**: avg 7.62 stages (max 12)
- **標準**: avg 5.24 stages (max 11)
- **困難**: avg 3.82 stages (max 8)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 3.82 | 0.95 |
| 新手 | 標準 | 3 | 2.66 | 0.89 |
| 新手 | 困難 | 2 | 2.34 | 0.83 |
| 休闲玩家 | 入門 | 4.5 | 4.74 | 0.95 |
| 休闲玩家 | 標準 | 3.5 | 4.08 | 0.83 |
| 休闲玩家 | 困難 | 2.5 | 3.06 | 0.78 |
| 硬核玩家 | 入門 | 5 | 7.62 | 0.48 |
| 硬核玩家 | 標準 | 4.5 | 5.24 | 0.84 |
| 硬核玩家 | 困難 | 3.5 | 3.82 | 0.91 |

## Key Changes

[Tuner should document what changed and why here]