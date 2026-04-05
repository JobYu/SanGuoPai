// Game UI and State Management
import dataManager from './data_manager.js';
import { Deck, Hand, SUITS, RANKS } from './engine/blackjack.js';
import { splitHand } from './engine/blackjack.js';
import AIEngine from './engine/ai.js';
import CombatEngine from './engine/combat.js';
import { applyDocumentLocalization, createTranslator, getInitialLocale, saveLocalePreference, translateDataLabel } from './i18n.js';

class GameState {
    constructor() {
        this.currentScreen = 'LOADING';
        this.hands = 3;
        this.discards = 3;
        this.selectedGenerals = [];
        this.currentEnemy = null;
        this.battleMoney = 0;  // Money earned in current battle
        this.currentRound = 0;  // Current round number
        this.maxRounds = 3;  // Max rounds for this battle
        this.moneyTarget = 0;  // Target money to win

        this.deck = new Deck();
        this.playerHands = [new Hand()];  // Support multiple hands after split
        this.currentHandIndex = 0;  // Which hand is currently being played
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

        // Skill tracking flags
        this.guanPingActive = false;   // 關平：本回合要牌抽到 A
        this.ganNingActive = false;    // 甘寧：本回合第一次要牌
        this.zhugeLiangActive = false; // 諸葛亮：觀星標記
        this.firstHitDone = false;     // 追蹤是否已經要過牌
        this.maxSlots = 5;
        this.slotUpgradePrice = 500;
        this.leaderboard = this.getLeaderboard();
        this.defeatedEnemies = [];
        this.schemes = []; // Player's current schemes
        this.maxSchemes = 3;
        this.relics = []; // Passive items
        this.difficulty = '標準'; // 預設難度：入門、標準、困難
        this.difficulties = ['入門', '標準', '困難'];
        this.locale = getInitialLocale();
        this.t = createTranslator(this.locale);
        this.showInitialHint = true; // 頁面加載時顯示提示
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

    // Render card with corner ranks (poker style) for split hands
    renderCornerCard(card, cardIndex, handIndex) {
        const isSelected = this.selectedForDiscard.has(cardIndex) && handIndex === this.currentHandIndex;
        const isRed = card.suit === '♥' || card.suit === '♦';
        const color = isRed ? '#d00' : '#111';

        return `
            <div class="playing-card corner-style ${isSelected ? 'selected' : ''}" style="color: ${color};">
                <div class="card-corner-top">
                    <span>${card.rank}</span>
                    <span>${card.suit}</span>
                </div>
                <div class="card-corner-bottom">
                    <span>${card.rank}</span>
                    <span>${card.suit}</span>
                </div>
            </div>
        `;
    }

    translate(key, vars = {}) {
        return this.t(key, vars);
    }

    translateData(category, value) {
        return translateDataLabel(this.locale, category, value);
    }

    setLocale(locale) {
        this.locale = locale;
        this.t = createTranslator(locale);
        saveLocalePreference(globalThis.localStorage, locale);
        applyDocumentLocalization(locale);
        this.render();
    }

    showSettings() {
        this.previousScreen = this.currentScreen;
        this.currentScreen = 'SETTINGS';
        this.render();
    }

    closeSettings() {
        this.currentScreen = this.previousScreen || 'START';
        this.previousScreen = null;
        this.render();
    }

    renderSettingsHTML() {
        return `
            <div class="settings-screen">
                <div class="settings-header">
                    <h2>${this.translate('ui.settings')}</h2>
                </div>

                <div class="settings-section">
                    <h3>${this.translate('difficulty.title')}</h3>
                    <div class="difficulty-buttons">
                        <button class="difficulty-btn ${this.difficulty === '入門' ? 'active' : ''}"
                                onclick="game.setDifficulty('入門')">${this.translate('difficulty.easy')}</button>
                        <button class="difficulty-btn ${this.difficulty === '標準' ? 'active' : ''}"
                                onclick="game.setDifficulty('標準')">${this.translate('difficulty.normal')}</button>
                        <button class="difficulty-btn ${this.difficulty === '困難' ? 'active' : ''}"
                                onclick="game.setDifficulty('困難')">${this.translate('difficulty.hard')}</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h3>${this.translate('ui.language')}</h3>
                    <div class="language-buttons">
                        <button class="language-btn ${this.locale === 'zh-TW' ? 'active' : ''}"
                                onclick="game.setLocale('zh-TW')">${this.translate('ui.languageOptionZhTW')}</button>
                        <button class="language-btn ${this.locale === 'zh-CN' ? 'active' : ''}"
                                onclick="game.setLocale('zh-CN')">${this.translate('ui.languageOptionZhCN')}</button>
                        <button class="language-btn ${this.locale === 'en' ? 'selected' : ''}"
                                onclick="game.setLocale('en')">${this.translate('ui.languageOptionEn')}</button>
                    </div>
                </div>

                <div class="settings-close-section">
                    <button class="close-settings-button" onclick="game.closeSettings()">${this.translate('ui.close')}</button>
                </div>
            </div>
        `;
    }

    setDifficulty(difficulty) {
        if (this.difficulties.includes(difficulty)) {
            this.difficulty = difficulty;
            this.render();
        }
    }


    getDifficultyMultiplier() {
        const multipliers = { '入門': 0.8, '標準': 1.0, '困難': 1.3 };
        return multipliers[this.difficulty];
    }

    getAIThresholdModifier() {
        const modifiers = { '入門': 1, '標準': 0, '困難': -1 };
        return modifiers[this.difficulty];
    }

    getFactionLabel(faction) {
        const translated = this.translateData('factions', faction);
        return this.locale === 'en' ? translated : `${translated}軍`;
    }

    getRarityLabel(rarity) {
        return this.translateData('rarities', rarity);
    }

    getEnemyTendencyLabel(tendency) {
        return this.translateData('enemyTendencies', tendency);
    }

    getSkillTriggerLabel(trigger) {
        return this.translateData('skillTriggers', trigger);
    }

    getSkillConditionLabel(condition) {
        if (!condition) return this.translate('ui.noCondition');
        return this.translateData('conditions', condition);
    }

    getEffectTypeLabel(type) {
        return this.translateData('effectTypes', type);
    }

    formatRewardCategory(item) {
        if (item.type === 'active') return this.translate('ui.schemeTag');
        if (item.type === 'passive') return this.translate('ui.relicTag');
        return `${this.getRarityLabel(item.rarity)} | ${this.getFactionLabel(item.faction)}`;
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
            applyDocumentLocalization(this.locale);
            await dataManager.loadAllData();
            this.startNewGame();
        } catch (e) {
            console.error(e);
            const mount = document.getElementById('screen-mount');
            if (mount) mount.innerHTML = `<div style="color:red">${this.translate('alert.loadFailed', { message: e.message })}</div>`;
        }
    }

