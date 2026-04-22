# Tuner Experiment 022

- **Timestamp**: 2026-04-22T11:03:02.446Z
- **Fitness**: 0.5698
- **Previous Best**: 0.5841
- **Status**: ❌ No improvement
- **Balance Score**: 0.8141
- **Skill Expression**: -0.37 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1500000000000001,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 0.5,
  "difficulty.easy_multiplier": 0.65,
  "difficulty.hard_multiplier": 1.5,
  "difficulty.hard_ai_penalty": 0.35000000000000003,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 4,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 4,
  "skills.additive_base_multiplier": 1.2000000000000002,
  "skills.multiplier_base_multiplier": 1.3,
  "rules.blackjack_payout": 2.25,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 4.94 stages (max 10)
- **標準**: avg 3.10 stages (max 7)
- **困難**: avg 2.84 stages (max 6)

### 休闲玩家
- **入門**: avg 4.20 stages (max 11)
- **標準**: avg 3.24 stages (max 7)
- **困難**: avg 3.22 stages (max 7)

### 硬核玩家
- **入門**: avg 3.42 stages (max 10)
- **標準**: avg 3.44 stages (max 8)
- **困難**: avg 2.92 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.94 | 0.76 |
| 新手 | 標準 | 3 | 3.10 | 0.97 |
| 新手 | 困難 | 2 | 2.84 | 0.58 |
| 休闲玩家 | 入門 | 4.5 | 4.20 | 0.93 |
| 休闲玩家 | 標準 | 3.5 | 3.24 | 0.93 |
| 休闲玩家 | 困難 | 2.5 | 3.22 | 0.71 |
| 硬核玩家 | 入門 | 5 | 3.42 | 0.68 |
| 硬核玩家 | 標準 | 4.5 | 3.44 | 0.76 |
| 硬核玩家 | 困難 | 3.5 | 2.92 | 0.83 |

