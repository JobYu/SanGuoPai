# Tuner Experiment 034

- **Timestamp**: 2026-04-22T11:58:12.844Z
- **Fitness**: 0.6462
- **Previous Best**: 0.8085
- **Status**: ❌ No improvement
- **Balance Score**: 0.6260
- **Skill Expression**: 2.08 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.55,
  "difficulty.hard_ai_penalty": 0.45,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1,
  "skills.multiplier_base_multiplier": 1.2000000000000002,
  "rules.blackjack_payout": 2.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.68 stages (max 9)
- **標準**: avg 3.68 stages (max 8)
- **困難**: avg 3.52 stages (max 8)

### 休闲玩家
- **入門**: avg 5.88 stages (max 11)
- **標準**: avg 4.72 stages (max 10)
- **困難**: avg 4.10 stages (max 10)

### 硬核玩家
- **入門**: avg 7.44 stages (max 12)
- **標準**: avg 6.02 stages (max 10)
- **困難**: avg 4.66 stages (max 8)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.68 | 0.83 |
| 新手 | 標準 | 3 | 3.68 | 0.77 |
| 新手 | 困難 | 2 | 3.52 | 0.24 |
| 休闲玩家 | 入門 | 4.5 | 5.88 | 0.69 |
| 休闲玩家 | 標準 | 3.5 | 4.72 | 0.65 |
| 休闲玩家 | 困難 | 2.5 | 4.10 | 0.36 |
| 硬核玩家 | 入門 | 5 | 7.44 | 0.51 |
| 硬核玩家 | 標準 | 4.5 | 6.02 | 0.66 |
| 硬核玩家 | 困難 | 3.5 | 4.66 | 0.67 |

