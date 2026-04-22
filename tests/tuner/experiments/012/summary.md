# Tuner Experiment 012

- **Timestamp**: 2026-04-22T10:50:37.065Z
- **Fitness**: 0.2996
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4280
- **Skill Expression**: -1.55 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.05,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.75,
  "difficulty.hard_multiplier": 1.25,
  "difficulty.hard_ai_penalty": 0.35000000000000003,
  "player.hands_per_battle": 3,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 2,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.1,
  "skills.multiplier_base_multiplier": 1.7000000000000002,
  "rules.blackjack_payout": 2.25,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.08 stages (max 10)
- **標準**: avg 3.50 stages (max 9)
- **困難**: avg 2.70 stages (max 7)

### 休闲玩家
- **入門**: avg 3.10 stages (max 8)
- **標準**: avg 2.98 stages (max 8)
- **困難**: avg 2.96 stages (max 9)

### 硬核玩家
- **入門**: avg 1.20 stages (max 8)
- **標準**: avg 2.50 stages (max 8)
- **困難**: avg 1.92 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.08 | 0.00 |
| 新手 | 標準 | 0.5 | 3.50 | 0.00 |
| 新手 | 困難 | 0 | 2.70 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.10 | 0.78 |
| 休闲玩家 | 標準 | 2.5 | 2.98 | 0.81 |
| 休闲玩家 | 困難 | 1 | 2.96 | 0.00 |
| 硬核玩家 | 入門 | 6 | 1.20 | 0.20 |
| 硬核玩家 | 標準 | 4 | 2.50 | 0.63 |
| 硬核玩家 | 困難 | 2.5 | 1.92 | 0.77 |

