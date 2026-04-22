# Tuner Experiment 019

- **Timestamp**: 2026-04-22T10:59:06.197Z
- **Fitness**: 0.3090
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4414
- **Skill Expression**: -0.33 stages
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
- **入門**: avg 3.98 stages (max 9)
- **標準**: avg 3.50 stages (max 9)
- **困難**: avg 2.94 stages (max 7)

### 休闲玩家
- **入門**: avg 4.12 stages (max 10)
- **標準**: avg 3.92 stages (max 10)
- **困難**: avg 3.70 stages (max 11)

### 硬核玩家
- **入門**: avg 2.62 stages (max 8)
- **標準**: avg 3.56 stages (max 9)
- **困難**: avg 3.24 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.98 | 0.01 |
| 新手 | 標準 | 0.5 | 3.50 | 0.00 |
| 新手 | 困難 | 0 | 2.94 | 0.00 |
| 休闲玩家 | 入門 | 4 | 4.12 | 0.97 |
| 休闲玩家 | 標準 | 2.5 | 3.92 | 0.43 |
| 休闲玩家 | 困難 | 1 | 3.70 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.62 | 0.44 |
| 硬核玩家 | 標準 | 4 | 3.56 | 0.89 |
| 硬核玩家 | 困難 | 2.5 | 3.24 | 0.70 |

