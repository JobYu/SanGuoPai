# Tuner Experiment 003

- **Timestamp**: 2026-04-22T10:27:59.026Z
- **Fitness**: 0.3676
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.5251
- **Skill Expression**: -0.13 stages
- **Elapsed**: 0.2s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.95,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.75,
  "difficulty.hard_multiplier": 1.35,
  "difficulty.hard_ai_penalty": 0.4,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.5,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.46 stages (max 8)
- **標準**: avg 3.36 stages (max 7)
- **困難**: avg 2.88 stages (max 7)

### 休闲玩家
- **入門**: avg 3.24 stages (max 8)
- **標準**: avg 3.14 stages (max 10)
- **困難**: avg 2.54 stages (max 7)

### 硬核玩家
- **入門**: avg 3.56 stages (max 9)
- **標準**: avg 3.04 stages (max 7)
- **困難**: avg 2.70 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.46 | 0.27 |
| 新手 | 標準 | 0.5 | 3.36 | 0.00 |
| 新手 | 困難 | 0 | 2.88 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.24 | 0.81 |
| 休闲玩家 | 標準 | 2.5 | 3.14 | 0.74 |
| 休闲玩家 | 困難 | 1 | 2.54 | 0.00 |
| 硬核玩家 | 入門 | 6 | 3.56 | 0.59 |
| 硬核玩家 | 標準 | 4 | 3.04 | 0.76 |
| 硬核玩家 | 困難 | 2.5 | 2.70 | 0.92 |

