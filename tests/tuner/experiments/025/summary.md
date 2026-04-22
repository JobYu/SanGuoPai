# Tuner Experiment 025

- **Timestamp**: 2026-04-22T11:05:21.440Z
- **Fitness**: 0.6381
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.8430
- **Skill Expression**: 0.48 stages
- **Elapsed**: 1.3s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.95,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.5,
  "difficulty.hard_ai_penalty": 0.4,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.5,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.56 stages (max 10)
- **標準**: avg 3.78 stages (max 8)
- **困難**: avg 2.78 stages (max 7)

### 休闲玩家
- **入門**: avg 5.16 stages (max 10)
- **標準**: avg 4.24 stages (max 11)
- **困難**: avg 3.00 stages (max 8)

### 硬核玩家
- **入門**: avg 4.78 stages (max 12)
- **標準**: avg 4.06 stages (max 10)
- **困難**: avg 3.72 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.56 | 0.86 |
| 新手 | 標準 | 3 | 3.78 | 0.74 |
| 新手 | 困難 | 2 | 2.78 | 0.61 |
| 休闲玩家 | 入門 | 4.5 | 5.16 | 0.85 |
| 休闲玩家 | 標準 | 3.5 | 4.24 | 0.79 |
| 休闲玩家 | 困難 | 2.5 | 3.00 | 0.80 |
| 硬核玩家 | 入門 | 5 | 4.78 | 0.96 |
| 硬核玩家 | 標準 | 4.5 | 4.06 | 0.90 |
| 硬核玩家 | 困難 | 3.5 | 3.72 | 0.94 |

