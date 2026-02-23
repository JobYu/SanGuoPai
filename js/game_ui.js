// Game UI and State Management
import dataManager from './data_manager.js';
import { Deck, Hand, SUITS, RANKS } from './engine/blackjack.js';
import AIEngine from './engine/ai.js';
import CombatEngine from './engine/combat.js';

class GameState {
    constructor() {
        this.currentScreen = 'LOADING';
        this.hands = 3;
        this.discards = 3;
        this.selectedGenerals = [];
        this.currentEnemy = null;
        this.enemyMorale = 0;

        this.deck = new Deck();
        this.playerHand = new Hand();
        this.enemyHand = new Hand();
        this.selectedForDiscard = new Set();

        this.turn = 'PLAYER'; // PLAYER, ENEMY
        this.logs = [];
        this.viewingDeck = false;
        this.viewingEnemyDetail = false;
        this.viewingGeneralDetail = false;
        this.selectedGeneralIndex = -1;

        this.hitLimit = 3;
        this.hitsThisRound = 0;
        this.money = 0;
        this.maxSlots = 5;
        this.slotUpgradePrice = 500;
        this.leaderboard = this.getLeaderboard();
        this.defeatedEnemies = [];
        this.schemes = []; // Player's current schemes
        this.maxSchemes = 3;
        this.relics = []; // Passive items
    }

    getCharacterImage(id) {
        if (!id) return null;

        const basePath = './assets/avatars/';
        const suffix = '_sexy_pixel.png';

        // Special mapping for lu_bu as I used 'lu_bu_boss' in filename
        let filename = id;
        if (id === 'lu_bu') filename = 'lu_bu_boss';

        const generated = [
            'zhang_jiao', 'yu_jin', 'ma_dai', 'ding_feng', 'xia_hou_dun',
            'guan_ping', 'sun_shang_xiang', 'hua_xiong', 'lu_xun', 'zhang_liao',
            'huang_yue_ying', 'lu_bu_boss', 'cao_cao', 'zhu_ge_liang', 'zhou_yu', 'dong_zhuo',
            'guan_yu', 'zhang_fei', 'zhao_yun', 'xu_chu', 'dian_wei', 'gan_ning', 'tai_shi_ci',
            'diao_chan', 'cheng_yuan_zhi', 'deng_mao', 'gao_sheng', 'yan_zheng'
        ];

        if (generated.includes(filename)) {
            return `${basePath}${filename}${suffix}`;
        }
        return null;
    }

    showEnemyDetail() {
        if (this.currentEnemy) {
            this.viewingEnemyDetail = true;
            this.render();
        }
    }

    closeEnemyDetail() {
        this.viewingEnemyDetail = false;
        this.render();
    }

    showGeneralDetail(index) {
        if (this.selectedGenerals[index]) {
            this.selectedGeneralIndex = index;
            this.viewingGeneralDetail = true;
            this.render();
        }
    }

    closeGeneralDetail() {
        this.viewingGeneralDetail = false;
        this.selectedGeneralIndex = -1;
        this.render();
    }

    async init() {
        try {
            await dataManager.loadAllData();
            this.startNewGame();
        } catch (e) {
            console.error(e);
            const mount = document.getElementById('screen-mount');
            if (mount) mount.innerHTML = `<div style="color:red">載入失敗: ${e.message}</div>`;
        }
    }

    startNewGame() {
        this.hands = 3;
        this.discards = 3;
        this.money = 0;
        this.selectedGenerals = [];
        this.maxSlots = 5;
        this.slotUpgradePrice = 500;
        this.leaderboard = this.getLeaderboard();
        this.defeatedEnemies = [];
        this.schemes = [];
        this.relics = [];
        this.maxSchemes = 3;
        this.bustLastRound = false;
        this.bustThisRound = false;
        this.xiahouDunBuffActive = false;
        this.xiahouDunBuffPending = false;
        this.drewAceThisRound = false;
        this.schemesUsedThisRound = false;
        this.setScreen('START');
    }

    saveScore(score) {
        const entry = {
            score: score,
            date: new Date().toLocaleDateString(),
            generals: this.selectedGenerals.map(g => g.name).join(', ')
        };
        const scores = this.getLeaderboard();
        scores.push(entry);
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('sanguopai_leaderboard', JSON.stringify(scores.slice(0, 10)));
        this.leaderboard = this.getLeaderboard();
    }

    getLeaderboard() {
        const data = localStorage.getItem('sanguopai_leaderboard');
        return data ? JSON.parse(data) : [];
    }

    setScreen(screen) {
        this.currentScreen = screen;
        this.render();
    }

    selectGeneral(general) {
        if (this.selectedGenerals.length < this.maxSlots && !this.selectedGenerals.find(g => g.id === general.id)) {
            this.selectedGenerals.push(general);
            this.render();
        }
    }

    sellGeneral(index) {
        const gen = this.selectedGenerals[index];
        if (!gen) return;

        // Sell price is 50% of its rarity price
        const priceMap = { 'Common': 100, 'Uncommon': 250, 'Rare': 600, 'Legendary': 1500 };
        const sellPrice = Math.floor((priceMap[gen.rarity] || 200) * 0.5);

        this.money += sellPrice;
        this.selectedGenerals.splice(index, 1);
        this.logs.push(`出售了 ${gen.name}，獲得了 $${sellPrice}`);
        this.render();
    }

