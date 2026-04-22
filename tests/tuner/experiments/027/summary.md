# Tuner Experiment 027

- **Timestamp**: 2026-04-22T11:05:22.434Z
- **Fitness**: 0.2772
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.3141
- **Skill Expression**: 0.57 stages
- **Elapsed**: 0.4s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1,
  "enemy.max_rounds_offset": 1,
  "enemy.ai_stand_threshold_base": 18,
  "enemy.ai_variance": 1.5,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.6500000000000001,
  "difficulty.hard_ai_penalty": 0.4,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.6500000000000001,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 6.88 stages (max 12)
- **標準**: avg 5.64 stages (max 12)
- **困難**: avg 4.66 stages (max 11)

### 休闲玩家
- **入門**: avg 6.80 stages (max 12)
- **標準**: avg 6.74 stages (max 12)
- **困難**: avg 5.00 stages (max 10)

### 硬核玩家
- **入門**: avg 7.16 stages (max 13)
- **標準**: avg 6.80 stages (max 12)
- **困難**: avg 4.94 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 6.88 | 0.28 |
| 新手 | 標準 | 3 | 5.64 | 0.12 |
| 新手 | 困難 | 2 | 4.66 | 0.00 |
| 休闲玩家 | 入門 | 4.5 | 6.80 | 0.49 |
| 休闲玩家 | 標準 | 3.5 | 6.74 | 0.07 |
| 休闲玩家 | 困難 | 2.5 | 5.00 | 0.00 |
| 硬核玩家 | 入門 | 5 | 7.16 | 0.57 |
| 硬核玩家 | 標準 | 4.5 | 6.80 | 0.49 |
| 硬核玩家 | 困難 | 3.5 | 4.94 | 0.59 |

