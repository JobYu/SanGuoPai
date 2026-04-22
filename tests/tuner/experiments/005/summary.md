# Tuner Experiment 005

- **Timestamp**: 2026-04-22T10:29:20.135Z
- **Fitness**: 0.3619
- **Previous Best**: 0.4409
- **Status**: ❌ No improvement
- **Balance Score**: 0.4713
- **Skill Expression**: 0.32 stages
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
- **入門**: avg 3.36 stages (max 6)
- **標準**: avg 3.54 stages (max 11)
- **困難**: avg 2.74 stages (max 6)

### 休闲玩家
- **入門**: avg 3.00 stages (max 7)
- **標準**: avg 3.58 stages (max 10)
- **困難**: avg 2.80 stages (max 9)

### 硬核玩家
- **入門**: avg 3.98 stages (max 11)
- **標準**: avg 3.30 stages (max 7)
- **困難**: avg 3.32 stages (max 7)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.36 | 0.32 |
| 新手 | 標準 | 0.5 | 3.54 | 0.00 |
| 新手 | 困難 | 0 | 2.74 | 0.00 |
| 休闲玩家 | 入門 | 4 | 3.00 | 0.75 |
| 休闲玩家 | 標準 | 2.5 | 3.58 | 0.57 |
| 休闲玩家 | 困難 | 1 | 2.80 | 0.00 |
| 硬核玩家 | 入門 | 6 | 3.98 | 0.66 |
| 硬核玩家 | 標準 | 4 | 3.30 | 0.82 |
| 硬核玩家 | 困難 | 2.5 | 3.32 | 0.67 |

