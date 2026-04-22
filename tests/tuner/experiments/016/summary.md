# Tuner Experiment 016

- **Timestamp**: 2026-04-22T10:54:52.640Z
- **Fitness**: 0.3156
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4509
- **Skill Expression**: -1.87 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.9,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 18,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.25,
  "difficulty.hard_ai_penalty": 0.35000000000000003,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1,
  "skills.multiplier_base_multiplier": 1.5,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 5.56 stages (max 11)
- **標準**: avg 4.62 stages (max 8)
- **困難**: avg 3.58 stages (max 7)

### 休闲玩家
- **入門**: avg 4.32 stages (max 11)
- **標準**: avg 3.90 stages (max 10)
- **困難**: avg 3.64 stages (max 11)

### 硬核玩家
- **入門**: avg 2.64 stages (max 12)
- **標準**: avg 2.84 stages (max 10)
- **困難**: avg 2.66 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 5.56 | 0.00 |
| 新手 | 標準 | 0.5 | 4.62 | 0.00 |
| 新手 | 困難 | 0 | 3.58 | 0.00 |
| 休闲玩家 | 入門 | 4 | 4.32 | 0.92 |
| 休闲玩家 | 標準 | 2.5 | 3.90 | 0.44 |
| 休闲玩家 | 困難 | 1 | 3.64 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.64 | 0.44 |
| 硬核玩家 | 標準 | 4 | 2.84 | 0.71 |
| 硬核玩家 | 困難 | 2.5 | 2.66 | 0.94 |

