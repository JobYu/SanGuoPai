# Tuner Experiment 007

- **Timestamp**: 2026-04-22T10:31:41.718Z
- **Fitness**: 0.3384
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4834
- **Skill Expression**: -1.00 stages
- **Elapsed**: 0.2s

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
- **入門**: avg 4.04 stages (max 9)
- **標準**: avg 3.22 stages (max 8)
- **困難**: avg 2.76 stages (max 7)

### 休闲玩家
- **入門**: avg 3.52 stages (max 8)
- **標準**: avg 2.70 stages (max 8)
- **困難**: avg 2.74 stages (max 7)

### 硬核玩家
- **入門**: avg 2.12 stages (max 7)
- **標準**: avg 2.22 stages (max 7)
- **困難**: avg 2.68 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 4.04 | 0.00 |
| 新手 | 標準 | 0.5 | 3.22 | 0.00 |
| 新手 | 困難 | 0 | 2.76 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.52 | 0.88 |
| 休闲玩家 | 標準 | 2.5 | 2.70 | 0.92 |
| 休闲玩家 | 困難 | 1 | 2.74 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.12 | 0.35 |
| 硬核玩家 | 標準 | 4 | 2.22 | 0.56 |
| 硬核玩家 | 困難 | 2.5 | 2.68 | 0.93 |

