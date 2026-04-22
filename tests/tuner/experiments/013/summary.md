# Tuner Experiment 013

- **Timestamp**: 2026-04-22T10:53:46.960Z
- **Fitness**: 0.2718
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.3883
- **Skill Expression**: -0.71 stages
- **Elapsed**: 0.4s

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
- **入門**: avg 4.60 stages (max 11)
- **標準**: avg 3.40 stages (max 8)
- **困難**: avg 3.22 stages (max 8)

### 休闲玩家
- **入門**: avg 4.40 stages (max 11)
- **標準**: avg 3.66 stages (max 8)
- **困難**: avg 3.28 stages (max 8)

### 硬核玩家
- **入門**: avg 3.08 stages (max 9)
- **標準**: avg 2.42 stages (max 8)
- **困難**: avg 3.60 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.60 | 0.00 |
| 新手 | 標準 | 0.5 | 3.40 | 0.00 |
| 新手 | 困難 | 0 | 3.22 | 0.00 |
| 休闲玩家 | 入門 | 4 | 4.40 | 0.90 |
| 休闲玩家 | 標準 | 2.5 | 3.66 | 0.54 |
| 休闲玩家 | 困難 | 1 | 3.28 | 0.00 |
| 硬核玩家 | 入門 | 6 | 3.08 | 0.51 |
| 硬核玩家 | 標準 | 4 | 2.42 | 0.60 |
| 硬核玩家 | 困難 | 2.5 | 3.60 | 0.56 |

