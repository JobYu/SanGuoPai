# Tuner Experiment 037

- **Timestamp**: 2026-04-22T11:58:13.074Z
- **Fitness**: 0.5848
- **Previous Best**: 0.8546
- **Status**: ❌ No improvement
- **Balance Score**: 0.5803
- **Skill Expression**: 1.79 stages
- **Elapsed**: 0.0s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.25,
  "enemy.max_rounds_offset": -2,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.7000000000000002,
  "difficulty.hard_ai_penalty": 0.55,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 7,
  "skills.additive_base_multiplier": 0.8,
  "skills.multiplier_base_multiplier": 1.3,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 1.84 stages (max 10)
- **標準**: avg 1.58 stages (max 11)
- **困難**: avg 0.84 stages (max 5)

### 休闲玩家
- **入門**: avg 2.34 stages (max 10)
- **標準**: avg 1.92 stages (max 8)
- **困難**: avg 1.38 stages (max 7)

### 硬核玩家
- **入門**: avg 4.32 stages (max 11)
- **標準**: avg 3.12 stages (max 12)
- **困難**: avg 2.18 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 1.84 | 0.46 |
| 新手 | 標準 | 3 | 1.58 | 0.53 |
| 新手 | 困難 | 2 | 0.84 | 0.42 |
| 休闲玩家 | 入門 | 4.5 | 2.34 | 0.52 |
| 休闲玩家 | 標準 | 3.5 | 1.92 | 0.55 |
| 休闲玩家 | 困難 | 2.5 | 1.38 | 0.55 |
| 硬核玩家 | 入門 | 5 | 4.32 | 0.86 |
| 硬核玩家 | 標準 | 4.5 | 3.12 | 0.69 |
| 硬核玩家 | 困難 | 3.5 | 2.18 | 0.62 |