    buySlot() {
        if (this.money < this.slotUpgradePrice) {
            alert(`金錢不足！需要 $${this.slotUpgradePrice}`);
            return;
        }

        this.money -= this.slotUpgradePrice;
        this.maxSlots++;
        this.slotUpgradePrice = Math.floor(this.slotUpgradePrice * 1.5); // Price increases
        this.logs.push(`武將位擴張！目前上限: ${this.maxSlots}`);
        this.render();
    }

    getFactionCounts() {
        const counts = {};
        this.selectedGenerals.forEach(g => {
            if (g.faction) {
                counts[g.faction] = (counts[g.faction] || 0) + 1;
            }
        });
        return counts;
    }

    startBattle(enemyIndex = 1) {
        this.currentEnemy = dataManager.getEnemyByStage(enemyIndex);
        this.enemyMorale = this.currentEnemy.morale;
        // Reset hands and discards for each battle
        this.hands = 3;
        const fCounts = this.getFactionCounts();
        const weiBonus = fCounts['魏'] >= 3 ? 1 : 0;
        const redHareBonus = this.relics.find(r => r.id === 'red_hare') ? 1 : 0;
        const bonusDiscards = this.selectedGenerals.reduce((sum, g) => sum + (g.bonus_discards || 0), 0);
        this.discards = 3 + bonusDiscards + weiBonus + redHareBonus;
        this.setScreen('BATTLE');
        this.newRound();
        if (weiBonus) this.logs.push('【魏軍羈絆】額外獲得 1 次棄牌次數');
        if (redHareBonus) this.logs.push('【赤兔馬】額外獲得 1 次棄牌次數');
    }

    newRound() {
        this.currentScreen = 'BATTLE';
        this.deck.reset();
        this.deck.shuffle();
        this.playerHand.clear();
        this.enemyHand.clear();
        this.selectedForDiscard.clear();
        this.hitsThisRound = 0;
        this.drewAceThisRound = false;
        this.schemesUsedThisRound = false;
        this.enemyForceStand = false;
        this.bustLastRound = this.bustThisRound || false;
        this.bustThisRound = false;
        this.xiahouDunBuffActive = this.xiahouDunBuffPending || false;
        this.xiahouDunBuffPending = false;

        // Initial deal
        this.playerHand.addCard(this.deck.draw());
        this.playerHand.addCard(this.deck.draw());
        this.enemyHand.addCard(this.deck.draw()); // Visible
        this.enemyHand.addCard(this.deck.draw()); // Hidden

        this.turn = 'PLAYER';
        this.logs = ['戰鬥開始！每回合最多要牌 3 次。'];
        this.render();
    }

    playerHit() {
        if (this.turn !== 'PLAYER' || this.hitsThisRound >= this.hitLimit) return;

        const card = this.deck.draw();
        this.playerHand.addCard(card);
        this.hitsThisRound++;
        if (card.rank === 'A') this.drewAceThisRound = true;
        this.logs.push(`你抽到了 ${card.toString()} (本回合要牌: ${this.hitsThisRound}/${this.hitLimit})`);
        this.render();
    }

    playerPlayHand() {
        if (this.turn !== 'PLAYER' || this.hands <= 0) return;

        this.hands--; // Always consume a hand count when playing

        // Play Hand (出牌) now performs the bust check
        if (this.playerHand.isBust()) {
            this.logs.push('爆牌了！');
            this.resolveTurn();
        } else {
            this.turn = 'ENEMY';
            this.resolveEnemyTurn();
        }
    }

    toggleCardSelection(index) {
        if (this.turn !== 'PLAYER') return;
        if (this.selectedForDiscard.has(index)) {
            this.selectedForDiscard.delete(index);
        } else {
            this.selectedForDiscard.add(index);
        }
        this.render();
    }

    playerDiscard() {
        if (this.turn !== 'PLAYER' || this.discards <= 0 || this.selectedForDiscard.size === 0) return;

        const indices = Array.from(this.selectedForDiscard).sort((a, b) => b - a);
        indices.forEach(idx => {
            this.playerHand.cards.splice(idx, 1);
        });

        this.discards--;
        this.selectedForDiscard.clear();
        this.logs.push(`棄牌完成，剩餘棄牌次數: ${this.discards}`);
        this.render();
    }

    toggleDeckView() {
        this.viewingDeck = !this.viewingDeck;
        this.render();
    }

    useScheme(index) {
        if (this.turn !== 'PLAYER') return;
        const schemeId = this.schemes[index]?.id;
        if (!schemeId) return;

        this.schemesUsedThisRound = true;
        this.schemes.splice(index, 1);

        if (schemeId === 'borrow_east_wind') {
            if (this.deck.cards.length > 0) {
                const peek = this.deck.cards[0];
                this.logs.push(`【借東風】窺探天機：下一張牌是 ${peek.toString()}`);
            }
        } else if (schemeId === 'empty_city') {
            this.enemyForceStand = true;
            this.logs.push(`【空城計】發動成功！敵軍下一回合將不敢進軍（強制停牌）。`);
        }

        this.render();
    }

    async resolveEnemyTurn() {
        this.logs.push('敵將回合...');
        this.render();

        if (this.enemyForceStand) {
            this.logs.push('敵軍受【空城計】影響，不敢妄動，強制停牌！');
            await new Promise(r => setTimeout(r, 1000));
        } else {
            // Simple delay for "thinking"
            while (AIEngine.shouldHit(this.currentEnemy, this.enemyHand, this.playerHand)) {
                await new Promise(r => setTimeout(r, 800));
                const card = this.deck.draw();
                this.enemyHand.addCard(card);
                this.logs.push(`敵將抽牌...`);
                this.render();
                if (this.enemyHand.isBust()) {
                    this.logs.push('敵將爆牌！');
                    break;
                }
            }
        }

        this.resolveTurn();
    }

