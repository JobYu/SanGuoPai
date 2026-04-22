# Tuner Experiment 001

- **Timestamp**: 2026-04-22T10:13:32.962Z
- **Fitness**: 0.4114
- **Previous Best**: 0.0000
- **Status**: ✅ IMPROVEMENT
- **Balance Score**: 0.5401
- **Skill Expression**: 0.33 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1,
  "enemy.max_rounds_offset": 0,
  "enemy.ai_stand_threshold_base": 17,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.85,
  "difficulty.hard_multiplier": 1.15,
  "difficulty.hard_ai_penalty": 0.25,
  "player.hands_per_battle": 3,
  "player.discards_per_battle": 3,
  "player.hit_limit": 3,
  "player.initial_generals": 3,
  "player.max_slots": 5,
  "skills.additive_base_multiplier": 1,
  "skills.multiplier_base_multiplier": 1,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.00 stages (max 5)
- **標準**: avg 1.90 stages (max 5)
- **困難**: avg 2.10 stages (max 4)

### 休闲玩家
- **入門**: avg 2.90 stages (max 5)
- **標準**: avg 2.90 stages (max 5)
- **困難**: avg 2.60 stages (max 4)

### 硬核玩家
- **入門**: avg 2.70 stages (max 4)
- **標準**: avg 2.70 stages (max 5)
- **困難**: avg 2.60 stages (max 4)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 2 | 3.00 | 0.50 |
| 新手 | 標準 | 0.5 | 1.90 | 0.00 |
| 新手 | 困難 | 0 | 2.10 | 0.00 |
| 休闲玩家 | 入門 | 4 | 2.90 | 0.72 |
| 休闲玩家 | 標準 | 2.5 | 2.90 | 0.84 |
| 休闲玩家 | 困難 | 1 | 2.60 | 0.00 |
| 硬核玩家 | 入門 | 6 | 2.70 | 0.45 |
| 硬核玩家 | 標準 | 4 | 2.70 | 0.68 |
| 硬核玩家 | 困難 | 2.5 | 2.60 | 0.96 |

## Key Changes

[Tuner should document what changed and why here]