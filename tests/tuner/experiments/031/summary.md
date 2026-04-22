# Tuner Experiment 031

- **Timestamp**: 2026-04-22T11:57:59.580Z
- **Fitness**: 0.5654
- **Previous Best**: 0.6415
- **Status**: ❌ No improvement
- **Balance Score**: 0.5430
- **Skill Expression**: 1.85 stages
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
- **入門**: avg 5.66 stages (max 12)
- **標準**: avg 4.14 stages (max 11)
- **困難**: avg 3.20 stages (max 8)

### 休闲玩家
- **入門**: avg 6.38 stages (max 12)
- **標準**: avg 4.62 stages (max 9)
- **困難**: avg 4.72 stages (max 9)

### 硬核玩家
- **入門**: avg 7.66 stages (max 12)
- **標準**: avg 6.04 stages (max 11)
- **困難**: avg 4.86 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 5.66 | 0.58 |
| 新手 | 標準 | 3 | 4.14 | 0.62 |
| 新手 | 困難 | 2 | 3.20 | 0.40 |
| 休闲玩家 | 入門 | 4.5 | 6.38 | 0.58 |
| 休闲玩家 | 標準 | 3.5 | 4.62 | 0.68 |
| 休闲玩家 | 困難 | 2.5 | 4.72 | 0.11 |
| 硬核玩家 | 入門 | 5 | 7.66 | 0.47 |
| 硬核玩家 | 標準 | 4.5 | 6.04 | 0.66 |
| 硬核玩家 | 困難 | 3.5 | 4.86 | 0.61 |