    resolveTurn() {
        this.turn = 'PLAYER';
        const pPoints = this.playerHand.getPoints();
        const ePoints = this.enemyHand.getPoints();

        const breakdown = {
            base: 0,
            skills: [],
            total: 0,
            isBlackjack: this.playerHand.isBlackjack(),
            result: 'DRAW'
        };

        const additive = [];
        const multipliers = [];

        this.selectedGenerals.forEach(g => {
            const isSettlement = g.skill_trigger === '結算時';
            const is21Trigger = g.skill_trigger === '達成 21 點時' && pPoints === 21;
            const isXiahouDunBuff = g.skill_trigger === '爆牌時' && this.xiahouDunBuffActive;

            if (isSettlement || is21Trigger || isXiahouDunBuff) {
                let effectApplied = false;
                g.skill_effects.forEach(eff => {
                    let shouldApply = false;
                    const cond = eff.condition;

                    if (!cond || cond === '該次結算' || cond === '無' || cond === '無條件') {
                        shouldApply = true;
                    } else if (cond === '玩家點數恰為 21') {
                        if (pPoints === 21) shouldApply = true;
                    } else if (cond === '否則') {
                        if (!effectApplied) shouldApply = true;
                    } else if (cond === '玩家點數 ≥ 15') {
                        if (pPoints >= 15) shouldApply = true;
                    } else if (cond === '玩家點數 ≥ 17 且 ≤ 20' || cond === '玩家點數為 17～20') {
                        if (pPoints >= 17 && pPoints <= 20) shouldApply = true;
                    } else if (cond === '敵將點數 ≥ 17') {
                        if (ePoints >= 17) shouldApply = true;
                    } else if (cond === '敵將點數 ≥ 18') {
                        if (ePoints >= 18) shouldApply = true;
                    } else if (cond === '玩家要牌次數為 0' || cond === '玩家未要牌即直接出牌（僅初始兩張）') {
                        if (this.hitsThisRound === 0) shouldApply = true;
                    } else if (cond === '玩家要牌次數為 1') {
                        if (this.hitsThisRound === 1) shouldApply = true;
                    } else if (cond === '玩家要牌次數 ≤ 1') {
                        if (this.hitsThisRound <= 1) shouldApply = true;
                    } else if (cond === '玩家要牌次數 ≥ 2') {
                        if (this.hitsThisRound >= 2) shouldApply = true;
                    } else if (cond === '玩家手牌數為 2 張') {
                        if (this.playerHand.cards.length === 2) shouldApply = true;
                    } else if (cond === '玩家手牌數 ≥ 4 張') {
                        if (this.playerHand.cards.length >= 4) shouldApply = true;
                    } else if (cond === '本回合要牌得到 A 則結算時額外加上') {
                        if (this.drewAceThisRound) shouldApply = true;
                    } else if (cond === '手牌中至少 2 張同花色') {
                        const suits = this.playerHand.cards.map(c => c.suit);
                        const counts = {};
                        suits.forEach(s => counts[s] = (counts[s] || 0) + 1);
                        if (Object.values(counts).some(c => c >= 2)) shouldApply = true;
                    } else if (cond === '手牌中有 3 張以上同花色') {
                        const suits = this.playerHand.cards.map(c => c.suit);
                        const counts = {};
                        suits.forEach(s => counts[s] = (counts[s] || 0) + 1);
                        if (Object.values(counts).some(c => c >= 3)) shouldApply = true;
                    } else if (cond === '敵將明牌為 A') {
                        if (this.enemyHand.cards[0] && this.enemyHand.cards[0].rank === 'A') shouldApply = true;
                    } else if (cond === '敵將明牌為 10 或 J/Q/K（視為 10）') {
                        const rank = this.enemyHand.cards[0] ? this.enemyHand.cards[0].rank : null;
                        if (['10', 'J', 'Q', 'K'].includes(rank)) shouldApply = true;
                    } else if (cond === '上一回合己方曾爆牌（風險回報）') {
                        if (this.bustLastRound) shouldApply = true;
                    } else if (cond === '下一回合結算時生效（僅下一場）') {
                        if (this.xiahouDunBuffActive) shouldApply = true;
                    } else if (cond === '本回合使用過錦囊') {
                        if (this.schemesUsedThisRound) shouldApply = true;
                    } else if (cond.includes('玩家點數大於敵將且差 ≥')) {
                        const diff = parseInt(cond.match(/\d+/)[0]);
                        if ((pPoints - ePoints) >= diff) shouldApply = true;
                    } else {
                        // Fallback: if we haven't implemented it, assume it applies for now
                        // to maintain existing (though possibly loose) behavior
                        shouldApply = true;
                    }

                    if (shouldApply) {
                        if (eff.type === '加法') additive.push({ name: g.name, value: eff.value, type: '加法' });
                        if (eff.type === '乘法') multipliers.push({ name: g.name, value: eff.value, type: '乘法' });
                        effectApplied = true;
                    }
                });
            }
        });

        const fCounts = this.getFactionCounts();
        if (fCounts['吳'] >= 3) {
            const suits = this.playerHand.cards.map(c => c.suit);
            const counts = {};
            suits.forEach(s => counts[s] = (counts[s] || 0) + 1);
            if (Object.values(counts).some(c => c >= 3)) {
                multipliers.push({ name: '吳軍羈絆(三同花)', value: 1.1, type: '乘法' });
            }
        }
        if (fCounts['群'] >= 3) {
            const variance = Math.floor(Math.random() * 21) - 10;
            additive.push({ name: '群雄羈絆', value: 50 + variance, type: '加法' });
        }

        const damageResult = CombatEngine.calculateDamage(
            pPoints, ePoints, breakdown.isBlackjack,
            additive.map(a => a.value),
            multipliers.map(m => m.value)
        );

        breakdown.pPoints = pPoints;
        breakdown.ePoints = ePoints;
        breakdown.eEffective = ePoints > 21 ? 0 : ePoints;

        if (pPoints > 21) {
            breakdown.result = 'BUST';
            this.bustThisRound = true;
            if (this.selectedGenerals.some(g => g.id === 'xia_hou_dun')) {
                this.xiahouDunBuffPending = true;
                this.logs.push('夏侯惇【剛烈】觸發！下一回合倍率提升。');
            }
        } else if (ePoints > 21 || pPoints > ePoints || pPoints === 21) {
            breakdown.result = 'WIN';
            const multiplier = 10 + (21 - pPoints);
            breakdown.base = (pPoints * multiplier) + pPoints;
            breakdown.skills = [...additive, ...multipliers];
            breakdown.total = damageResult;
            this.enemyMorale -= damageResult;

            // Grant money equal to damage
            this.money += damageResult;
            this.logs.push(`獲勝！獲得了 $${damageResult}`);
        } else if (pPoints < ePoints) {
            breakdown.result = 'LOSE';
        }

        this.showSettlement(breakdown);
    }

