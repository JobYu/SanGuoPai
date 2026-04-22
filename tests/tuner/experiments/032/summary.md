# Tuner Experiment 032

- **Timestamp**: 2026-04-22T11:57:59.725Z
- **Fitness**: 0.8085
- **Previous Best**: 0.6415
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.7264
- **Skill Expression**: 3.06 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.05,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.4500000000000002,
  "difficulty.hard_ai_penalty": 0.5,
  "player.hands_per_battle": 4,
  "player.discards_per_battle": 3,
  "player.hit_limit": 2,
  "player.initial_generals": 3,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1.2000000000000002,
  "skills.multiplier_base_multiplier": 1.75,
  "rules.blackjack_payout": 2.25,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.22 stages (max 11)
- **標準**: avg 3.10 stages (max 9)
- **困難**: avg 2.70 stages (max 11)

### 休闲玩家
- **入門**: avg 3.90 stages (max 12)
- **標準**: avg 4.52 stages (max 13)
- **困難**: avg 3.28 stages (max 12)

### 硬核玩家
- **入門**: avg 7.18 stages (max 13)
- **標準**: avg 6.60 stages (max 12)
- **困難**: avg 4.42 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 3.22 | 0.81 |
| 新手 | 標準 | 3 | 3.10 | 0.97 |
| 新手 | 困難 | 2 | 2.70 | 0.65 |
| 休闲玩家 | 入門 | 4.5 | 3.90 | 0.87 |
| 休闲玩家 | 標準 | 3.5 | 4.52 | 0.71 |
| 休闲玩家 | 困難 | 2.5 | 3.28 | 0.69 |
| 硬核玩家 | 入門 | 5 | 7.18 | 0.56 |
| 硬核玩家 | 標準 | 4.5 | 6.60 | 0.53 |
| 硬核玩家 | 困難 | 3.5 | 4.42 | 0.74 |

## Key Changes

[Tuner should document what changed and why here]