# Tuner Experiment 010

- **Timestamp**: 2026-04-22T10:33:32.535Z
- **Fitness**: 0.2940
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4200
- **Skill Expression**: -0.09 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.8,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.75,
  "difficulty.hard_multiplier": 1.35,
  "difficulty.hard_ai_penalty": 0.25,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.6,
  "skills.multiplier_base_multiplier": 1.5,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": false
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.66 stages (max 11)
- **標準**: avg 3.60 stages (max 8)
- **困難**: avg 3.72 stages (max 9)

### 休闲玩家
- **入門**: avg 4.02 stages (max 9)
- **標準**: avg 3.74 stages (max 11)
- **困難**: avg 3.34 stages (max 8)

### 硬核玩家
- **入門**: avg 4.10 stages (max 9)
- **標準**: avg 3.62 stages (max 8)
- **困難**: avg 4.00 stages (max 10)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.66 | 0.00 |
| 新手 | 標準 | 0.5 | 3.60 | 0.00 |
| 新手 | 困難 | 0 | 3.72 | 0.00 |
| 休闲玩家 | 入門 | 4 | 4.02 | 1.00 |
| 休闲玩家 | 標準 | 2.5 | 3.74 | 0.50 |
| 休闲玩家 | 困難 | 1 | 3.34 | 0.00 |
| 硬核玩家 | 入門 | 6 | 4.10 | 0.68 |
| 硬核玩家 | 標準 | 4 | 3.62 | 0.91 |
| 硬核玩家 | 困難 | 2.5 | 4.00 | 0.40 |

