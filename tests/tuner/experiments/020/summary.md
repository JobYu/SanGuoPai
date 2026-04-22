# Tuner Experiment 020

- **Timestamp**: 2026-04-22T10:59:06.296Z
- **Fitness**: 0.3334
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4763
- **Skill Expression**: -0.58 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.9,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.75,
  "difficulty.hard_multiplier": 1.4000000000000001,
  "difficulty.hard_ai_penalty": 0.5,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 3,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1.3,
  "skills.multiplier_base_multiplier": 1.3,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.32 stages (max 10)
- **標準**: avg 2.48 stages (max 10)
- **困難**: avg 2.66 stages (max 9)

### 休闲玩家
- **入門**: avg 3.18 stages (max 11)
- **標準**: avg 2.92 stages (max 11)
- **困難**: avg 2.42 stages (max 9)

### 硬核玩家
- **入門**: avg 2.64 stages (max 10)
- **標準**: avg 2.18 stages (max 10)
- **困難**: avg 1.90 stages (max 8)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.32 | 0.34 |
| 新手 | 標準 | 0.5 | 2.48 | 0.00 |
| 新手 | 困難 | 0 | 2.66 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.18 | 0.80 |
| 休闲玩家 | 標準 | 2.5 | 2.92 | 0.83 |
| 休闲玩家 | 困難 | 1 | 2.42 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.64 | 0.44 |
| 硬核玩家 | 標準 | 4 | 2.18 | 0.55 |
| 硬核玩家 | 困難 | 2.5 | 1.90 | 0.76 |

