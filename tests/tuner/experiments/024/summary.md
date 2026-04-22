# Tuner Experiment 024

- **Timestamp**: 2026-04-22T11:05:05.516Z
- **Fitness**: 0.6092
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.8046
- **Skill Expression**: 0.46 stages
- **Elapsed**: 0.2s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 0.8,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1.5,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.4000000000000001,
  "difficulty.hard_ai_penalty": 0.4,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 3,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1.4000000000000001,
  "skills.multiplier_base_multiplier": 1.35,
  "rules.blackjack_payout": 2.75,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.26 stages (max 9)
- **標準**: avg 3.48 stages (max 7)
- **困難**: avg 3.42 stages (max 7)

### 休闲玩家
- **入門**: avg 5.00 stages (max 10)
- **標準**: avg 3.90 stages (max 9)
- **困難**: avg 3.72 stages (max 9)

### 硬核玩家
- **入門**: avg 4.38 stages (max 11)
- **標準**: avg 4.08 stages (max 11)
- **困難**: avg 4.08 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.26 | 0.94 |
| 新手 | 標準 | 3 | 3.48 | 0.84 |
| 新手 | 困難 | 2 | 3.42 | 0.29 |
| 休闲玩家 | 入門 | 4.5 | 5.00 | 0.89 |
| 休闲玩家 | 標準 | 3.5 | 3.90 | 0.89 |
| 休闲玩家 | 困難 | 2.5 | 3.72 | 0.51 |
| 硬核玩家 | 入門 | 5 | 4.38 | 0.88 |
| 硬核玩家 | 標準 | 4.5 | 4.08 | 0.91 |
| 硬核玩家 | 困難 | 3.5 | 4.08 | 0.83 |

