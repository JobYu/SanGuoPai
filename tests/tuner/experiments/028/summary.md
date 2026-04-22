# Tuner Experiment 028

- **Timestamp**: 2026-04-22T11:05:22.743Z
- **Fitness**: 0.5125
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.6969
- **Skill Expression**: 0.25 stages
- **Elapsed**: 0.3s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1,
  "enemy.max_rounds_offset": 1,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.6,
  "difficulty.hard_ai_penalty": 0.30000000000000004,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.2000000000000002,
  "skills.multiplier_base_multiplier": 1.6,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.78 stages (max 10)
- **標準**: avg 4.38 stages (max 8)
- **困難**: avg 3.86 stages (max 10)

### 休闲玩家
- **入門**: avg 5.20 stages (max 10)
- **標準**: avg 5.22 stages (max 11)
- **困難**: avg 4.26 stages (max 10)

### 硬核玩家
- **入門**: avg 5.44 stages (max 12)
- **標準**: avg 4.50 stages (max 11)
- **困難**: avg 3.82 stages (max 10)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.78 | 0.80 |
| 新手 | 標準 | 3 | 4.38 | 0.54 |
| 新手 | 困難 | 2 | 3.86 | 0.07 |
| 休闲玩家 | 入門 | 4.5 | 5.20 | 0.84 |
| 休闲玩家 | 標準 | 3.5 | 5.22 | 0.51 |
| 休闲玩家 | 困難 | 2.5 | 4.26 | 0.30 |
| 硬核玩家 | 入門 | 5 | 5.44 | 0.91 |
| 硬核玩家 | 標準 | 4.5 | 4.50 | 1.00 |
| 硬核玩家 | 困難 | 3.5 | 3.82 | 0.91 |

