# Tuner Experiment 036

- **Timestamp**: 2026-04-22T11:58:13.022Z
- **Fitness**: 0.8307
- **Previous Best**: 0.8546
- **Status**: ❌ No improvement
- **Balance Score**: 0.8886
- **Skill Expression**: 2.09 stages
- **Elapsed**: 0.1s

## Parameter Changes

```json
{
  "enemy.money_target_multiplier": 1.25,
  "enemy.max_rounds_offset": -1,
  "enemy.ai_stand_threshold_base": 16,
  "enemy.ai_variance": 1,
  "difficulty.easy_multiplier": 0.7000000000000001,
  "difficulty.hard_multiplier": 1.6,
  "difficulty.hard_ai_penalty": 0.45,
  "player.hands_per_battle": 5,
  "player.discards_per_battle": 5,
  "player.hit_limit": 3,
  "player.initial_generals": 4,
  "player.max_slots": 6,
  "skills.additive_base_multiplier": 1.2000000000000002,
  "skills.multiplier_base_multiplier": 0.8,
  "rules.blackjack_payout": 1.5,
  "rules.double_down_allowed": true,
  "rules.split_allowed": true
}
```

## Per-Profile Results

### 新手
- **入門**: avg 3.34 stages (max 9)
- **標準**: avg 2.48 stages (max 8)
- **困難**: avg 2.08 stages (max 5)

### 休闲玩家
- **入門**: avg 3.98 stages (max 9)
- **標準**: avg 3.06 stages (max 7)
- **困難**: avg 2.62 stages (max 7)

### 硬核玩家
- **入門**: avg 6.56 stages (max 10)
- **標準**: avg 4.40 stages (max 10)
- **困難**: avg 3.20 stages (max 6)

## Targets vs Actual

| Profile | Difficulty | Target | Actual | Score |
|---------|------------|--------|--------|-------|
| 新手 | 入門 | 4 | 3.34 | 0.83 |
| 新手 | 標準 | 3 | 2.48 | 0.83 |
| 新手 | 困難 | 2 | 2.08 | 0.96 |
| 休闲玩家 | 入門 | 4.5 | 3.98 | 0.88 |
| 休闲玩家 | 標準 | 3.5 | 3.06 | 0.87 |
| 休闲玩家 | 困難 | 2.5 | 2.62 | 0.95 |
| 硬核玩家 | 入門 | 5 | 6.56 | 0.69 |
| 硬核玩家 | 標準 | 4.5 | 4.40 | 0.98 |
| 硬核玩家 | 困難 | 3.5 | 3.20 | 0.91 |

