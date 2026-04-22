# Tuner Experiment 035

- **Timestamp**: 2026-04-22T11:58:12.942Z
- **Fitness**: 0.8546
- **Previous Best**: 0.8085
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.8246
- **Skill Expression**: 2.77 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.1,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.6,
  "difficulty.hard_ai_penalty": 0.55,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1.1,
  "skills.multiplier_base_multiplier": 1.1,
  "rules.blackjack_payout": 2,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.38 stages (max 11)
- **標準**: avg 3.20 stages (max 10)
- **困難**: avg 1.96 stages (max 7)

### 休闲玩家
- **入門**: avg 5.08 stages (max 11)
- **標準**: avg 4.16 stages (max 10)
- **困難**: avg 2.80 stages (max 8)

### 硬核玩家
- **入門**: avg 7.04 stages (max 11)
- **標準**: avg 5.58 stages (max 11)
- **困難**: avg 4.24 stages (max 9)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 3.38 | 0.84 |
| 新手 | 標準 | 3 | 3.20 | 0.93 |
| 新手 | 困難 | 2 | 1.96 | 0.98 |
| 休闲玩家 | 入門 | 4.5 | 5.08 | 0.87 |
| 休闲玩家 | 標準 | 3.5 | 4.16 | 0.81 |
| 休闲玩家 | 困難 | 2.5 | 2.80 | 0.88 |
| 硬核玩家 | 入門 | 5 | 7.04 | 0.59 |
| 硬核玩家 | 標準 | 4.5 | 5.58 | 0.76 |
| 硬核玩家 | 困難 | 3.5 | 4.24 | 0.79 |

## Key Changes

[Tuner should document what changed and why here]