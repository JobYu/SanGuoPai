# Tuner Experiment 002

- **Timestamp**: 2026-04-22T10:13:32.986Z
- **Fitness**: 0.4409
- **Previous Best**: 0.4114
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.5347
- **Skill Expression**: 0.67 stages
- **Elapsed**: 0.0s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.8500000000000001,
  "difficulty.hard_multiplier": 1.1500000000000001,
  "difficulty.hard_ai_penalty": 0.25,
  "player.hands_per_battle": 2,
  "player.discards_per_battle": 3,
  "player.hit_limit": 4,
  "player.initial_generals": 4,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 0.9,
  "skills.multiplier_base_multiplier": 0.9500000000000001,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 2.00 stages (max 4)
- **標準**: avg 2.00 stages (max 4)
- **困難**: avg 1.10 stages (max 3)

### 休闲玩家
- **入門**: avg 1.10 stages (max 4)
- **標準**: avg 1.00 stages (max 4)
- **困難**: avg 1.40 stages (max 3)

### 硬核玩家
- **入門**: avg 2.50 stages (max 4)
- **標準**: avg 2.20 stages (max 4)
- **困難**: avg 2.40 stages (max 4)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 2.00 | 1.00 |
| 新手 | 標準 | 0.5 | 2.00 | 0.00 |
| 新手 | 困難 | 0 | 1.10 | 0.00 |
| 休闲玩家 | 入門 | 4 | 1.10 | 0.28 |
| 休闲玩家 | 標準 | 2.5 | 1.00 | 0.40 |
| 休闲玩家 | 困難 | 1 | 1.40 | 0.60 |
| 硬核玩家 | 入門 | 6 | 2.50 | 0.42 |
| 硬核玩家 | 標準 | 4 | 2.20 | 0.55 |
| 硬核玩家 | 困難 | 2.5 | 2.40 | 0.96 |

## Key Changes

[Tuner should document what changed and why here]