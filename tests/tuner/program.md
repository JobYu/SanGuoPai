# SanGuoPai Tuner Program

## Objective

調整遊戲參數，使三種難度（入門/標準/困難）對三種玩家類型（新手/休閒/硬核）
都有合理的挑戰曲線，同時保留足夠的技巧空間（skill expression）。

## Constraints

1. **參數範圍**: 只能調整 `paramSchema` 中定義的參數
2. **不改動核心邏輯**: 不改變 `harness.js` 的遊戲規則實現
3. **不改動 AI 策略**: agent.js 的策略保持不變
4. **測試覆蓋**: 每次實驗必須覆蓋 3 種玩家 × 3 種難度 = 9 個組合

## Balance Targets

| 玩家類型 | 入門目標 | 標準目標 | 困難目標 |
|----------|----------|----------|----------|
| 新手     | 2 關     | 0.5 關   | 0 關     |
| 休閒     | 4 關     | 2.5 關   | 1 關     |
| 硬核     | 6 關(全) | 4 關     | 2.5 關   |

### 設計意圖

- **入門**: 新手能體驗到 2 關左右，不會太挫折；硬核玩家可以輕鬆通關
- **標準**: 主要遊戲難度，休閒玩家應該能打到第 2-3 關，硬核玩家需要認真思考才能通關
- **困難**: 硬核挑戰，需要充分理解武將搭配和策略才能推進

## Fitness Function

```
balanceScore = Σ(weight × max(0, 1 - |actual - target| / max(target, 1))) / Σ(weight)
skillExpression = avg(hardcoreStages - newbieStages) across difficulties
skillBonus = min(1, max(0, skillExpression / 3))
fitness = balanceScore × 0.7 + skillBonus × 0.3
```

### 為什麼這樣設計？

- **70% balance**: 確保各難度對應的玩家有合適的體驗
- **30% skill expression**: 確保遊戲有足夠的技巧深度，硬核玩家明顯強於新手
  - 如果新手和硬核表現差不多，說明遊戲太靠運氣
  - 理想差距：平均每難度 3 關以上

## Experiment Protocol

1. **Baseline**: 先用 defaultParams 跑一遍，記錄基線 fitness
2. **Hill Climbing**:
   - 從當前最佳參數出發
   - 隨機擾動 15% 範圍內的參數生成鄰居
   - 評估鄰居的 fitness
   - 更好則接受，否則保留當前最佳
3. **Auto-commit**: daemon 模式下，改進自動提交 git，退步自動 revert

## Key Parameters to Tune (Priority)

### High Impact
- `enemy.money_target_multiplier` — 直接影響通關難度
- `enemy.max_rounds_offset` — 影響容錯空間
- `player.hands_per_battle` — 核心資源，影響策略深度
- `player.initial_generals` — 開局體驗

### Medium Impact
- `difficulty.easy_multiplier` / `difficulty.hard_multiplier` — 難度曲線
- `player.discards_per_battle` / `player.hit_limit` — 操作空間
- `skills.multiplier_base_multiplier` — 武將技能強度

### Low Impact
- `enemy.ai_variance` — AI 多樣性
- `rules.blackjack_payout` — 邊際影響

## Success Criteria

- [ ] 入門難度：新手平均通過 1.5-2.5 關
- [ ] 標準難度：休閒玩家平均通過 2-3 關
- [ ] 困難難度：硬核玩家平均通過 2-3 關
- [ ] 技巧空間：硬核比新手平均每難度多 2.5+ 關
- [ ] fitness > 0.75

## Files

- `game_params.js` — 參數定義與應用
- `player_profiles.js` — 三種玩家策略
- `harness_params.js` — 參數化遊戲運行器
- `run_tuner.js` — 實驗編排與 hill climbing
