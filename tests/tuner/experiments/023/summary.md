# Tuner Experiment 023

- **Timestamp**: 2026-04-22T11:05:05.297Z
- **Fitness**: 0.6415
- **Previous Best**: 0.5841
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.8431
- **Skill Expression**: 0.51 stages
- **Elapsed**: 0.6s

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
- **入門**: avg 5.00 stages (max 9)
- **標準**: avg 3.34 stages (max 9)
- **困難**: avg 2.94 stages (max 6)

### 休闲玩家
- **入門**: avg 5.14 stages (max 13)
- **標準**: avg 3.60 stages (max 12)
- **困難**: avg 3.26 stages (max 7)

### 硬核玩家
- **入門**: avg 4.42 stages (max 11)
- **標準**: avg 4.38 stages (max 9)
- **困難**: avg 4.02 stages (max 8)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 5.00 | 0.75 |
| 新手 | 標準 | 3 | 3.34 | 0.89 |
| 新手 | 困難 | 2 | 2.94 | 0.53 |
| 休闲玩家 | 入門 | 4.5 | 5.14 | 0.86 |
| 休闲玩家 | 標準 | 3.5 | 3.60 | 0.97 |
| 休闲玩家 | 困難 | 2.5 | 3.26 | 0.70 |
| 硬核玩家 | 入門 | 5 | 4.42 | 0.88 |
| 硬核玩家 | 標準 | 4.5 | 4.38 | 0.97 |
| 硬核玩家 | 困難 | 3.5 | 4.02 | 0.85 |

## Key Changes

[Tuner should document what changed and why here]