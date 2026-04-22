# Tuner Experiment 029

- **Timestamp**: 2026-04-22T11:05:23.024Z
- **Fitness**: 0.5582
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.7974
- **Skill Expression**: -0.44 stages
- **Elapsed**: 0.3s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.9,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 18,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.6500000000000001,
  "difficulty.hard_ai_penalty": 0.5,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 3,
  "player.hit_limit": 4,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.5,
  "rules.blackjack_payout": 2,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 5.38 stages (max 10)
- **標準**: avg 4.92 stages (max 11)
- **困難**: avg 2.98 stages (max 8)

### 休闲玩家
- **入門**: avg 5.40 stages (max 10)
- **標準**: avg 3.96 stages (max 9)
- **困難**: avg 2.78 stages (max 8)

### 硬核玩家
- **入門**: avg 4.26 stages (max 11)
- **標準**: avg 4.46 stages (max 9)
- **困難**: avg 3.24 stages (max 10)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 5.38 | 0.66 |
| 新手 | 標準 | 3 | 4.92 | 0.36 |
| 新手 | 困難 | 2 | 2.98 | 0.51 |
| 休闲玩家 | 入門 | 4.5 | 5.40 | 0.80 |
| 休闲玩家 | 標準 | 3.5 | 3.96 | 0.87 |
| 休闲玩家 | 困難 | 2.5 | 2.78 | 0.89 |
| 硬核玩家 | 入門 | 5 | 4.26 | 0.85 |
| 硬核玩家 | 標準 | 4.5 | 4.46 | 0.99 |
| 硬核玩家 | 困難 | 3.5 | 3.24 | 0.93 |

