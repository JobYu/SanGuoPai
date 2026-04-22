# Tuner Experiment 011

- **Timestamp**: 2026-04-22T10:50:36.974Z
- **Fitness**: 0.2737
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.3910
- **Skill Expression**: -1.13 stages
- **Elapsed**: 0.3s

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
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.58 stages (max 10)
- **標準**: avg 4.20 stages (max 9)
- **困難**: avg 3.04 stages (max 7)

### 休闲玩家
- **入門**: avg 3.74 stages (max 10)
- **標準**: avg 3.40 stages (max 10)
- **困難**: avg 3.44 stages (max 11)

### 硬核玩家
- **入門**: avg 2.38 stages (max 9)
- **標準**: avg 2.36 stages (max 8)
- **困難**: avg 3.68 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.58 | 0.00 |
| 新手 | 標準 | 0.5 | 4.20 | 0.00 |
| 新手 | 困難 | 0 | 3.04 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.74 | 0.94 |
| 休闲玩家 | 標準 | 2.5 | 3.40 | 0.64 |
| 休闲玩家 | 困難 | 1 | 3.44 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.38 | 0.40 |
| 硬核玩家 | 標準 | 4 | 2.36 | 0.59 |
| 硬核玩家 | 困難 | 2.5 | 3.68 | 0.53 |

