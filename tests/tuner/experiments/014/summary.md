# Tuner Experiment 014

- **Timestamp**: 2026-04-22T10:53:47.145Z
- **Fitness**: 0.3053
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4362
- **Skill Expression**: -0.83 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1500000000000001,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.8,
  "difficulty.hard_multiplier": 1.35,
  "difficulty.hard_ai_penalty": 0.45,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 3,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.5,
  "skills.multiplier_base_multiplier": 1.2000000000000002,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.20 stages (max 8)
- **標準**: avg 3.20 stages (max 7)
- **困難**: avg 2.74 stages (max 6)

### 休闲玩家
- **入門**: avg 3.34 stages (max 9)
- **標準**: avg 3.78 stages (max 8)
- **困難**: avg 3.32 stages (max 8)

### 硬核玩家
- **入門**: avg 2.22 stages (max 10)
- **標準**: avg 2.72 stages (max 9)
- **困難**: avg 2.70 stages (max 6)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.20 | 0.00 |
| 新手 | 標準 | 0.5 | 3.20 | 0.00 |
| 新手 | 困難 | 0 | 2.74 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.34 | 0.83 |
| 休闲玩家 | 標準 | 2.5 | 3.78 | 0.49 |
| 休闲玩家 | 困難 | 1 | 3.32 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.22 | 0.37 |
| 硬核玩家 | 標準 | 4 | 2.72 | 0.68 |
| 硬核玩家 | 困難 | 2.5 | 2.70 | 0.92 |

