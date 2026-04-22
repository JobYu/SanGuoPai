# Tuner Experiment 008

- **Timestamp**: 2026-04-22T10:31:41.782Z
- **Fitness**: 0.2882
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4117
- **Skill Expression**: -1.35 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.75,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 18,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.75,
  "difficulty.hard_multiplier": 1.4000000000000001,
  "difficulty.hard_ai_penalty": 0.45,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1,
  "skills.multiplier_base_multiplier": 1.7000000000000002,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.56 stages (max 10)
- **標準**: avg 3.22 stages (max 11)
- **困難**: avg 2.24 stages (max 8)

### 休闲玩家
- **入門**: avg 2.30 stages (max 8)
- **標準**: avg 2.42 stages (max 9)
- **困難**: avg 2.22 stages (max 9)

### 硬核玩家
- **入門**: avg 1.48 stages (max 12)
- **標準**: avg 1.94 stages (max 8)
- **困難**: avg 1.56 stages (max 6)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.56 | 0.22 |
| 新手 | 標準 | 0.5 | 3.22 | 0.00 |
| 新手 | 困難 | 0 | 2.24 | 0.00 |
| 休闲玩家 | 入門 | 4 | 2.30 | 0.57 |
| 休闲玩家 | 標準 | 2.5 | 2.42 | 0.97 |
| 休闲玩家 | 困難 | 1 | 2.22 | 0.00 |
| 硬核玩家 | 入門 | 6 | 1.48 | 0.25 |
| 硬核玩家 | 標準 | 4 | 1.94 | 0.48 |
| 硬核玩家 | 困難 | 2.5 | 1.56 | 0.62 |

