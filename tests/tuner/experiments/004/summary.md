# Tuner Experiment 004

- **Timestamp**: 2026-04-22T10:27:59.105Z
- **Fitness**: 0.3575
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.5107
- **Skill Expression**: -0.36 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.8,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 18,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.4500000000000002,
  "difficulty.hard_ai_penalty": 0.30000000000000004,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 4,
  "skills.additive_base_multiplier": 1.7000000000000002,
  "skills.multiplier_base_multiplier": 1.6500000000000001,
  "rules.blackjack_payout": 1.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 5.58 stages (max 9)
- **標準**: avg 4.14 stages (max 9)
- **困難**: avg 3.24 stages (max 8)

### 休闲玩家
- **入門**: avg 3.68 stages (max 11)
- **標準**: avg 3.22 stages (max 10)
- **困難**: avg 2.20 stages (max 7)

### 硬核玩家
- **入門**: avg 4.46 stages (max 11)
- **標準**: avg 4.42 stages (max 9)
- **困難**: avg 3.00 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 5.58 | 0.00 |
| 新手 | 標準 | 0.5 | 4.14 | 0.00 |
| 新手 | 困難 | 0 | 3.24 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.68 | 0.92 |
| 休闲玩家 | 標準 | 2.5 | 3.22 | 0.71 |
| 休闲玩家 | 困難 | 1 | 2.20 | 0.00 |
| 硬核玩家 | 入門 | 6 | 4.46 | 0.74 |
| 硬核玩家 | 標準 | 4 | 4.42 | 0.90 |
| 硬核玩家 | 困難 | 2.5 | 3.00 | 0.80 |

