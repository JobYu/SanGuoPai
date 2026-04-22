# Tuner Experiment 021

- **Timestamp**: 2026-04-22T11:03:02.324Z
- **Fitness**: 0.5841
- **Previous Best**: 0.4409
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.8344
- **Skill Expression**: -0.25 stages
- **Elapsed**: 0.2s

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
- **入門**: avg 4.24 stages (max 9)
- **標準**: avg 3.64 stages (max 10)
- **困難**: avg 3.04 stages (max 6)

### 休闲玩家
- **入門**: avg 5.14 stages (max 11)
- **標準**: avg 3.44 stages (max 9)
- **困難**: avg 2.84 stages (max 7)

### 硬核玩家
- **入門**: avg 3.88 stages (max 12)
- **標準**: avg 3.24 stages (max 8)
- **困難**: avg 3.04 stages (max 11)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 4.24 | 0.94 |
| 新手 | 標準 | 3 | 3.64 | 0.79 |
| 新手 | 困難 | 2 | 3.04 | 0.48 |
| 休闲玩家 | 入門 | 4.5 | 5.14 | 0.86 |
| 休闲玩家 | 標準 | 3.5 | 3.44 | 0.98 |
| 休闲玩家 | 困難 | 2.5 | 2.84 | 0.86 |
| 硬核玩家 | 入門 | 5 | 3.88 | 0.78 |
| 硬核玩家 | 標準 | 4.5 | 3.24 | 0.72 |
| 硬核玩家 | 困難 | 3.5 | 3.04 | 0.87 |

## Key Changes

[Tuner should document what changed and why here]