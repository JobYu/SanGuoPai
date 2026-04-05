const SUPPORTED_LOCALES = ['zh-TW', 'zh-CN', 'en'];
const LOCALE_STORAGE_KEY = 'sanguopai_locale';

const TRANSLATIONS = {
    'zh-TW': {
        meta: {
            htmlLang: 'zh-Hant',
            title: '三國派 (SanGuoPai) - Roguelike 21點博弈冒險',
            description: '三國派是一款結合三國題材與 Roguelike 元素的 21 點博弈策略遊戲。招募武將、平定亂世！'
        },
        ui: {
            loading: '載入中...',
            language: '界面語言',
            languageAutoHint: '若未手動選擇，將自動依瀏覽器語言顯示。',
            languageOptionZhTW: '繁體中文',
            languageOptionZhCN: '简体中文',
            languageOptionEn: 'English',
            startGame: '開始遊戲',
            subtitle: 'Roguelike 21點博弈冒險',
            leaderboard: '英雄榜 (Top 10)',
            date: '日期',
            settings: '设置',
            settings: '設置',
            score: '積分',
            lineup: '武將陣容',
            titleHint: '提示：點擊手牌可以選擇棄牌，出牌時才會計算爆牌。',
            stageBattle: '第 {stage} 場對決',
            target: '目標：{name}',
            money: '金錢 ($)',
            relicsOwned: '持有寶物',
            hit: '要牌 (Hit) {current}/{limit}',
            playHand: '出牌 (Play Hand) {hands}',
            discard: '棄牌 (Discard) {discards}',
            schemeButton: '錦囊：{name}',
            deck: '牌組',
            enemyLabel: '敵將',
            clickForDetails: '點擊查看詳情',
            skill: '技能：{name}',
            trigger: '觸發：{value}',
            noCondition: '無條件',
            backToBattle: '返回戰場',
            enemyCommander: '敵軍大將',
            aiTendency: 'AI 性格：',
            standThreshold: '停牌閾值：',
            initialMorale: '初始士氣：',
            pointsUnit: '{value} 點',
            remainingDeck: '剩餘牌組狀態 ({current} / 52)',
            deckLegendAvailable: '● 正常顯示：牌組中剩餘的牌',
            deckLegendPlayed: '● 灰色透明：遊戲中已出現或領取的牌',
            closeDeck: '關閉回歸戰場',
            yourHand: '你的手牌:',
            enemyHand: '敵將手牌:',
            playerLabel: '玩家',
            bustMark: '(爆)',
            winTitle: '博弈獲勝！',
            blackjackTitle: '完美 Blackjack',
            loseTitle: '博弈失敗！',
            bustTitle: '爆牌！',
            drawTitle: '平局',
            lowerWinBetter: '* 勝利點數越小，獎勵倍數越高',
            baseRewardFormula: '基礎獎勵 ({points} 點 x {multiplier} 倍) + 手牌點數 ({points})',
            totalScore: '獲得金錢: {total}',
            claimReward: '擊敗敵將！領取獎勵',
            nextRound: '下一回合',
            confirm: '確定',
            handConsumed: '消耗 1 次出牌次數 (剩餘: {hands})',
            recruitTitle: '招募武將 (剩餘金錢: ${money})',
            ownedGenerals: '已擁有武將 (點擊出售)',
            sellFor: '(售 ${amount})',
            schemeTag: '【錦囊】',
            relicTag: '【寶物】',
            expandSlots: '擴展武將位',
            expandSlotsDesc: '永久增加 1 個槽位',
            stand: '停牌 (Stand)',
            doubleDown: '雙倍 (Double)',
            split: '分牌 (Split)',
            roundInfo: '回合 {current}/{max}',
            nextHand: '切換至第 {index} 手牌',
            currentSlotCap: '目前上限: {slots}',
            nextStage: '下個關卡 (跳過招募)',
            gameOver: '敗走麥城...',
            retry: '再試一次',
            backToTitle: '回到標題',
            rewardDamageBase: '{name}: {symbol}{value}',
            sellShort: '售',
            close: '關閉'
        },
        difficulty: {
            title: '難度選擇',
            easy: '入門',
            normal: '標準',
            hard: '困難'
        },
        log: {
            soldGeneral: '出售了 {name}，獲得了 ${amount}',
            boughtSlot: '武將位擴張！目前上限: {slots}',
            weiBond: '【魏軍羈絆】額外獲得 1 次棄牌次數',
            redHare: '【赤兔馬】額外獲得 1 次棄牌次數',
            battleStart: '戰鬥開始！每回合最多要牌 3 次。',
            drewCard: '你抽到了 {card} (本回合要牌: {current}/{limit})',
            bust: '爆牌了！',
            discardDone: '棄牌完成，剩餘棄牌次數: {discards}',
            borrowEastWind: '【借東風】窺探天機：下一張牌是 {card}',
            emptyCityCast: '【空城計】發動成功！敵軍下一回合將不敢妄動（強制停牌）。',
            enemyTurn: '敵將回合...',
            cannotDoubleDown: '無法雙倍下注（只能在首兩張牌時）',
            cannotSplit: '無法分牌（需要兩張同點數牌）',
            doubleDown: '雙倍下注！抽到 {card}',
            splitSuccess: '分牌成功！現在操作兩手牌',
            emptyCityEnemy: '敵軍受【空城計】影響，不敢妄動，強制停牌！',
            enemyHit: '敵將抽牌...',
            enemyBust: '敵將爆牌！',
            xiahouDun: '夏侯惇【剛烈】觸發！下一回合倍率提升。',
            moneyAwarded: '獲勝！獲得了 ${amount}',
            gotScheme: '獲得錦囊：{name}',
            gotRelic: '獲得寶物：{name}',
            gameCleared: '恭喜！你已平定亂世，統一三國！',
            shuDiscount: '(蜀軍羈絆特價) {description}',
            shuCounter: '【蜀軍羈絆】反擊！對敵將造成 {damage} 點傷害！',
            guanPing: '【關平・隨父從征】要牌抽到 A，結算時 +75！',
            ganNing: '【甘寧・奇襲】首次要牌標記，結算時 +90！',
            zhugeLiang: '【諸葛亮・觀星】觀星啟動！若未爆牌，結算時倍率 x2.2。',
            tianshiEnemyBuff: '【天時】敵將獲得天地之力，奪走 ${damage} 金錢！'
        },
        alert: {
            insufficientMoney: '金錢不足！需要 ${amount}',
            schemesFull: '錦囊位已滿！請先消耗錦囊。',
            slotsFull: '武將位已滿！請先出售武將。',
            gameClear: '恭喜通關！你的終局積分（金錢）: ${money}',
            loadFailed: '載入失敗: {message}'
        },
        data: {
            factions: { '魏': '魏', '蜀': '蜀', '吳': '吳', '群': '群' },
            rarities: { Common: '普通', Uncommon: '精英', Rare: '高級', Legendary: '傳奇' },
            enemyTendencies: { '莽撞': '莽撞', '穩健': '穩健', '狡詐': '狡詐' },
            skillTriggers: {
                '結算時': '結算時',
                '達成 21 點時': '達成 21 點時',
                '爆牌時': '爆牌時',
                '要牌時': '要牌時',
                '回合開始時': '回合開始時'
            },
            effectTypes: { '加法': '加法', '乘法': '乘法' },
            conditions: {
                '該次結算': '該次結算',
                '無': '無',
                '無條件': '無條件',
                '玩家點數恰為 21': '玩家點數恰為 21',
                '否則': '否則',
                '玩家點數 ≥ 15': '玩家點數 ≥ 15',
                '玩家點數 ≥ 17 且 ≤ 20': '玩家點數 ≥ 17 且 ≤ 20',
                '玩家點數為 17～20': '玩家點數為 17～20',
                '敵將點數 ≥ 17': '敵將點數 ≥ 17',
                '敵將點數 ≥ 18': '敵將點數 ≥ 18',
                '玩家要牌次數為 0': '玩家要牌次數為 0',
                '玩家未要牌即直接出牌（僅初始兩張）': '玩家未要牌即直接出牌（僅初始兩張）',
                '玩家要牌次數為 1': '玩家要牌次數為 1',
                '玩家要牌次數 ≤ 1': '玩家要牌次數 ≤ 1',
                '玩家要牌次數 ≥ 2': '玩家要牌次數 ≥ 2',
                '玩家手牌數為 2 張': '玩家手牌數為 2 張',
                '玩家手牌數 ≥ 4 張': '玩家手牌數 ≥ 4 張',
                '本回合要牌得到 A 則結算時額外加上': '本回合要牌得到 A 則結算時額外加上',
                '手牌中至少 2 張同花色': '手牌中至少 2 張同花色',
                '手牌中有 3 張以上同花色': '手牌中有 3 張以上同花色',
                '敵將明牌為 A': '敵將明牌為 A',
                '敵將明牌為 10 或 J/Q/K（視為 10）': '敵將明牌為 10 或 J/Q/K（視為 10）',
                '上一回合己方曾爆牌（風險回報）': '上一回合己方曾爆牌（風險回報）',
                '下一回合結算時生效（僅下一場）': '下一回合結算時生效（僅下一場）',
                '本回合使用過錦囊': '本回合使用過錦囊'
            }
        }
    },
    'zh-CN': {
        meta: {
            htmlLang: 'zh-Hans',
            title: '三国派 (SanGuoPai) - Roguelike 21点博弈冒险',
            description: '三国派是一款结合三国题材与 Roguelike 元素的 21 点博弈策略游戏。招募武将，平定乱世！'
        },
        ui: {
            loading: '加载中...',
            language: '界面语言',
            languageAutoHint: '如果未手动选择，将自动按浏览器语言显示。',
            languageOptionZhTW: '繁體中文',
            languageOptionZhCN: '简体中文',
            languageOptionEn: 'English',
            startGame: '开始游戏',
            subtitle: 'Roguelike 21点博弈冒险',
            leaderboard: '英雄榜 (Top 10)',
            date: '日期',
            settings: '设置',
            settings: '設置',
            score: '积分',
            lineup: '武将阵容',
            titleHint: '提示：点击手牌可以选择弃牌，出牌时才会计算爆牌。',
            stageBattle: '第 {stage} 场对决',
            target: '目标：{name}',
            money: '金钱 ($)',
            relicsOwned: '持有宝物',
            hit: '要牌 (Hit) {current}/{limit}',
            playHand: '出牌 (Play Hand) {hands}',
            discard: '弃牌 (Discard) {discards}',
            schemeButton: '锦囊：{name}',
            deck: '牌组',
            enemyLabel: '敌将',
            clickForDetails: '点击查看详情',
            skill: '技能：{name}',
            trigger: '触发：{value}',
            noCondition: '无条件',
            backToBattle: '返回战场',
            enemyCommander: '敌军大将',
            aiTendency: 'AI 性格：',
            standThreshold: '停牌阈值：',
            initialMorale: '初始士气：',
            pointsUnit: '{value} 点',
            remainingDeck: '剩余牌组状态 ({current} / 52)',
            deckLegendAvailable: '● 正常显示：牌组中剩余的牌',
            deckLegendPlayed: '● 灰色透明：游戏中已出现或领取的牌',
            closeDeck: '关闭回归战场',
            yourHand: '你的手牌:',
            enemyHand: '敌将手牌:',
            playerLabel: '玩家',
            bustMark: '(爆)',
            winTitle: '博弈获胜！',
            blackjackTitle: '完美 Blackjack',
            loseTitle: '博弈失败！',
            bustTitle: '爆牌！',
            drawTitle: '平局',
            lowerWinBetter: '* 胜利点数越小，奖励倍数越高',
            baseRewardFormula: '基础奖励 ({points} 点 x {multiplier} 倍) + 手牌点数 ({points})',
            totalScore: '獲得金錢: {total}',
            claimReward: '击败敌将！领取奖励',
            nextRound: '下一回合',
            confirm: '确定',
            handConsumed: '消耗 1 次出牌次数 (剩余: {hands})',
            recruitTitle: '招募武将 (剩余金钱: ${money})',
            ownedGenerals: '已拥有武将 (点击出售)',
            sellFor: '(售 ${amount})',
            schemeTag: '【锦囊】',
            relicTag: '【宝物】',
            expandSlots: '扩展武将位',
            expandSlotsDesc: '永久增加 1 个槽位',
            stand: '停牌 (Stand)',
            doubleDown: '双倍 (Double)',
            split: '分牌 (Split)',
            roundInfo: '回合 {current}/{max}',
            nextHand: '切换至第 {index} 手牌',
            currentSlotCap: '目前上限: {slots}',
            nextStage: '下个关卡 (跳过招募)',
            gameOver: '败走麦城...',
            retry: '再试一次',
            backToTitle: '回到标题',
            rewardDamageBase: '{name}: {symbol}{value}',
            sellShort: '售',
            close: '关闭'
        },
        difficulty: {
            title: '难度选择',
            easy: '入门',
            normal: '标准',
            hard: '困难'
        },
        log: {
            soldGeneral: '出售了 {name}，获得了 ${amount}',
            boughtSlot: '武将位扩张！目前上限: {slots}',
            weiBond: '【魏军羁绊】额外获得 1 次弃牌次数',
            redHare: '【赤兔马】额外获得 1 次弃牌次数',
            battleStart: '战斗开始！每回合最多要牌 3 次。',
            drewCard: '你抽到了 {card} (本回合要牌: {current}/{limit})',
            bust: '爆牌了！',
            discardDone: '弃牌完成，剩余弃牌次数: {discards}',
            borrowEastWind: '【借东风】窥探天机：下一张牌是 {card}',
            emptyCityCast: '【空城计】发动成功！敌军下一回合将不敢妄动（强制停牌）。',
            enemyTurn: '敌将回合...',
            cannotDoubleDown: '无法双倍下注（只能在首两张牌时）',
            cannotSplit: '无法分牌（需要两张同点数牌）',
            doubleDown: '双倍下注！抽到 {card}',
            splitSuccess: '分牌成功！现在操作两手牌',
            emptyCityEnemy: '敌军受【空城计】影响，不敢妄动，强制停牌！',
            enemyHit: '敌将抽牌...',
            enemyBust: '敌将爆牌！',
            xiahouDun: '夏侯惇【刚烈】触发！下一回合倍率提升。',
            moneyAwarded: '获胜！获得了 ${amount}',
            gotScheme: '获得锦囊：{name}',
            gotRelic: '获得宝物：{name}',
            gameCleared: '恭喜！你已平定乱世，统一三国！',
            shuDiscount: '(蜀军羁绊特价) {description}',
            shuCounter: '【蜀军羁绊】反击！对敌将造成 {damage} 点伤害！',
            guanPing: '【关平・随父从征】要牌抽到 A，结算时 +75！',
            ganNing: '【甘宁・奇袭】首次要牌标记，结算时 +90！',
            zhugeLiang: '【诸葛亮・观星】观星启动！若未爆牌，结算时倍率 x2.2。',
            tianshiEnemyBuff: '【天时】敌将获得天地之力，夺走 ${damage} 金钱！'
        },
        alert: {
            insufficientMoney: '金钱不足！需要 ${amount}',
            schemesFull: '锦囊位已满！请先消耗锦囊。',
            slotsFull: '武将位已满！请先出售武将。',
            gameClear: '恭喜通关！你的终局积分（金钱）: ${money}',
            loadFailed: '加载失败: {message}'
        },
        data: {
            factions: { '魏': '魏', '蜀': '蜀', '吳': '吴', '群': '群' },
            rarities: { Common: '普通', Uncommon: '精英', Rare: '高级', Legendary: '传奇' },
            enemyTendencies: { '莽撞': '莽撞', '穩健': '稳健', '狡詐': '狡诈' },
            skillTriggers: {
                '結算時': '结算时',
                '達成 21 點時': '达成 21 点时',
                '爆牌時': '爆牌时',
                '要牌時': '要牌时',
                '回合開始時': '回合开始时'
            },
            effectTypes: { '加法': '加法', '乘法': '乘法' },
            conditions: {
                '該次結算': '该次结算',
                '無': '无',
                '無條件': '无条件',
                '玩家點數恰為 21': '玩家点数恰为 21',
                '否則': '否则',
                '玩家點數 ≥ 15': '玩家点数 ≥ 15',
                '玩家點數 ≥ 17 且 ≤ 20': '玩家点数 ≥ 17 且 ≤ 20',
                '玩家點數為 17～20': '玩家点数为 17～20',
                '敵將點數 ≥ 17': '敌将点数 ≥ 17',
                '敵將點數 ≥ 18': '敌将点数 ≥ 18',
                '玩家要牌次數為 0': '玩家要牌次数为 0',
                '玩家未要牌即直接出牌（僅初始兩張）': '玩家未要牌即直接出牌（仅初始两张）',
                '玩家要牌次數為 1': '玩家要牌次数为 1',
                '玩家要牌次數 ≤ 1': '玩家要牌次数 ≤ 1',
                '玩家要牌次數 ≥ 2': '玩家要牌次数 ≥ 2',
                '玩家手牌數為 2 張': '玩家手牌数为 2 张',
                '玩家手牌數 ≥ 4 張': '玩家手牌数 ≥ 4 张',
                '本回合要牌得到 A 則結算時額外加上': '本回合要牌得到 A 则结算时额外加上',
                '手牌中至少 2 張同花色': '手牌中至少 2 张同花色',
                '手牌中有 3 張以上同花色': '手牌中有 3 张以上同花色',
                '敵將明牌為 A': '敌将明牌为 A',
                '敵將明牌為 10 或 J/Q/K（視為 10）': '敌将明牌为 10 或 J/Q/K（视为 10）',
                '上一回合己方曾爆牌（風險回報）': '上一回合己方曾爆牌（风险回报）',
                '下一回合結算時生效（僅下一場）': '下一回合结算时生效（仅下一场）',
                '本回合使用過錦囊': '本回合使用过锦囊'
            }
        }
    },
    en: {
        meta: {
            htmlLang: 'en',
            title: 'SanGuoPai - Roguelike Blackjack Adventure',
            description: 'SanGuoPai is a Three Kingdoms roguelike strategy game built around blackjack combat. Recruit generals and pacify the realm.'
        },
        ui: {
            loading: 'Loading...',
            language: 'Language',
            languageAutoHint: 'If you do not choose one manually, the UI follows your browser language.',
            languageOptionZhTW: 'Traditional Chinese',
            languageOptionZhCN: 'Simplified Chinese',
            languageOptionEn: 'English',
            startGame: 'Start Game',
            subtitle: 'Roguelike Blackjack Adventure',
            leaderboard: 'Hall of Heroes (Top 10)',
            date: 'Date',
            settings: 'Settings',
            score: 'Score',
            lineup: 'General Lineup',
            titleHint: 'Tip: Click cards in hand to mark them for discard. Bust is checked only when you play the hand.',
            stageBattle: 'Battle {stage}',
            target: 'Target: {name}',
            money: 'Money ($)',
            relicsOwned: 'Relics',
            hit: 'Hit {current}/{limit}',
            playHand: 'Play Hand {hands}',
            discard: 'Discard {discards}',
            schemeButton: 'Scheme: {name}',
            deck: 'Deck',
            enemyLabel: 'Enemy',
            clickForDetails: 'Click to view details',
            skill: 'Skill: {name}',
            trigger: 'Trigger: {value}',
            noCondition: 'No condition',
            backToBattle: 'Back to Battle',
            enemyCommander: 'Enemy Commander',
            aiTendency: 'AI Tendency:',
            standThreshold: 'Stand Threshold:',
            initialMorale: 'Starting Morale:',
            pointsUnit: '{value} pts',
            remainingDeck: 'Remaining Deck ({current} / 52)',
            deckLegendAvailable: '● Normal: cards still left in the deck',
            deckLegendPlayed: '● Faded: cards already seen or taken',
            closeDeck: 'Close Deck View',
            yourHand: 'Your Hand:',
            enemyHand: 'Enemy Hand:',
            playerLabel: 'Player',
            bustMark: '(Bust)',
            winTitle: 'Victory!',
            blackjackTitle: 'Perfect Blackjack',
            loseTitle: 'Defeat!',
            bustTitle: 'Bust!',
            drawTitle: 'Push',
            lowerWinBetter: '* Lower winning totals grant a higher reward multiplier',
            baseRewardFormula: 'Base reward ({points} pts x {multiplier}) + hand points ({points})',
            totalScore: 'Money Earned: {total}',
            claimReward: 'Enemy Defeated! Claim Reward',
            nextRound: 'Next Round',
            confirm: 'Confirm',
            handConsumed: 'Consumed 1 hand (remaining: {hands})',
            recruitTitle: 'Recruit Rewards (Money left: ${money})',
            ownedGenerals: 'Owned Generals (click to sell)',
            sellFor: '(Sell for ${amount})',
            schemeTag: '[Scheme]',
            relicTag: '[Relic]',
            expandSlots: 'Expand General Slots',
            expandSlotsDesc: 'Permanently add 1 slot',
            currentSlotCap: 'Current cap: {slots}',
            nextStage: 'Next Stage (skip rewards)',
            gameOver: 'Retreat from Mai Castle...',
            retry: 'Try Again',
            backToTitle: 'Back to Title',
            rewardDamageBase: '{name}: {symbol}{value}',
            sellShort: 'Sell',
            close: 'Close'
        },
        difficulty: {
            title: 'Difficulty',
            easy: 'Easy',
            normal: 'Normal',
            hard: 'Hard'
        },
        log: {
            soldGeneral: 'Sold {name} for ${amount}',
            boughtSlot: 'General slot expanded! Current cap: {slots}',
            weiBond: '[Wei Bond] Gain 1 extra discard',
            redHare: '[Red Hare] Gain 1 extra discard',
            battleStart: 'Battle start! You can hit up to 3 times each round.',
            drewCard: 'You drew {card} (hits this round: {current}/{limit})',
            bust: 'You busted!',
            discardDone: 'Discard complete. Remaining discards: {discards}',
            borrowEastWind: '[Borrow the East Wind] The next card is {card}',
            emptyCityCast: '[Empty City] Success! The enemy will be forced to stand next turn.',
            enemyTurn: 'Enemy turn...',
            cannotDoubleDown: 'Cannot double down (only on first two cards)',
            cannotSplit: 'Cannot split (need two cards of same rank)',
            doubleDown: 'Double down! Drew {card}',
            splitSuccess: 'Split successful! Now playing two hands',
            emptyCityEnemy: '[Empty City] The enemy hesitates and is forced to stand!',
            enemyHit: 'Enemy draws...',
            enemyBust: 'Enemy busted!',
            xiahouDun: '[Xiahou Dun: Resolve] Triggered! Increased multiplier next round.',
            moneyAwarded: 'Victory! You gained ${amount}',
            gotScheme: 'Gained scheme: {name}',
            gotRelic: 'Gained relic: {name}',
            gameCleared: 'Victory! You pacified the realm and united the Three Kingdoms!',
            shuDiscount: '(Shu bond discount) {description}',
            shuCounter: '[Shu Bond] Counter-attack! Dealt {damage} damage to the enemy!',
            guanPing: '[Guan Ping: March with Father] Drew an Ace on hit! +75 at settlement!',
            ganNing: '[Gan Ning: Surprise Raid] First hit marked! +90 at settlement!',
            zhugeLiang: '[Zhuge Liang: Star Gazing] Astrology activated! x2.2 multiplier if no bust.',
            tianshiEnemyBuff: '[Tianshi] The enemy channels the power of heaven and earth, stealing ${damage} gold!'
        },
        alert: {
            insufficientMoney: 'Not enough money. Need ${amount}',
            schemesFull: 'Scheme slots are full. Use one before taking another.',
            slotsFull: 'General slots are full. Sell a general first.',
            gameClear: 'Campaign cleared! Final score (money): ${money}',
            loadFailed: 'Load failed: {message}'
        },
        data: {
            factions: { '魏': 'Wei', '蜀': 'Shu', '吳': 'Wu', '群': 'Qun' },
            rarities: { Common: 'Common', Uncommon: 'Uncommon', Rare: 'Rare', Legendary: 'Legendary' },
            enemyTendencies: { '莽撞': 'Reckless', '穩健': 'Steady', '狡詐': 'Cunning' },
            skillTriggers: {
                '結算時': 'On settlement',
                '達成 21 點時': 'On reaching 21',
                '爆牌時': 'On bust',
                '要牌時': 'On hit',
                '回合開始時': 'At round start'
            },
            effectTypes: { '加法': 'Add', '乘法': 'Multiply' },
            conditions: {
                '該次結算': 'This settlement',
                '無': 'None',
                '無條件': 'No condition',
                '玩家點數恰為 21': 'Player total is exactly 21',
                '否則': 'Otherwise',
                '玩家點數 ≥ 15': 'Player total >= 15',
                '玩家點數 ≥ 17 且 ≤ 20': 'Player total is 17-20',
                '玩家點數為 17～20': 'Player total is 17-20',
                '敵將點數 ≥ 17': 'Enemy total >= 17',
                '敵將點數 ≥ 18': 'Enemy total >= 18',
                '玩家要牌次數為 0': 'Player hit count is 0',
                '玩家未要牌即直接出牌（僅初始兩張）': 'Play immediately without hitting (opening 2 cards only)',
                '玩家要牌次數為 1': 'Player hit count is 1',
                '玩家要牌次數 ≤ 1': 'Player hit count <= 1',
                '玩家要牌次數 ≥ 2': 'Player hit count >= 2',
                '玩家手牌數為 2 張': 'Player hand has 2 cards',
                '玩家手牌數 ≥ 4 張': 'Player hand has at least 4 cards',
                '本回合要牌得到 A 則結算時額外加上': 'Gain extra if an Ace was drawn this round',
                '手牌中至少 2 張同花色': 'At least 2 cards share a suit',
                '手牌中有 3 張以上同花色': 'At least 3 cards share a suit',
                '敵將明牌為 A': 'Enemy face-up card is A',
                '敵將明牌為 10 或 J/Q/K（視為 10）': 'Enemy face-up card is 10 or a face card',
                '上一回合己方曾爆牌（風險回報）': 'Player busted last round',
                '下一回合結算時生效（僅下一場）': 'Applies at the next settlement only',
                '本回合使用過錦囊': 'A scheme was used this round'
            }
        }
    }
};

