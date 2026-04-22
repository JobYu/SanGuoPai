# Tuner Experiment 006

- **Timestamp**: 2026-04-22T10:29:20.263Z
- **Fitness**: 0.2955
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4221
- **Skill Expression**: -0.17 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1,
  "enemy.max_rounds_offset": 1,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1.5,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.5,
  "difficulty.hard_ai_penalty": 0.5,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.6,
  "skills.multiplier_base_multiplier": 1.7000000000000002,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 5.38 stages (max 11)
- **標準**: avg 4.88 stages (max 10)
- **困難**: avg 3.22 stages (max 7)

### 休闲玩家
- **入門**: avg 4.48 stages (max 9)
- **標準**: avg 4.14 stages (max 11)
- **困難**: avg 3.56 stages (max 10)

### 硬核玩家
- **入門**: avg 5.08 stages (max 10)
- **標準**: avg 4.14 stages (max 10)
- **困難**: avg 3.74 stages (max 10)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 5.38 | 0.00 |
| 新手 | 標準 | 0.5 | 4.88 | 0.00 |
| 新手 | 困難 | 0 | 3.22 | 0.00 |
| 休闲玩家 | 入門 | 4 | 4.48 | 0.88 |
| 休闲玩家 | 標準 | 2.5 | 4.14 | 0.34 |
| 休闲玩家 | 困難 | 1 | 3.56 | 0.00 |
| 硬核玩家 | 入門 | 6 | 5.08 | 0.85 |
| 硬核玩家 | 標準 | 4 | 4.14 | 0.97 |
| 硬核玩家 | 困難 | 2.5 | 3.74 | 0.50 |