    showSettlement(breakdown) {
        this.currentScreen = 'SETTLEMENT';
        this.settlementData = breakdown;
        this.render();
    }

    showRewardScreen() {
        if (this.enemyMorale > 0) return; // Must defeat enemy to get rewards

        // Track this defeated enemy
        if (!this.defeatedEnemies.includes(this.currentEnemy.name)) {
            this.defeatedEnemies.push(this.currentEnemy.name);
        }

        this.currentScreen = 'REWARD';
        const all = dataManager.generals;
        this.rewardOptions = [];

        // Probability of enemy card
        const enemyAsGen = all.find(g => g.name === this.currentEnemy.name);
        const lowChanceEnemies = ['cheng_yuan_zhi', 'deng_mao', 'gao_sheng', 'yan_zheng'];
        const recruitChance = lowChanceEnemies.includes(this.currentEnemy.id) ? 0.25 : 0.5;
        if (enemyAsGen && Math.random() < recruitChance && !this.selectedGenerals.find(g => g.id === enemyAsGen.id)) {
            const priceMap = { 'Common': 100, 'Uncommon': 250, 'Rare': 600, 'Legendary': 1500 };
            enemyAsGen.price = priceMap[enemyAsGen.rarity] || 200;
            this.rewardOptions.push(enemyAsGen);
        }

        const enemyNames = dataManager.enemies.map(e => e.name);
        const availableGenerals = all.filter(g =>
            !this.selectedGenerals.find(sg => sg.id === g.id) &&
            !this.rewardOptions.find(ro => ro.id === g.id) &&
            (!enemyNames.includes(g.name) || this.defeatedEnemies.includes(g.name))
        );

        const availableSchemes = dataManager.schemes.filter(s => !this.schemes.find(myS => myS.id === s.id) && !this.rewardOptions.find(ro => ro.id === s.id));
        const availableRelics = dataManager.relics.filter(r => !this.relics.find(myR => myR.id === r.id) && !this.rewardOptions.find(ro => ro.id === r.id));
        const availableItems = [...availableSchemes, ...availableRelics];
        let addedItem = false;

        while (this.rewardOptions.length < 3 && (availableGenerals.length > 0 || (!addedItem && availableItems.length > 0))) {
            if (!addedItem && availableItems.length > 0 && Math.random() < 0.25) {
                const randIdx = Math.floor(Math.random() * availableItems.length);
                const item = availableItems.splice(randIdx, 1)[0];
                this.rewardOptions.push(item);
                addedItem = true;
                continue;
            }

            if (availableGenerals.length > 0) {
                const randIdx = Math.floor(Math.random() * availableGenerals.length);
                const rand = availableGenerals.splice(randIdx, 1)[0];
                const priceMap = { 'Common': 100, 'Uncommon': 250, 'Rare': 600, 'Legendary': 1500 };
                rand.price = priceMap[rand.rarity] || 200;
                this.rewardOptions.push(rand);
            } else {
                break;
            }
        }

        const fCounts = this.getFactionCounts();
        this.rewardOptions.forEach(opt => {
            if (opt.type === 'active' && fCounts['蜀'] >= 3) {
                opt.price = Math.floor(opt.price * 0.8);
                opt.description = `(蜀軍羈絆特價) ${opt.description}`;
            }
        });

        this.render();
    }

    claimReward(item) {
        if (this.money < item.price) {
            alert(`金錢不足！需要 $${item.price}`);
            return;
        }

        if (item.type === 'active' || item.type === 'passive') { // Scheme or Relic
            if (item.type === 'active' && this.schemes.length >= this.maxSchemes) {
                alert('錦囊位已滿！請先消耗錦囊。');
                return;
            }
            this.money -= item.price;
            if (item.type === 'active') {
                this.schemes.push(item);
                this.logs.push(`獲得錦囊：${item.name}`);
            } else {
                this.relics.push(item);
                this.logs.push(`獲得寶物：${item.name}`);
            }
        } else {
            if (this.selectedGenerals.length >= this.maxSlots) {
                alert('武將位已滿！請先出售武將。');
                return;
            }
            this.money -= item.price;
            this.selectedGenerals.push(item);
        }

        const nextStage = this.currentEnemy.stage_index + 1;
        const nextEnemy = dataManager.getEnemyByStage(nextStage);
        if (nextEnemy) {
            this.startBattle(nextStage);
        } else {
            this.logs.push('恭喜！你已平定亂世，統一三國！');
            this.saveScore(this.money);
            alert(`恭喜通關！你的終局積分（金錢）: $${this.money}`);
            this.startNewGame();
        }
    }

