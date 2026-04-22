# Tuner Experiment 018

- **Timestamp**: 2026-04-22T10:56:28.425Z
- **Fitness**: 0.3177
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4539
- **Skill Expression**: -0.16 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.9500000000000001,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1.5,
  "difficulty.easy_multiplier": 0.8,
  "difficulty.hard_multiplier": 1.4500000000000002,
  "difficulty.hard_ai_penalty": 0.25,
  "player.hands_per_battle": 3,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1,
  "skills.multiplier_base_multiplier": 1.75,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.88 stages (max 10)
- **標準**: avg 3.50 stages (max 8)
- **困難**: avg 2.80 stages (max 7)

### 休闲玩家
- **入門**: avg 3.84 stages (max 9)
- **標準**: avg 3.92 stages (max 10)
- **困難**: avg 3.12 stages (max 7)

### 硬核玩家
- **入門**: avg 3.68 stages (max 10)
- **標準**: avg 3.00 stages (max 7)
- **困難**: avg 3.02 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.88 | 0.06 |
| 新手 | 標準 | 0.5 | 3.50 | 0.00 |
| 新手 | 困難 | 0 | 2.80 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.84 | 0.96 |
| 休闲玩家 | 標準 | 2.5 | 3.92 | 0.43 |
| 休闲玩家 | 困難 | 1 | 3.12 | 0.00 |
| 硬核玩家 | 入門 | 6 | 3.68 | 0.61 |
| 硬核玩家 | 標準 | 4 | 3.00 | 0.75 |
| 硬核玩家 | 困難 | 2.5 | 3.02 | 0.79 |