    startNewGame() {
        this.showInitialHint = false; // 遊戲開始後不再顯示初始提示
        this.hands = 3;
        this.discards = 3;
        this.money = this.difficulty === '入門' ? 200 : (this.difficulty === '標準' ? 100 : 50);
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
        this.guanPingActive = false;
        this.ganNingActive = false;
        this.zhugeLiangActive = false;
        this.firstHitDone = false;
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
        this.logs.push(this.translate('log.soldGeneral', { name: gen.name, amount: sellPrice }));
        this.render();
    }

    buySlot() {
        if (this.money < this.slotUpgradePrice) {
            alert(this.translate('alert.insufficientMoney', { amount: this.slotUpgradePrice }));
            return;
        }

        this.money -= this.slotUpgradePrice;
        this.maxSlots++;
        this.slotUpgradePrice = Math.floor(this.slotUpgradePrice * 1.5); // Price increases
        this.logs.push(this.translate('log.boughtSlot', { slots: this.maxSlots }));
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
        const difficultyMultiplier = this.getDifficultyMultiplier();
        // New: money target and rounds instead of morale
        this.moneyTarget = Math.floor(this.currentEnemy.money_target * difficultyMultiplier);
        this.maxRounds = this.currentEnemy.max_rounds;
        this.battleMoney = 0;
        this.currentRound = 0;
        // Reset hands and discards for each battle
        this.hands = 3;
        const fCounts = this.getFactionCounts();
        const weiBonus = fCounts['魏'] >= 3 ? 1 : 0;
        const redHareBonus = this.relics.find(r => r.id === 'red_hare') ? 1 : 0;
        const bonusDiscards = this.selectedGenerals.reduce((sum, g) => sum + (g.bonus_discards || 0), 0);
        this.discards = 3 + bonusDiscards + weiBonus + redHareBonus;
        this.setScreen('BATTLE');
        this.newRound();
        if (weiBonus) this.logs.push(this.translate('log.weiBond'));
        if (redHareBonus) this.logs.push(this.translate('log.redHare'));
    }

    newRound() {
        this.currentScreen = 'BATTLE';
        this.currentRound++;
        this.deck.reset();
        this.deck.shuffle();
        this.playerHands = [new Hand()];
        this.currentHandIndex = 0;
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

        // Reset skill tracking flags
        this.guanPingActive = false;
        this.ganNingActive = false;
        this.zhugeLiangActive = false;
        this.firstHitDone = false;

        // Trigger "回合開始時" skills
        this.selectedGenerals.forEach(g => {
            if (g.skill_trigger === '回合開始時') {
                if (g.id === 'zhu_ge_liang') {
                    this.zhugeLiangActive = true;
                    this.logs.push(this.translate('log.zhugeLiang'));
                }
            }
        });

        // Initial deal
        this.playerHands[0].addCard(this.deck.draw());
        this.playerHands[0].addCard(this.deck.draw());
        this.enemyHand.addCard(this.deck.draw()); // Visible
        this.enemyHand.addCard(this.deck.draw()); // Hidden

        this.turn = 'PLAYER';
        this.logs = [this.translate('log.battleStart')];
        this.render();
    }

