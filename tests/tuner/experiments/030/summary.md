# Tuner Experiment 030

- **Timestamp**: 2026-04-22T11:05:23.318Z
- **Fitness**: 0.4829
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.5965
- **Skill Expression**: 0.65 stages
- **Elapsed**: 0.3s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.8,
  "enemy.max_rounds_offset": 1,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.4000000000000001,
  "difficulty.hard_ai_penalty": 0.45,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.4000000000000001,
  "skills.multiplier_base_multiplier": 1.7000000000000002,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 5.22 stages (max 12)
- **標準**: avg 4.28 stages (max 11)
- **困難**: avg 4.82 stages (max 11)

### 休闲玩家
- **入門**: avg 6.78 stages (max 12)
- **標準**: avg 4.86 stages (max 11)
- **困難**: avg 3.80 stages (max 9)

### 硬核玩家
- **入門**: avg 6.16 stages (max 12)
- **標準**: avg 5.34 stages (max 11)
- **困難**: avg 4.78 stages (max 10)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 5.22 | 0.70 |
| 新手 | 標準 | 3 | 4.28 | 0.57 |
| 新手 | 困難 | 2 | 4.82 | 0.00 |
| 休闲玩家 | 入門 | 4.5 | 6.78 | 0.49 |
| 休闲玩家 | 標準 | 3.5 | 4.86 | 0.61 |
| 休闲玩家 | 困難 | 2.5 | 3.80 | 0.48 |
| 硬核玩家 | 入門 | 5 | 6.16 | 0.77 |
| 硬核玩家 | 標準 | 4.5 | 5.34 | 0.81 |
| 硬核玩家 | 困難 | 3.5 | 4.78 | 0.63 |

