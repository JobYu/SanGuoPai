# SanGuoPai Game Parameter Tuner

基於玩家畫像的遊戲參數自動調優框架。

## 設計理念

遊戲平衡不能只看「最強 AI 能打多遠」，而要看「不同水平的玩家體驗如何」。
因此本框架模擬三種玩家類型，測量參數改動對各類玩家的影響，確保：

- **入門難度**不會讓新手挫折
- **標準難度**是主要挑戰，休閒玩家有進步空間
- **困難難度**需要深入理解遊戲機制
- 遊戲有足夠的**技巧深度**（硬核玩家明顯強於新手）

## 目錄結構

```
tests/tuner/
├── game_params.js      # 可調參數定義、應用、驗證
├── player_profiles.js  # 三種玩家策略（新手/休閒/硬核）
├── harness_params.js   # 參數化遊戲運行器（接受自定義數據）
├── run_tuner.js        # 實驗編排器（hill climbing + daemon）
├── program.md          # 調優策略文檔
├── README.md           # 本文件
└── experiments/        # 實驗結果輸出
    ├── 001/
    │   ├── params.json   # 本次實驗的參數
    │   ├── results.json  # 詳細結果
    │   └── summary.md    # 可讀摘要
    ├── 002/
    └── leaderboard.json  # 全局排行榜
```

## 使用方法

### 快速測試（單輪 hill climbing）

```bash
node tests/tuner/run_tuner.js --runs 50 --iterations 10
```

### Daemon 模式（監聽參數修改）

```bash
node tests/tuner/run_tuner.js --runs 50 --daemon
```

修改 `game_params.js` 中的 default 值後保存，自動觸發測試。

### 只測試特定參數

```js
import { applyParams, defaultParams } from './game_params.js';
import { runBatchWithParams } from './harness_params.js';
import { playerProfiles } from './player_profiles.js';

const myParams = { ...defaultParams, 'enemy.money_target_multiplier': 1.2 };
const gameData = applyParams(myParams);

const results = runBatchWithParams(
  playerProfiles.casual.decide,
  gameData,
  { runs: 100, difficulties: ['標準'] }
);

console.log(results.summary);
```

## 可調參數一覽

| 參數 | 類型 | 默認值 | 影響 |
|------|------|--------|------|
| `enemy.money_target_multiplier` | number | 1.0 | 全局金錢目標乘數 |
| `enemy.max_rounds_offset` | integer | 0 | 全局回合數偏移 |
| `enemy.ai_stand_threshold_base` | integer | 17 | AI 停牌閾值基準 |
| `difficulty.easy_multiplier` | number | 0.85 | 入門難度金錢目標乘數 |
| `difficulty.hard_multiplier` | number | 1.15 | 困難難度金錢目標乘數 |
| `player.hands_per_battle` | integer | 3 | 每局出牌次數 |
| `player.discards_per_battle` | integer | 3 | 每局棄牌次數 |
| `player.hit_limit` | integer | 3 | 每回合最多要牌次數 |
| `skills.additive_base_multiplier` | number | 1.0 | 加法技能全局乘數 |
| `skills.multiplier_base_multiplier` | number | 1.0 | 乘法技能全局乘數 |
| `rules.blackjack_payout` | number | 1.5 | Blackjack 額外賠付倍率 |

## Fitness 解讀

| 範圍 | 含義 |
|------|------|
| 0.90+ | 極佳平衡，三種難度都有合理曲線 |
| 0.75-0.90 | 良好，主要目標達成 |
| 0.60-0.75 | 尚可，部分組合需要調整 |
| < 0.60 | 不平衡，需要大幅調整 |

## 與 Agent 測試框架的關係

```
Agent 框架          Tuner 框架
----------          ----------
agent.js  ←──── 策略優化（單一最強 AI）
harness.js         harness_params.js ← 參數化版本
run_experiment.js  run_tuner.js ← 多玩家畫像 + 平衡評估
```

兩個框架獨立運行，但可以互補：
- Agent 框架找到最優策略後，Tuner 框架測量該策略在不同參數下的表現
- Tuner 找到好參數後，Agent 可以在新參數下繼續優化策略
