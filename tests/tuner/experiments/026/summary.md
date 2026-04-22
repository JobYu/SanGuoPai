# Tuner Experiment 026

- **Timestamp**: 2026-04-22T11:05:22.015Z
- **Fitness**: 0.5618
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.7864
- **Skill Expression**: 0.11 stages
- **Elapsed**: 0.2s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1500000000000001,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.35,
  "difficulty.hard_ai_penalty": 0.5,
  "player.hands_per_battle": 3,
  "player.discards_per_battle": 5,
  "player.hit_limit": 4,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 0.9,
  "skills.multiplier_base_multiplier": 1.1500000000000001,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.24 stages (max 9)
- **標準**: avg 2.84 stages (max 6)
- **困難**: avg 2.56 stages (max 6)

### 休闲玩家
- **入門**: avg 3.52 stages (max 10)
- **標準**: avg 2.68 stages (max 11)
- **困難**: avg 2.84 stages (max 6)

### 硬核玩家
- **入門**: avg 2.84 stages (max 7)
- **標準**: avg 3.36 stages (max 7)
- **困難**: avg 2.78 stages (max 5)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 3.24 | 0.81 |
| 新手 | 標準 | 3 | 2.84 | 0.95 |
| 新手 | 困難 | 2 | 2.56 | 0.72 |
| 休闲玩家 | 入門 | 4.5 | 3.52 | 0.78 |
| 休闲玩家 | 標準 | 3.5 | 2.68 | 0.77 |
| 休闲玩家 | 困難 | 2.5 | 2.84 | 0.86 |
| 硬核玩家 | 入門 | 5 | 2.84 | 0.57 |
| 硬核玩家 | 標準 | 4.5 | 3.36 | 0.75 |
| 硬核玩家 | 困難 | 3.5 | 2.78 | 0.79 |

