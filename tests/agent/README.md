# SanGuoPai Auto-Play Agent 测试方案

> 受 Karpathy [autoresearch](https://github.com/karpathy/autoresearch) 启发的自我迭代游戏测试框架。

## 核心思想

将 **Agent 的决策策略**视为可演化的"基因组"，通过无人值守的实验循环持续优化游戏表现。

```
┌─────────────┐    edit     ┌─────────────┐    run     ┌─────────────┐
│  LLM Agent  │ ───────────▶ │   agent.js  │ ──────────▶│   Harness   │
│  (Claude)   │              │  (mutable)  │            │  (fixed)    │
└─────────────┘              └─────────────┘            └──────┬──────┘
     ▲                                                         │
     │         read program.md + current agent.js               │
     │         parse metrics from results.json                  ▼
     │                                                   ┌─────────────┐
     └────────────────────────────────────────────────── │  results    │
                                                        └─────────────┘
```

## 文件结构（信任边界）

| 文件 | 角色 | 是否可编辑 |
|------|------|-----------|
| `program.md` | 人类定义的研究策略、规则约束、评估标准 | 人类设定，Agent 只读 |
| `agent.js` | **唯一可变文件** — Agent 的决策逻辑 | **Agent 可编辑** |
| `harness.js` | 固定测试框架 — 运行游戏、收集指标、对比结果 | 不可编辑 |
| `run_experiment.js` | 实验编排脚本 — 批量运行、记录日志 | 不可编辑 |
| `experiments/` | 每次实验的完整记录（策略快照 + 结果） | 自动写入 |

> 设计原则：只有 `agent.js` 是 mutable genome，其他都是 fixed trust boundary。这让每次变更都可 review（git diff），且变更范围可控。

## 关键设计决策

### 1. 单一标量指标（Scalar Metric）

仿照 autoresearch 的 `val_bpb`，我们使用**加权通关分数**作为唯一优化目标：

```
fitness = Σ (stage_cleared × difficulty_multiplier) / total_runs

difficulty_multiplier:
  入门: 1.0
  标准: 2.0
  困难: 3.5
```

这让不同难度下的结果可以直接比较。主指标是**加权平均通关关卡数**，次指标是**通关率**和**每局平均金钱**。

### 2. 固定实验预算

每轮实验固定运行 **N=100 局**（可通过环境变量调整），确保跨实验可比。

### 3. 决策接口

Agent 只需实现一个函数：

```js
function decide(state) -> { action, params? }
```

`state` 包含完整游戏上下文（点数、敌人明牌、剩余资源、武将组合等）。

### 4. 策略演化方向

Agent 可以沿以下维度改进策略：
- **基础阈值**：多少点停牌、多少点要牌
- **风险调整**：根据剩余回合/金钱目标调整激进程度
- **武将联动**：根据当前装备武将优化打法
  - 关羽/赵云 → 积极追求 20/21
  - 张辽 → 减少要牌
  - 周瑜 → 增加要牌
  - 孙尚香/太史慈 → 关注花色
  - 诸葛亮 → 确保不爆牌
- **敌人适应**：根据 AI 倾向调整
- **资源管理**：弃牌、分牌、双倍下注的最优时机

## 运行方式

### 单次基准测试

```bash
cd tests/agent
node run_experiment.js --runs 100 --difficulty 標準
```

### 无人值守循环（核心）

```bash
# 启动持续优化循环
node run_experiment.js --daemon --runs 100
```

在 daemon 模式下，脚本会：
1. 读取当前 `agent.js`
2. 等待外部 LLM Agent 提交改进版本（通过文件替换）
3. 运行实验 → 评估 → 保留/回滚
4. 循环往复

### 与 Claude Code 集成（推荐）

使用 `superpowers:executing-plans` 或手动流程：

1. Claude 读取 `program.md` + `agent.js` + 最近实验结果
2. Claude 提出策略改进，编辑 `agent.js`
3. 运行 `node run_experiment.js --runs 100`
4. Claude 读取 `results.json`，判断是否保留变更
5. 保留 → `git commit`；回滚 → `git checkout -- agent.js`
6. 重复步骤 1

## 实验记录格式

每次实验保存在 `experiments/XXX/` 目录：

```
experiments/
├── 001/
│   ├── agent.js          # 策略快照
│   ├── results.json      # 原始统计
│   └── summary.md        # 人类可读摘要
├── 002/
│   └── ...
└── leaderboard.json      # 全局排名
```

`leaderboard.json` 按 fitness 排序，方便追踪最优策略的演化路径。

## 稳定性保障

| 风险 | 对策 |
|------|------|
| Agent 写坏 agent.js（语法错误） | harness 捕获异常，fitness = 0，自动回滚 |
| 无限循环/卡死 | 每局有最大回合上限，超时强制终止 |
| 实验耗时过长 | 固定 100 局预算，Node.js 纯计算无需渲染 |
| 随机性导致结果波动 | 相同种子可复现；多次实验取平均 |
| Agent 策略过于复杂 | program.md 规定复杂度约束（行数上限、注释要求） |

## 扩展方向

1. **并行实验**：同时测试多个策略变体（分支）
2. **遗传算法交叉**：将两个高分策略的决策规则组合
3. **对抗训练**：让 Agent 同时控制敌人 AI，互相博弈
4. **迁移学习**：将在低难度学到的策略迁移到高难度