function interpolate(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

function getNestedValue(source, key) {
    return key.split('.').reduce((current, part) => current?.[part], source);
}

export function normalizeLocale(locale) {
    if (!locale || typeof locale !== 'string') return null;

    const lower = locale.toLowerCase();

    if (lower.startsWith('zh-tw') || lower.startsWith('zh-hk') || lower.startsWith('zh-mo') || lower === 'zh-hant') {
        return 'zh-TW';
    }

    if (lower.startsWith('zh-cn') || lower.startsWith('zh-sg') || lower === 'zh-hans') {
        return 'zh-CN';
    }

    if (lower.startsWith('zh')) {
        return 'zh-CN';
    }

    if (lower.startsWith('en')) {
        return 'en';
    }

    return null;
}

export function detectPreferredLocale(languages = []) {
    for (const locale of languages) {
        const normalized = normalizeLocale(locale);
        if (normalized && SUPPORTED_LOCALES.includes(normalized)) {
            return normalized;
        }
    }

    return 'en';
}

export function getBrowserLocale(nav = globalThis.navigator) {
    const languages = Array.isArray(nav?.languages) && nav.languages.length > 0
        ? nav.languages
        : [nav?.language].filter(Boolean);

    return detectPreferredLocale(languages);
}

export function loadSavedLocale(storage = globalThis.localStorage) {
    const value = storage?.getItem?.(LOCALE_STORAGE_KEY);
    return SUPPORTED_LOCALES.includes(value) ? value : null;
}

export function saveLocalePreference(storage = globalThis.localStorage, locale) {
    if (!SUPPORTED_LOCALES.includes(locale)) return;
    storage?.setItem?.(LOCALE_STORAGE_KEY, locale);
}

export function getInitialLocale({ storage = globalThis.localStorage, languages, navigator: nav = globalThis.navigator } = {}) {
    const savedLocale = loadSavedLocale(storage);
    if (savedLocale) return savedLocale;
    if (languages) return detectPreferredLocale(languages);
    return getBrowserLocale(nav);
}

export function createTranslator(locale = 'en') {
    const resolvedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
    const table = TRANSLATIONS[resolvedLocale];
    const englishTable = TRANSLATIONS.en;

    return (key, vars = {}) => {
        const localized = getNestedValue(table, key);
        const fallback = getNestedValue(englishTable, key);
        const value = localized ?? fallback;

        if (typeof value !== 'string') {
            return key;
        }

        return interpolate(value, vars);
    };
}

export function translateDataLabel(locale, category, value) {
    const resolvedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
    const localized = TRANSLATIONS[resolvedLocale]?.data?.[category]?.[value];
    const fallback = TRANSLATIONS.en?.data?.[category]?.[value];
    return localized ?? fallback ?? value;
}

export function applyDocumentLocalization(locale) {
    const resolvedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
    const { meta } = TRANSLATIONS[resolvedLocale];

    if (typeof document === 'undefined') return;

    document.documentElement.lang = meta.htmlLang;

    if (document.title !== undefined) {
        document.title = meta.title;
    }

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute('content', meta.description);
    }

    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.textContent = createTranslator(resolvedLocale)('ui.loading');
    }
}

export { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES, TRANSLATIONS };