    skipReward() {
        const nextStage = this.currentEnemy.stage_index + 1;
        const nextEnemy = dataManager.getEnemyByStage(nextStage);
        if (nextEnemy) {
            this.startBattle(nextStage);
        } else {
            this.setScreen('START');
        }
    }

    render() {
        const mount = document.getElementById('screen-mount');
        if (!mount) return;

        mount.innerHTML = `
            <div class="game-layout">
                ${this.currentScreen !== 'START' ? `
                <div id="top-bar">
                    <div class="generals-strip">
                        ${this.selectedGenerals.map((g, i) => {
            const img = this.getCharacterImage(g.id);
            return `
                            <div class="gen-mini tooltip-trigger" style="padding: 0; overflow: hidden; cursor: pointer;" onclick="game.showGeneralDetail(${i})">
                                ${img ? `<img src="${img}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; z-index: 1;">` : `<span style="position: relative; z-index: 2; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px;">${g.name}</span>`}
                                <button class="sell-btn" style="z-index: 3;" onclick="game.sellGeneral(${i}); event.stopPropagation();">售</button>
                                <div class="tooltip">
                                    <strong>${g.name} [${g.rarity}]</strong>
                                    ${g.flavour}
                                </div>
                            </div>
                        `}).join('')}
                         ${this.currentEnemy ? `
                             <div style="flex-grow: 1;"></div>
                             <div class="gen-mini tooltip-trigger" 
                                  style="border-color: #ff4d4d; background: rgba(255, 77, 77, 0.2); margin-left: auto; padding: 0; overflow: hidden; cursor: pointer;"
                                  onclick="game.showEnemyDetail()">
                                 ${this.getCharacterImage(this.currentEnemy.id) ? `<img src="${this.getCharacterImage(this.currentEnemy.id)}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; z-index: 1;">` : `<span style="position: relative; z-index: 2; background: rgba(0,0,0,0.5); padding: 2px 5px; border-radius: 4px; color: #ff4d4d;">${this.currentEnemy.name}</span>`}
                                 <div class="tooltip">
                                     <strong style="color: #ff4d4d;">${this.currentEnemy.name} [敵將]</strong>
                                     ${this.currentEnemy.flavour}
                                     <div style="margin-top: 5px; color: #aaa; font-size: 0.8rem;">點擊查看詳情</div>
                                 </div>
                             </div>
                         ` : ''}
                     </div>
                 </div>
                 ` : ''}
                 <div id="main-area">
                     ${this.currentScreen !== 'START' ? `
                     <div id="left-bar">
                         ${this.currentEnemy ? `
                         <div class="stat-box enemy-stat" style="margin-bottom: 15px;">
                            <div style="font-size: 0.8rem; color: #888; margin-bottom: 5px;">第 ${this.currentEnemy.stage_index} 場對決</div>
                            <h3 style="font-size: 1rem; color: var(--gold-bright);">目標：${this.currentEnemy.name}</h3>
                            <progress value="${this.currentEnemy.morale - Math.max(0, this.enemyMorale)}" max="${this.currentEnemy.morale}" class="side-progress"></progress>
                            <div class="score-display" style="font-size: 0.9rem; margin-top: 5px; color: var(--gold-bright);">${Math.max(0, this.currentEnemy.morale - Math.max(0, this.enemyMorale))} / ${this.currentEnemy.morale}</div>
                        </div>
                        ` : ''}
                        <div class="stat-box">
                            <h3>金錢 ($)</h3>
                            <div class="stat-val" style="color: var(--gold)">$${this.money}</div>
                        </div>
                        ${this.relics && this.relics.length > 0 ? `
                        <div class="stat-box" style="margin-top: 15px;">
                            <h3>持有寶物</h3>
                            <div style="font-size: 0.9rem; color: #a8dadc;">
                                ${this.relics.map(r => `<div class="tooltip-trigger" style="cursor:help; margin-top:5px;">[${r.name}]<div class="tooltip">${r.description}</div></div>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    <div id="center-battle" ${this.currentScreen === 'START' ? 'style="width: 100%;"' : ''}>
                        ${this.renderCurrentView()}
                    </div>
                </div>
            </div>
            ${this.renderOverlay()}
        `;
    }

    renderCurrentView() {
        if (this.currentScreen === 'START') return this.renderTitleHTML();
        if (this.currentScreen === 'BATTLE' || this.currentScreen === 'SETTLEMENT') return this.renderBattleHTML();
        return '';
    }

    renderTitleHTML() {
        return `
            <div class="title-screen">
                <h1 style="font-size: 4rem; color: var(--gold); margin-bottom: 20px;">三國派</h1>
                <p style="font-size: 1.2rem; color: #aaa; margin-bottom: 40px; font-style: italic;">
                    Roguelike 21點博弈冒險
                </p>
                <div class="title-actions" style="display: flex; gap: 20px; justify-content: center;">
                    <button onclick="game.startNewGame(); game.startBattle(1)" style="font-size: 1.5rem; padding: 15px 60px; background: var(--accent-red);">
                        開始遊戲
                    </button>
                </div>

                ${this.leaderboard.length > 0 ? `
                    <div class="leaderboard-area" style="margin-top: 40px; width: 80%; max-width: 600px;">
                        <h2 style="color: var(--gold); border-bottom: 2px solid var(--gold); padding-bottom: 5px;">英雄榜 (Top 10)</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9rem;">
                            <thead>
                                <tr style="color: #888; text-align: left;">
                                    <th style="padding: 5px;">日期</th>
                                    <th style="padding: 5px;">積分</th>
                                    <th style="padding: 5px;">武將陣容</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.leaderboard.map(entry => `
                                    <tr style="border-bottom: 1px solid #333;">
                                        <td style="padding: 8px;">${entry.date}</td>
                                        <td style="padding: 8px; color: var(--gold); font-weight: bold;">$${entry.score}</td>
                                        <td style="padding: 8px; color: #aaa; font-style: italic;">${entry.generals}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : ''}

                <div class="title-hint" style="margin-top: 60px; color: #666; font-size: 0.9rem;">
                    提示：點擊手牌可以選擇棄牌，出牌時才會計算爆牌。
                </div>
            </div>
        `;
    }

    renderBattleHTML() {
        const enemy = this.currentEnemy;

        return `
            <div class="battle-scene">
                <div style="height: 30px;"></div>
                
                <div class="hand-row enemy-hand">
                    ${this.enemyHand.cards.map((c, i) =>
            (this.turn === 'PLAYER' && i === 1) ? '<div class="playing-card back">?</div>' : `<div class="playing-card">${c.toString()}</div>`
        ).join('')}
                </div>

                <div class="battle-logs">
                    ${this.logs.slice(-2).map(l => `<div>${l}</div>`).join('')}
                </div>

                <div class="hand-row player-hand">
                    ${this.playerHand.cards.map((c, i) => `
                        <div class="playing-card ${this.selectedForDiscard.has(i) ? 'selected' : ''}" 
                             onclick="game.toggleCardSelection(${i})">
                            ${c.toString()}
                        </div>
                    `).join('')}
                </div>

                <div class="action-row">
                    <div class="point-bubble" style="${this.playerHand.isBust() ? 'color: #ff4d4d; border: 2px solid #ff4d4d;' : ''}">
                        點數: ${this.playerHand.getPoints()}
                    </div>
                    <button onclick="game.playerHit()" ${this.turn !== 'PLAYER' || this.hitsThisRound >= this.hitLimit ? 'disabled' : ''}>
                        要牌 (Hit) ${this.hitsThisRound}/${this.hitLimit}
                    </button>
                    <button onclick="game.playerPlayHand()" ${this.turn !== 'PLAYER' ? 'disabled' : ''} style="background: var(--gold); color: #000;">
                        出牌 (Play Hand) ${this.hands}
                    </button>
                    <button onclick="game.playerDiscard()" 
                            ${this.turn !== 'PLAYER' || this.discards <= 0 || this.selectedForDiscard.size === 0 ? 'disabled' : ''}
                             style="background: #4da6ff">
                        棄牌 (Discard) ${this.discards}
                    </button>
                    ${this.schemes.length > 0 ? `
                        <div class="schemes-tray" style="display:flex; gap: 5px; margin-left:10px;">
                            ${this.schemes.map((s, idx) => `
                                <button onclick="game.useScheme(${idx})" style="background:var(--accent-red); padding:5px 10px; font-size:0.8rem; border-radius:4px;">
                                    錦囊:${s.name}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div onclick="game.toggleDeckView()" style="cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 5px 15px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; margin-left: 10px;">
                        <span style="font-size: 0.8rem; color: #888;">牌組</span>
                        <strong style="font-size: 1.2rem; color: var(--gold-bright);">${this.deck.cards.length}</strong>
                    </div>
                </div>
            </div>
        `;
    }

    renderOverlay() {
        if (this.viewingDeck) return this.renderDeckModal();
        if (this.viewingEnemyDetail) return this.renderEnemyDetailModal();
        if (this.viewingGeneralDetail) return this.renderGeneralDetailModal();
        if (this.currentScreen === 'SETTLEMENT') return this.renderSettlementHTML();
        if (this.currentScreen === 'REWARD') return this.renderRewardHTML();
        if (this.currentScreen === 'BATTLE' && this.turn === 'PLAYER' && this.hands <= 0 && this.enemyMorale > 0) return this.renderGameOverHTML();
        return '';
    }

    renderGeneralDetailModal() {
        const general = this.selectedGenerals[this.selectedGeneralIndex];
        if (!general) return '';
        const img = this.getCharacterImage(general.id);

        return `
            <div class="overlay" onclick="game.closeGeneralDetail()">
                <div class="modal" onclick="event.stopPropagation()" style="max-width: 500px; padding: 40px; text-align: left;">
                    <div style="display: flex; gap: 30px; align-items: flex-start;">
                        ${img ? `<div style="width: 150px; height: 200px; border: 2px solid var(--gold); border-radius: 8px; overflow: hidden; background: #000; flex-shrink: 0;">
                            <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>` : ''}
                        <div>
                            <h2 style="color: var(--gold-bright); margin-bottom: 5px;">${general.name}</h2>
                            <div style="color: var(--gold); font-size: 0.9rem; margin-bottom: 15px;">${general.rarity} | ${general.faction}軍</div>
                            
                            <div style="margin-bottom: 20px; line-height: 1.6; font-style: italic; color: #aaa; border-left: 3px solid var(--gold); padding-left: 15px;">
                                "${general.flavour}"
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                                <div style="margin-bottom: 10px; font-weight: bold; color: var(--gold-bright);">技能：${general.skill_name}</div>
                                <div style="color: #eee; font-size: 0.9rem;">觸發：${general.skill_trigger}</div>
                                <div style="color: #ccc; font-size: 0.85rem; margin-top: 5px;">
                                    ${general.skill_effects.map(e => `● ${e.condition || '無條件'}：${e.type}${e.value}`).join('<br>')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onclick="game.closeGeneralDetail()" style="margin-top: 30px; width: 100%;">返回戰場</button>
                </div>
            </div>
        `;
    }

    renderEnemyDetailModal() {
        const enemy = this.currentEnemy;
        const img = this.getCharacterImage(enemy.id);

        return `
            <div class="overlay" onclick="game.closeEnemyDetail()">
                <div class="modal" onclick="event.stopPropagation()" style="max-width: 500px; padding: 40px; text-align: left;">
                    <div style="display: flex; gap: 30px; align-items: flex-start;">
                        ${img ? `<div style="width: 150px; height: 200px; border: 2px solid var(--gold); border-radius: 8px; overflow: hidden; background: #000; flex-shrink: 0;">
                            <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>` : ''}
                        <div>
                            <h2 style="color: var(--gold-bright); margin-bottom: 5px;">${enemy.name}</h2>
                            <div style="color: #ff4d4d; font-size: 0.9rem; margin-bottom: 15px;">敵軍大將</div>
                            
                            <div style="margin-bottom: 20px; line-height: 1.6; font-style: italic; color: #aaa; border-left: 3px solid #444; padding-left: 15px;">
                                "${enemy.flavour}"
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <span style="color: #888;">AI 性格：</span>
                                    <span style="color: #eee;">${enemy.ai_tendency}</span>
                                </div>
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <span style="color: #888;">停牌閾值：</span>
                                    <span style="color: #eee;">${enemy.ai_stand_threshold} 點</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #888;">初始士氣：</span>
                                    <span style="color: #eee;">${enemy.morale}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onclick="game.closeEnemyDetail()" style="margin-top: 30px; width: 100%;">返回戰場</button>
                </div>
            </div>
        `;
    }

    renderDeckModal() {
        const inDeck = (suit, rank) => this.deck.cards.some(c => c.suit === suit && c.rank === rank);

        return `
            <div class="overlay" onclick="game.toggleDeckView()">
                <div class="modal deck-modal" onclick="event.stopPropagation()" style="max-width: 850px; min-width: 800px;">
                    <h2 style="margin-bottom: 20px;">剩餘牌組狀態 (${this.deck.cards.length} / 52)</h2>
                    <div class="deck-display">
                        ${SUITS.map(suit => `
                            <div class="deck-row">
                                ${RANKS.map(rank => {
            const available = inDeck(suit, rank);
            const isRed = (suit === '♥' || suit === '♦');
            return `
                                        <div class="mini-card ${available ? '' : 'played'}" 
                                             style="color: ${available ? (isRed ? '#ff4d4d' : '#eee') : '#444'}">
                                            ${suit}${rank}
                                        </div>
                                    `;
        }).join('')}
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 30px; font-size: 0.9rem; color: #666; display: flex; justify-content: center; gap: 20px;">
                        <span>● 正常顯示：牌組中剩餘的牌</span>
                        <span>● 灰色透明：遊戲中已出現或領取的牌</span>
                    </div>
                    <button onclick="game.toggleDeckView()" style="margin-top: 30px;">關閉回歸戰場</button>
                </div>
            </div>
        `;
    }

    renderSettlementHTML() {
        const b = this.settlementData;

        const playerHandHTML = `
            <div class="settlement-hand">
                <span>你的手牌:</span>
                <div class="hand-row mini">
                    ${this.playerHand.cards.map(c => `<div class="playing-card mini">${c.toString()}</div>`).join('')}
                </div>
            </div>
        `;

        const enemyHandHTML = `
            <div class="settlement-hand">
                <span>敵將手牌:</span>
                <div class="hand-row mini">
                    ${this.enemyHand.cards.map(c => `<div class="playing-card mini">${c.toString()}</div>`).join('')}
                </div>
            </div>
        `;

        const pointsHTML = `
            <div class="calc-row" style="display: flex; gap: 30px; justify-content: center; align-items: center; margin: 15px 0; font-size: 1.2rem;">
                <div>玩家: <strong style="color: var(--gold-bright); font-size: 1.8rem;">${b.pPoints}</strong> ${b.pPoints > 21 ? '<span style="color: #ff4d4d">(爆)</span>' : ''}</div>
                <div style="font-size: 1.5rem; color: #666; font-weight: bold;">VS</div>
                <div>敵將: <strong style="color: #ff4d4d; font-size: 1.8rem;">${b.ePoints}</strong> ${b.ePoints > 21 ? '<span style="color: #ff4d4d">(爆)</span>' : ''}</div>
            </div>
        `;

        let resultTitle = '';
        let resultBody = '';

        if (b.result === 'WIN') {
            const currentMultiplier = 10 + (21 - b.pPoints);
            const baseValue = b.pPoints * currentMultiplier;
            const calcStr = `基礎獎勵 (${b.pPoints} 點 x ${currentMultiplier} 倍) + 手牌點數 (${b.pPoints})`;
            resultTitle = `<h2 class="win">${b.isBlackjack ? '完美 Blackjack' : '博弈獲勝！'}</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <div class="calc-formula" style="color: var(--gold-bright); font-size: 1.1rem; border: 1px dashed rgba(212,175,55,0.3); padding: 10px; border-radius: 8px;">
                        <div style="font-size: 0.9rem; color: #888; margin-bottom: 5px;">* 勝利點數越小，獎勵倍數越高</div>
                        ${calcStr} = ${b.base}
                    </div>
                    <hr>
                    <div class="skill-list">
                        ${b.skills.map(s => `<p>${s.name}: ${s.type === '加法' ? '+' : 'x'}${s.value}</p>`).join('')}
                    </div>
                    <hr>
                    <h3 class="total-score">本次得分: ${b.total}</h3>
                </div>
                <button onclick="${this.enemyMorale <= 0 ? 'game.showRewardScreen()' : 'game.newRound()'}">
                    ${this.enemyMorale <= 0 ? '擊敗敵將！領取獎勵' : '下一回合'}
                </button>
            `;
        } else if (b.result === 'BUST') {
            resultTitle = `<h2 class="lose">爆牌！</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <p>消耗 1 次出牌次數 (剩餘: ${this.hands})</p>
                </div>
                <button onclick="${this.hands > 0 ? 'game.newRound()' : 'game.setScreen(\'BATTLE\')'}">
                    ${this.hands > 0 ? '下一回合' : '確定'}
                </button>
            `;
        } else if (b.result === 'LOSE') {
            resultTitle = `<h2 class="lose">博弈失敗！</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <p>消耗 1 次出牌次數 (剩餘: ${this.hands})</p>
                </div>
                <button onclick="${this.hands > 0 ? 'game.newRound()' : 'game.setScreen(\'BATTLE\')'}">
                    ${this.hands > 0 ? '下一回合' : '確定'}
                </button>
            `;
        } else {
            resultTitle = `<h2 class="draw">平局</h2>`;
            resultBody = `
                <div class="breakdown">${pointsHTML}</div>
                <button onclick="game.newRound()">下一回合</button>
            `;
        }

        return `
            <div class="overlay">
                <div class="modal">
                    ${resultTitle}
                    <div style="display: flex; flex-direction: column; gap: 10px; align-items: center; margin: 10px 0;">
                        ${enemyHandHTML}
                        ${playerHandHTML}
                    </div>
                    ${resultBody}
                </div>
            </div>
        `;
    }

    renderRewardHTML() {
        const priceMap = { 'Common': 100, 'Uncommon': 250, 'Rare': 600, 'Legendary': 1500 };
        return `
            <div class="overlay">
                <div class="modal reward-modal" style="max-width: 1000px;">
                    <h2>招募武將 (剩餘金錢: $${this.money})</h2>
                    
                    ${this.selectedGenerals.length > 0 ? `
                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; width: 100%;">
                        <h4 style="color: #aaa; margin-bottom: 10px;">已擁有武將 (點擊出售)</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                            ${this.selectedGenerals.map((g, i) => `
                                <div class="owned-general" onclick="game.sellGeneral(${i})" style="padding: 8px 15px; background: #333; border: 1px solid #555; border-radius: 5px; cursor: pointer; transition: 0.2s;">
                                    <span style="color: var(--gold);">${g.name}</span>
                                    <span style="color: #888; font-size: 0.8rem;"> (售 $${Math.floor((priceMap[g.rarity] || 200) * 0.5)})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="reward-list">
                        ${this.rewardOptions.map(g => `
                            <div class="reward-card ${this.money < (g.price || 0) ? 'cannot-afford' : ''}" onclick="game.claimRewardById('${g.id}')">
                                <h3>${g.name}</h3>
                                <div style="font-size: 0.8rem; color: #aaa;">${g.type === 'active' ? '【錦囊】' : (g.type === 'passive' ? '【寶物】' : g.rarity + ' | ' + g.faction + '軍')}</div>
                                <p style="margin: 10px 0; font-size: 0.9rem; color: var(--gold);">${g.type ? g.description : g.flavour}</p>
                                <div class="price-tag">$${g.price}</div>
                            </div>
                        `).join('')}
                        <div class="reward-card ${this.money < this.slotUpgradePrice ? 'cannot-afford' : ''}" onclick="game.buySlot()">
                            <h3>擴展武將位</h3>
                            <p style="font-size: 0.8rem; color: #aaa;">永久增加 1 個槽位</p>
                            <p style="margin: 10px 0; font-size: 0.9rem; color: var(--gold);">目前上限: ${this.maxSlots}</p>
                            <div class="price-tag">$${this.slotUpgradePrice}</div>
                        </div>
                    </div>
                    <button onclick="game.skipReward()" style="margin-top: 30px; background: #444;">下個關卡 (跳過招募)</button>
                </div>
            </div>
        `;
    }

    renderGameOverHTML() {
        return `
            <div class="overlay">
                <div class="modal">
                    <h2 class="lose" style="font-size: 3rem; margin-bottom: 30px;">敗走麥城...</h2>
                    <div style="display: flex; gap: 20px; justify-content: center;">
                        <button onclick="game.startNewGame(); game.startBattle(1)">再試一次</button>
                        <button onclick="game.startNewGame()" style="background: #444; border-color: #666;">回到標題</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Global instance for simple HTML onclicks for the prototype
const game = new GameState();
window.game = game;
game.claimRewardById = (id) => game.claimReward(dataManager.getGeneralById(id) || dataManager.getSchemeById(id) || dataManager.getRelicById(id));

window.addEventListener('DOMContentLoaded', () => {
    game.init();
});
// Auto-scaling for web deployment
function handleResize() {
    const container = document.getElementById('game-container');
    if (!container) return;

    const targetWidth = 1280;
    const targetHeight = 720;
    const padding = 40;

    const scaleX = (window.innerWidth - padding) / targetWidth;
    const scaleY = (window.innerHeight - padding) / targetHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Never upscale beyond 1

    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'center center';
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);
handleResize();

export default game;