    playerHit() {
        if (this.turn !== 'PLAYER' || this.hitsThisRound >= this.hitLimit) return;

        const card = this.deck.draw();
        this.currentHand().addCard(card);
        this.hitsThisRound++;
        if (card.rank === 'A') this.drewAceThisRound = true;

        // Trigger "要牌時" skills
        this.selectedGenerals.forEach(g => {
            if (g.skill_trigger === '要牌時') {
                if (g.id === 'guan_ping') {
                    if (card.rank === 'A') {
                        this.guanPingActive = true;
                        this.logs.push(this.translate('log.guanPing'));
                    }
                } else if (g.id === 'gan_ning') {
                    if (!this.firstHitDone) {
                        this.ganNingActive = true;
                        this.logs.push(this.translate('log.ganNing'));
                    }
                }
            }
        });
        this.firstHitDone = true;

        this.logs.push(this.translate('log.drewCard', { card: card.toString(), current: this.hitsThisRound, limit: this.hitLimit }));
        this.render();
    }

    playerPlayHand() {
        if (this.turn !== 'PLAYER' || this.hands <= 0) return;

        // Check if all hands are ready (stood or bust)
        const allHandsReady = this.playerHands.every(h => h.isStand || h.isBust());
        if (!allHandsReady) {
            this.logs.push('請先完成所有手牌的操作（停牌或爆牌）');
            return;
        }

        this.hands--; // Consume hand count

        // Play all hands against enemy
        this.turn = 'ENEMY';
        this.resolveEnemyTurn();
    }

    // Get current active hand
    currentHand() {
        return this.playerHands[this.currentHandIndex];
    }

    // Switch to a specific hand (for split hands)
    switchToHand(index) {
        if (index >= 0 && index < this.playerHands.length && this.turn === 'PLAYER') {
            // Auto-stand current hand before switching
            if (!this.currentHand().isStand && !this.currentHand().isBust()) {
                this.currentHand().stand();
            }
            this.currentHandIndex = index;
            this.selectedForDiscard.clear();
            this.logs.push(`切換到第 ${index + 1} 手牌`);
            this.render();
        }
    }

    // Stand: end turn for current hand
    playerStand() {
        if (this.turn !== 'PLAYER') return;

        this.currentHand().stand();

        // Check if there are more hands to play (after split)
        if (this.currentHandIndex < this.playerHands.length - 1) {
            this.currentHandIndex++;
            this.logs.push(this.translate('log.nextHand', { index: this.currentHandIndex + 1 }));
            this.render();
        } else {
            // All hands played, move to enemy turn
            this.turn = 'ENEMY';
            this.resolveEnemyTurn();
        }
    }

    // Double Down: double bet and draw exactly one card
    playerDoubleDown() {
        if (this.turn !== 'PLAYER') return;

        const hand = this.currentHand();
        if (!hand.canDoubleDown()) {
            this.logs.push(this.translate('log.cannotDoubleDown'));
            return;
        }

        const card = this.deck.draw();
        hand.doubleDown(card);
        this.logs.push(this.translate('log.doubleDown', { card: card.toString() }));

        // After double down, automatically stand
        this.playerStand();
    }

    // Split: split pair into two hands
    playerSplit() {
        if (this.turn !== 'PLAYER') return;

        const hand = this.currentHand();
        if (!hand.canSplit()) {
            this.logs.push(this.translate('log.cannotSplit'));
            return;
        }

        const newHands = splitHand(hand, this.deck);
        if (newHands) {
            this.playerHands = [
                ...this.playerHands.slice(0, this.currentHandIndex),
                ...newHands,
                ...this.playerHands.slice(this.currentHandIndex + 1)
            ];
            this.logs.push(this.translate('log.splitSuccess'));
            this.render();
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
            this.currentHand().cards.splice(idx, 1);
        });

