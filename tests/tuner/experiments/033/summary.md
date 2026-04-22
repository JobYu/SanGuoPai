# Tuner Experiment 033

- **Timestamp**: 2026-04-22T11:58:12.690Z
- **Fitness**: 0.5725
- **Previous Best**: 0.8085
- **Status**: ❌ No improvement
- **Balance Score**: 0.5150
- **Skill Expression**: 2.12 stages
- **Elapsed**: 0.3s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.95,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.5,
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
- **入門**: avg 5.46 stages (max 12)
- **標準**: avg 4.40 stages (max 12)
- **困難**: avg 3.38 stages (max 9)

### 休闲玩家
- **入門**: avg 6.28 stages (max 12)
- **標準**: avg 5.28 stages (max 12)
- **困難**: avg 3.94 stages (max 8)

### 硬核玩家
- **入門**: avg 7.84 stages (max 12)
- **標準**: avg 6.66 stages (max 11)
- **困難**: avg 5.10 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 5.46 | 0.64 |
| 新手 | 標準 | 3 | 4.40 | 0.53 |
| 新手 | 困難 | 2 | 3.38 | 0.31 |
| 休闲玩家 | 入門 | 4.5 | 6.28 | 0.60 |
| 休闲玩家 | 標準 | 3.5 | 5.28 | 0.49 |
| 休闲玩家 | 困難 | 2.5 | 3.94 | 0.42 |
| 硬核玩家 | 入門 | 5 | 7.84 | 0.43 |
| 硬核玩家 | 標準 | 4.5 | 6.66 | 0.52 |
| 硬核玩家 | 困難 | 3.5 | 5.10 | 0.54 |