        this.discards--;
        this.selectedForDiscard.clear();
        this.logs.push(this.translate('log.discardDone', { discards: this.discards }));
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
                this.logs.push(this.translate('log.borrowEastWind', { card: peek.toString() }));
            }
        } else if (schemeId === 'empty_city') {
            this.enemyForceStand = true;
            this.logs.push(this.translate('log.emptyCityCast'));
        }

        this.render();
    }

    async resolveEnemyTurn() {
        this.logs.push(this.translate('log.enemyTurn'));
        this.render();

        if (this.enemyForceStand) {
            this.logs.push(this.translate('log.emptyCityEnemy'));
            await new Promise(r => setTimeout(r, 1000));
        } else {
            // Simple delay for "thinking"
            const difficultyModifier = this.getAIThresholdModifier();
            while (AIEngine.shouldHit(this.currentEnemy, this.enemyHand, this.playerHand, difficultyModifier)) {
                await new Promise(r => setTimeout(r, 800));
                const card = this.deck.draw();
                this.enemyHand.addCard(card);
                this.logs.push(this.translate('log.enemyHit'));
                this.render();
                if (this.enemyHand.isBust()) {
                    this.logs.push(this.translate('log.enemyBust'));
                    break;
                }
            }
        }

        this.resolveTurn();
    }

    resolveTurn() {
        this.turn = 'PLAYER';
        const pPoints = this.currentHand().getPoints();
        const ePoints = this.enemyHand.getPoints();

        const breakdown = {
            base: 0,
            skills: [],
            total: 0,
            isBlackjack: this.currentHand().isBlackjack(),
            result: 'DRAW'
        };

        const additive = [];
        const multipliers = [];

        // Apply tracked skill effects from "要牌時" and "回合開始時" triggers
        if (this.guanPingActive && this.selectedGenerals.some(g => g.id === 'guan_ping')) {
            additive.push({ name: '關平(隨父從征)', value: 75, type: '加法' });
        }
        if (this.ganNingActive && this.selectedGenerals.some(g => g.id === 'gan_ning')) {
            additive.push({ name: '甘寧(奇襲)', value: 90, type: '加法' });
        }
        if (this.zhugeLiangActive && !this.currentHand().isBust() && this.selectedGenerals.some(g => g.id === 'zhu_ge_liang')) {
            multipliers.push({ name: '諸葛亮(觀星)', value: 2.2, type: '乘法' });
        }

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
                        if (this.currentHand().cards.length === 2) shouldApply = true;
                    } else if (cond === '玩家手牌數 ≥ 4 張') {
                        if (this.currentHand().cards.length >= 4) shouldApply = true;
                    } else if (cond === '本回合要牌得到 A 則結算時額外加上') {
                        if (this.drewAceThisRound) shouldApply = true;
                    } else if (cond === '手牌中至少 2 張同花色') {
                        const suits = this.currentHand().cards.map(c => c.suit);
                        const counts = {};
                        suits.forEach(s => counts[s] = (counts[s] || 0) + 1);
                        if (Object.values(counts).some(c => c >= 2)) shouldApply = true;
                    } else if (cond === '手牌中有 3 張以上同花色') {
                        const suits = this.currentHand().cards.map(c => c.suit);
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
            const suits = this.currentHand().cards.map(c => c.suit);
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

        const moneyResult = CombatEngine.calculateMoney(
            pPoints, ePoints, breakdown.isBlackjack,
            this.currentHand().betMultiplier,
            additive.map(a => a.value),
            multipliers.map(m => m.value)
        );

        breakdown.pPoints = pPoints;
        breakdown.ePoints = ePoints;
        breakdown.eEffective = ePoints > 21 ? 0 : ePoints;

        if (pPoints > 21) {
            breakdown.result = 'BUST';
            this.bustThisRound = true;
            // Bust: lose current bet (no money gained)
            if (this.selectedGenerals.some(g => g.id === 'xia_hou_dun')) {
                this.xiahouDunBuffPending = true;
                this.logs.push(this.translate('log.xiahouDun'));
            }

            // 蜀軍羈絆：反擊（爆牌也算輸）
            const shuCount = fCounts['蜀'] || 0;
            if (shuCount >= 3) {
                const counterDamage = 30 + (shuCount - 3) * 10;
                this.enemyMorale -= counterDamage;
                this.logs.push(this.translate('log.shuCounter', { damage: counterDamage }));
            }
        } else if (ePoints > 21 || pPoints > ePoints || pPoints === 21) {
            breakdown.result = moneyResult.result;
            breakdown.money = moneyResult.money;
            breakdown.base = moneyResult.baseMoney || moneyResult.money;
            breakdown.skills = [...additive.map(a => ({ name: a.name, type: a.type, value: a.value })),
                                ...multipliers.map(m => ({ name: m.name, type: m.type, value: m.value }))];
            breakdown.total = moneyResult.money;
            this.battleMoney += moneyResult.money;
            this.money += moneyResult.money;

            if (moneyResult.money > 0) {
                this.logs.push(this.translate('log.moneyAwarded', { amount: moneyResult.money }));
            }
        } else if (pPoints < ePoints) {
            breakdown.result = 'LOSE';
            // Lose: no money gained
        }

        // 天時難度：敵將有 25% 機率在結算時獲得額外 1.2x 倍率（僅敵將勝利時）
        if (this.difficulty === '困難' && (breakdown.result === 'BUST' || breakdown.result === 'LOSE') && Math.random() < 0.25) {
            const enemyExtraDamage = Math.floor(20 * 1.2);
            this.money = Math.max(0, this.money - enemyExtraDamage);
            this.logs.push(this.translate('log.tianshiEnemyBuff', { damage: enemyExtraDamage }));
        }

        this.showSettlement(breakdown);
    }

    showSettlement(breakdown) {
        this.currentScreen = 'SETTLEMENT';
        this.settlementData = breakdown;
        this.render();
    }

    showRewardScreen() {
        // Check if player achieved the money goal within max rounds
        const goalCheck = CombatEngine.checkStageGoal(
            this.battleMoney, this.moneyTarget, this.currentRound, this.maxRounds
        );
        if (!goalCheck.achieved) return; // Must achieve goal to get rewards

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
                opt.description = this.translate('log.shuDiscount', { description: opt.description });
            }
        });

        this.render();
    }

    claimReward(item) {
        if (this.money < item.price) {
            alert(this.translate('alert.insufficientMoney', { amount: item.price }));
            return;
        }

        if (item.type === 'active' || item.type === 'passive') { // Scheme or Relic
            if (item.type === 'active' && this.schemes.length >= this.maxSchemes) {
                alert(this.translate('alert.schemesFull'));
                return;
            }
            this.money -= item.price;
            if (item.type === 'active') {
                this.schemes.push(item);
                this.logs.push(this.translate('log.gotScheme', { name: item.name }));
            } else {
                this.relics.push(item);
                this.logs.push(this.translate('log.gotRelic', { name: item.name }));
            }
        } else {
            if (this.selectedGenerals.length >= this.maxSlots) {
                alert(this.translate('alert.slotsFull'));
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
            this.logs.push(this.translate('log.gameCleared'));
            this.saveScore(this.money);
            alert(this.translate('alert.gameClear', { money: this.money }));
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
                                <button class="sell-btn" style="z-index: 3;" onclick="game.sellGeneral(${i}); event.stopPropagation();">${this.translate('ui.sellShort')}</button>
                                <div class="tooltip">
                                    <strong>${g.name} [${this.getRarityLabel(g.rarity)}]</strong>
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
                                     <strong style="color: #ff4d4d;">${this.currentEnemy.name} [${this.translate('ui.enemyLabel')}]</strong>
                                     ${this.currentEnemy.flavour}
                                     <div style="margin-top: 5px; color: #aaa; font-size: 0.8rem;">${this.translate('ui.clickForDetails')}</div>
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
                            <div style="font-size: 0.8rem; color: #888; margin-bottom: 5px;">
                            ${this.translate('ui.stageBattle', { stage: this.currentEnemy.stage_index })} |
                            ${this.translate('ui.roundInfo', { current: this.currentRound, max: this.maxRounds })}
                        </div>
                            <h3 style="font-size: 1rem; color: var(--gold-bright);">${this.translate('ui.target', { name: this.currentEnemy.name })}</h3>
                            <progress value="${this.moneyTarget - Math.max(0, this.enemyMorale)}" max="${this.moneyTarget}" class="side-progress"></progress>
                            <div class="score-display" style="font-size: 0.9rem; margin-top: 5px; color: var(--gold-bright);">${Math.max(0, this.moneyTarget - Math.max(0, this.enemyMorale))} / ${this.moneyTarget}</div>
                        </div>
                        ` : ''}
                        <div class="stat-box">
                            <h3>${this.translate('ui.money')}</h3>
                            <div class="stat-val" style="color: var(--gold)">$${this.money}</div>
                        </div>
                        ${this.relics && this.relics.length > 0 ? `
                        <div class="stat-box" style="margin-top: 15px;">
                            <h3>${this.translate('ui.relicsOwned')}</h3>
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
        if (this.currentScreen === 'SETTINGS') return this.renderSettingsHTML();
        if (this.currentScreen === 'BATTLE' || this.currentScreen === 'SETTLEMENT') return this.renderBattleHTML();
        return '';
    }

    renderTitleHTML() {
        return `
            <div class="title-screen">
                <div class="title-hero-art" data-hero="diao_chan_sexy_pixel_3.png" aria-hidden="true"></div>
                <div class="title-backdrop-glow" aria-hidden="true"></div>
                <div class="title-copy">
                    <div class="title-kicker">Roguelike Card Duel</div>
                    <img src="./assets/UI/Title_SC.png" alt="三國派" class="title-logo pixel-art" style="image-rendering: pixelated; image-rendering: crisp-edges; max-width: 300px; width: 80%; height: auto; margin: 20px auto; display: block; filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));">
                    <p class="title-subtitle">
                        ${this.translate('ui.subtitle')}
                    </p>
                    <div class="title-actions">
                        <button class="title-start-button" onclick="game.startNewGame(); game.startBattle(1)">
                            ${this.translate('ui.startGame')}
                        </button>
                        <button class="title-start-button" onclick="game.showSettings()" style="background: transparent; border: 2px solid var(--gold); color: var(--gold);">
                            ${this.translate('ui.settings')}
                        </button>
                    </div>
                    ${this.showInitialHint ? `
                    <div class="title-hint" id="initial-hint">
                        ${this.translate('ui.titleHint')}
                    </div>
                    <script>
                        setTimeout(() => {
                            const hint = document.getElementById('initial-hint');
                            if (hint) hint.style.opacity = '0';
                        }, 5000);
                    </script>
                    ` : ''}
                </div>

                ${this.leaderboard.length > 0 ? `
                    <div class="leaderboard-area title-leaderboard">
                        <h2 style="color: var(--gold); border-bottom: 2px solid var(--gold); padding-bottom: 5px;">${this.translate('ui.leaderboard')}</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.9rem;">
                            <thead>
                                <tr style="color: #888; text-align: left;">
                                    <th style="padding: 5px;">${this.translate('ui.date')}</th>
                                    <th style="padding: 5px;">${this.translate('ui.score')}</th>
                                    <th style="padding: 5px;">${this.translate('ui.lineup')}</th>
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

                ${this.playerHands.length > 1 ? `
                <div class="split-hands-container">
                    ${this.playerHands.map((hand, idx) => `
                        <div class="hand-row player-hand ${idx === this.currentHandIndex ? 'active-hand' : 'inactive-hand'}"
                             onclick="game.switchToHand(${idx})">
                            ${hand.cards.map((c, i) => this.renderCornerCard(c, i, idx)).join('')}
                            <div class="hand-points">${hand.getPoints()} ${hand.isStand ? '(停牌)' : ''}</div>
                        </div>
                    `).join('')}
                </div>
                ` : `
                <div class="hand-row player-hand">
                    ${this.currentHand().cards.map((c, i) => `
                        <div class="playing-card ${this.selectedForDiscard.has(i) ? 'selected' : ''}"
                             onclick="game.toggleCardSelection(${i})">
                            ${c.toString()}
                        </div>
                    `).join('')}
                </div>
                `}

                <div class="action-row">
                    <div class="point-bubble" style="${this.currentHand().isBust() ? 'color: #ff4d4d; border: 2px solid #ff4d4d;' : ''}">
                        ${this.translate('ui.pointsUnit', { value: this.currentHand().getPoints() })}
                    </div>
                    <div class="action-buttons">
                        <button onclick="game.playerHit()" ${this.turn !== 'PLAYER' || this.hitsThisRound >= this.hitLimit || this.currentHand().isStand ? 'disabled' : ''}>
                            ${this.translate('ui.hit', { current: this.hitsThisRound, limit: this.hitLimit })}
                        </button>
                        <button onclick="game.playerDoubleDown()" ${this.turn !== 'PLAYER' || !this.currentHand().canDoubleDown() ? 'disabled' : ''}>
                            ${this.translate('ui.doubleDown')}
                        </button>
                        <button onclick="game.playerSplit()" ${this.turn !== 'PLAYER' || !this.currentHand().canSplit() ? 'disabled' : ''}>
                            ${this.translate('ui.split')}
                        </button>
                    </div>
                    <button onclick="game.playerPlayHand()" ${this.turn !== 'PLAYER' ? 'disabled' : ''} style="background: var(--gold); color: #000;">
                        ${this.translate('ui.playHand', { hands: this.hands })}
                    </button>
                    <button onclick="game.playerDiscard()" 
                            ${this.turn !== 'PLAYER' || this.discards <= 0 || this.selectedForDiscard.size === 0 ? 'disabled' : ''}
                             style="background: #4da6ff">
                        ${this.translate('ui.discard', { discards: this.discards })}
                    </button>
                    ${this.schemes.length > 0 ? `
                        <div class="schemes-tray" style="display:flex; gap: 5px; margin-left:10px;">
                            ${this.schemes.map((s, idx) => `
                                <button onclick="game.useScheme(${idx})" style="background:var(--accent-red); padding:5px 10px; font-size:0.8rem; border-radius:4px;">
                                    ${this.translate('ui.schemeButton', { name: s.name })}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div onclick="game.toggleDeckView()" style="cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 5px 15px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; margin-left: 10px;">
                        <span style="font-size: 0.8rem; color: #888;">${this.translate('ui.deck')}</span>
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
                            <div style="color: var(--gold); font-size: 0.9rem; margin-bottom: 15px;">${this.getRarityLabel(general.rarity)} | ${this.getFactionLabel(general.faction)}</div>
                            
                            <div style="margin-bottom: 20px; line-height: 1.6; font-style: italic; color: #aaa; border-left: 3px solid var(--gold); padding-left: 15px;">
                                "${general.flavour}"
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                                <div style="margin-bottom: 10px; font-weight: bold; color: var(--gold-bright);">${this.translate('ui.skill', { name: general.skill_name })}</div>
                                <div style="color: #eee; font-size: 0.9rem;">${this.translate('ui.trigger', { value: this.getSkillTriggerLabel(general.skill_trigger) })}</div>
                                <div style="color: #ccc; font-size: 0.85rem; margin-top: 5px;">
                                    ${general.skill_effects.map(e => `● ${this.getSkillConditionLabel(e.condition)}: ${this.getEffectTypeLabel(e.type)} ${e.value}`).join('<br>')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onclick="game.closeGeneralDetail()" style="margin-top: 30px; width: 100%;">${this.translate('ui.backToBattle')}</button>
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
                            <div style="color: #ff4d4d; font-size: 0.9rem; margin-bottom: 15px;">${this.translate('ui.enemyCommander')}</div>
                            
                            <div style="margin-bottom: 20px; line-height: 1.6; font-style: italic; color: #aaa; border-left: 3px solid #444; padding-left: 15px;">
                                "${enemy.flavour}"
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <span style="color: #888;">${this.translate('ui.aiTendency')}</span>
                                    <span style="color: #eee;">${this.getEnemyTendencyLabel(enemy.ai_tendency)}</span>
                                </div>
                                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                                    <span style="color: #888;">${this.translate('ui.standThreshold')}</span>
                                    <span style="color: #eee;">${this.translate('ui.pointsUnit', { value: enemy.ai_stand_threshold })}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: #888;">${this.translate('ui.initialMorale')}</span>
                                    <span style="color: #eee;">${enemy.morale}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onclick="game.closeEnemyDetail()" style="margin-top: 30px; width: 100%;">${this.translate('ui.backToBattle')}</button>
                </div>
            </div>
        `;
    }

    renderDeckModal() {
        const inDeck = (suit, rank) => this.deck.cards.some(c => c.suit === suit && c.rank === rank);

        return `
            <div class="overlay" onclick="game.toggleDeckView()">
                <div class="modal deck-modal" onclick="event.stopPropagation()" style="max-width: 850px; min-width: 800px;">
                    <h2 style="margin-bottom: 20px;">${this.translate('ui.remainingDeck', { current: this.deck.cards.length })}</h2>
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
                        <span>${this.translate('ui.deckLegendAvailable')}</span>
                        <span>${this.translate('ui.deckLegendPlayed')}</span>
                    </div>
                    <button onclick="game.toggleDeckView()" style="margin-top: 30px;">${this.translate('ui.closeDeck')}</button>
                </div>
            </div>
        `;
    }

    renderSettlementHTML() {
        const b = this.settlementData;

        const playerHandHTML = `
            <div class="settlement-hand">
                <span>${this.translate('ui.yourHand')}</span>
                <div class="hand-row mini">
                    ${this.currentHand().cards.map(c => `<div class="playing-card mini">${c.toString()}</div>`).join('')}
                </div>
            </div>
        `;

        const enemyHandHTML = `
            <div class="settlement-hand">
                <span>${this.translate('ui.enemyHand')}</span>
                <div class="hand-row mini">
                    ${this.enemyHand.cards.map(c => `<div class="playing-card mini">${c.toString()}</div>`).join('')}
                </div>
            </div>
        `;

        const pointsHTML = `
            <div class="calc-row" style="display: flex; gap: 30px; justify-content: center; align-items: center; margin: 15px 0; font-size: 1.2rem;">
                <div>${this.translate('ui.playerLabel')}: <strong style="color: var(--gold-bright); font-size: 1.8rem;">${b.pPoints}</strong> ${b.pPoints > 21 ? `<span style="color: #ff4d4d">${this.translate('ui.bustMark')}</span>` : ''}</div>
                <div style="font-size: 1.5rem; color: #666; font-weight: bold;">VS</div>
                <div>${this.translate('ui.enemyLabel')}: <strong style="color: #ff4d4d; font-size: 1.8rem;">${b.ePoints}</strong> ${b.ePoints > 21 ? `<span style="color: #ff4d4d">${this.translate('ui.bustMark')}</span>` : ''}</div>
            </div>
        `;

        let resultTitle = '';
        let resultBody = '';

        if (b.result === 'WIN' || b.result === 'BLACKJACK') {
            const currentMultiplier = 10 + (21 - b.pPoints);
            const calcStr = this.translate('ui.baseRewardFormula', { points: b.pPoints, multiplier: currentMultiplier });
            resultTitle = `<h2 class="win">${b.isBlackjack ? this.translate('ui.blackjackTitle') : this.translate('ui.winTitle')}</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <div class="calc-formula" style="color: var(--gold-bright); font-size: 1.1rem; border: 1px dashed rgba(212,175,55,0.3); padding: 10px; border-radius: 8px;">
                        <div style="font-size: 0.9rem; color: #888; margin-bottom: 5px;">${this.translate('ui.lowerWinBetter')}</div>
                        ${calcStr} = ${b.base + b.pPoints}
                    </div>
                    <hr>
                    <div class="skill-list">
                        ${b.skills.map(s => `<p>${this.translate('ui.rewardDamageBase', { name: s.name, symbol: s.type === '加法' ? '+' : 'x', value: s.value })}</p>`).join('')}
                    </div>
                    <hr>
                    <h3 class="total-score">${this.translate('ui.totalScore', { total: b.total })}</h3>
                </div>
                <button onclick="${this.battleMoney >= this.moneyTarget ? 'game.showRewardScreen()' : 'game.newRound()'}">
                    ${this.battleMoney >= this.moneyTarget ? this.translate('ui.claimReward') : this.translate('ui.nextRound')}
                </button>
            `;
        } else if (b.result === 'BUST') {
            resultTitle = `<h2 class="lose">${this.translate('ui.bustTitle')}</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <p>${this.translate('ui.handConsumed', { hands: this.hands })}</p>
                </div>
                <button onclick="${this.hands > 0 ? 'game.newRound()' : 'game.setScreen(\'BATTLE\')'}">
                    ${this.hands > 0 ? this.translate('ui.nextRound') : this.translate('ui.confirm')}
                </button>
            `;
        } else if (b.result === 'LOSE') {
            resultTitle = `<h2 class="lose">${this.translate('ui.loseTitle')}</h2>`;
            resultBody = `
                <div class="breakdown">
                    ${pointsHTML}
                    <p>${this.translate('ui.handConsumed', { hands: this.hands })}</p>
                </div>
                <button onclick="${this.hands > 0 ? 'game.newRound()' : 'game.setScreen(\'BATTLE\')'}">
                    ${this.hands > 0 ? this.translate('ui.nextRound') : this.translate('ui.confirm')}
                </button>
            `;
        } else {
            resultTitle = `<h2 class="draw">${this.translate('ui.drawTitle')}</h2>`;
            resultBody = `
                <div class="breakdown">${pointsHTML}</div>
                <button onclick="game.newRound()">${this.translate('ui.nextRound')}</button>
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
                    <h2>${this.translate('ui.recruitTitle', { money: this.money })}</h2>
                    
                    ${this.selectedGenerals.length > 0 ? `
                    <div style="margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; width: 100%;">
                        <h4 style="color: #aaa; margin-bottom: 10px;">${this.translate('ui.ownedGenerals')}</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                            ${this.selectedGenerals.map((g, i) => `
                                <div class="owned-general" onclick="game.sellGeneral(${i})" style="padding: 8px 15px; background: #333; border: 1px solid #555; border-radius: 5px; cursor: pointer; transition: 0.2s;">
                                    <span style="color: var(--gold);">${g.name}</span>
                                    <span style="color: #888; font-size: 0.8rem;"> ${this.translate('ui.sellFor', { amount: Math.floor((priceMap[g.rarity] || 200) * 0.5) })}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="reward-list">
                        ${this.rewardOptions.map(g => `
                            <div class="reward-card ${this.money < (g.price || 0) ? 'cannot-afford' : ''}" onclick="game.claimRewardById('${g.id}')">
                                <h3>${g.name}</h3>
                                <div style="font-size: 0.8rem; color: #aaa;">${this.formatRewardCategory(g)}</div>
                                <p style="margin: 10px 0; font-size: 0.9rem; color: var(--gold);">${g.type ? g.description : g.flavour}</p>
                                <div class="price-tag">$${g.price}</div>
                            </div>
                        `).join('')}
                        <div class="reward-card ${this.money < this.slotUpgradePrice ? 'cannot-afford' : ''}" onclick="game.buySlot()">
                            <h3>${this.translate('ui.expandSlots')}</h3>
                            <p style="font-size: 0.8rem; color: #aaa;">${this.translate('ui.expandSlotsDesc')}</p>
                            <p style="margin: 10px 0; font-size: 0.9rem; color: var(--gold);">${this.translate('ui.currentSlotCap', { slots: this.maxSlots })}</p>
                            <div class="price-tag">$${this.slotUpgradePrice}</div>
                        </div>
                    </div>
                    <button onclick="game.skipReward()" style="margin-top: 30px; background: #444;">${this.translate('ui.nextStage')}</button>
                </div>
            </div>
        `;
    }

    renderGameOverHTML() {
        return `
            <div class="overlay">
                <div class="modal">
                    <h2 class="lose" style="font-size: 3rem; margin-bottom: 30px;">${this.translate('ui.gameOver')}</h2>
                    <div style="display: flex; gap: 20px; justify-content: center;">
                        <button onclick="game.startNewGame(); game.startBattle(1)">${this.translate('ui.retry')}</button>
                        <button onclick="game.startNewGame()" style="background: #444; border-color: #666;">${this.translate('ui.backToTitle')}</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Global instance for simple HTML onclicks for the prototype
const game = new GameState();

if (typeof window !== 'undefined') {
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
}

export { GameState };
export default game;
