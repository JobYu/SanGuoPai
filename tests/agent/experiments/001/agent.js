/**
 * SanGuoPai Auto-Play Agent — MUTABLE GENOME
 *
 * This is the ONLY file the agent is allowed to edit.
 * Implement the decide() function to return an action based on game state.
 *
 * RULES:
 * - Keep decide() under 150 lines (excluding comments)
 * - Do not use Math.random() — strategy must be deterministic
 * - Do not peek at hidden information (e.g., enemy hidden card)
 */

/**
 * Decide the next action given the current game state.
 *
 * @param {Object} state — Full game state (see program.md for schema)
 * @returns {Object} { action: string, schemeIndex?: number }
 */
export function decide(state) {
  const {
    playerPoints,
    playerCards,
    hitsThisRound,
    hitLimit,
    handsRemaining,
    discardsRemaining,
    selectedCardIndices,
    enemyVisibleCard,
    enemyPoints,
    enemyTendency,
    enemyStandThreshold,
    battleMoney,
    moneyTarget,
    currentRound,
    maxRounds,
    money,
    difficulty,
    selectedGenerals,
    schemes,
    relics,
    maxSlots,
    canHit,
    canStand,
    canDoubleDown,
    canSplit,
    canDiscard,
    roundsRemaining,
    progressRatio,
  } = state;

  // === Helper: check if we have a specific general equipped ===
  const hasGeneral = (id) => selectedGenerals.some(g => g.id === id);

  // === Helper: count cards of each suit ===
  const suitCounts = {};
  playerCards.forEach(c => { suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1; });
  const maxSuitCount = Math.max(0, ...Object.values(suitCounts));

  // === Base stand threshold (adjust by difficulty) ===
  let standThreshold = 17;
  if (difficulty === '困難') standThreshold = 16;
  if (difficulty === '入門') standThreshold = 18;

  // === General-specific adjustments ===
  // 關羽 (Guan Yu): skill at 20/21 → slightly more aggressive
  if (hasGeneral('guan_yu')) standThreshold -= 1;
  // 諸葛亮 (Zhuge Liang): 2.2x if no bust → be conservative
  if (hasGeneral('zhu_ge_liang')) standThreshold += 1;
  // 張遼 (Zhang Liao): bonus for 0 hits → stand early
  if (hasGeneral('zhang_liao') && hitsThisRound === 0) standThreshold -= 2;
  // 周瑜 (Zhou Yu): bonus for >=2 hits → hit more
  if (hasGeneral('zhou_yu')) standThreshold -= 2;
  // 孫尚香 (Sun Shangxiang): bonus for 2+ same suit → slightly lower threshold if close
  if (hasGeneral('sun_shang_xiang') && maxSuitCount >= 2) standThreshold -= 1;
  // 太史慈 (Tai Shi Ci): bonus for 3+ same suit
  if (hasGeneral('tai_shi_ci') && maxSuitCount >= 2) standThreshold -= 1;
  // 黃月英 (Huang Yueying): bonus at 21
  if (hasGeneral('huang_yue_ying')) standThreshold -= 1;
  // 趙雲 (Zhao Yun): bonus at 21
  if (hasGeneral('zhao_yun')) standThreshold -= 1;

  // === Enemy-visible-card adjustment ===
  const enemyVisibleValue = enemyVisibleCard ?
    (enemyVisibleCard.rank === 'A' ? 11 :
      ['J','Q','K'].includes(enemyVisibleCard.rank) ? 10 :
      parseInt(enemyVisibleCard.rank)) : 0;

  // If enemy shows strong card (10 or A), be slightly more aggressive
  if (enemyVisibleValue >= 10) standThreshold -= 1;
  // If enemy shows weak card (2-6), dealer is likely to bust, stand earlier
  if (enemyVisibleValue >= 2 && enemyVisibleValue <= 6) standThreshold += 1;

  // === Pressure-based adjustment ===
  // Low progress + few rounds remaining = need to be aggressive
  const pressure = progressRatio < 0.3 && roundsRemaining <= 2;
  if (pressure) standThreshold -= 2;

  // === Decision logic ===

  // 1. Consider split if pair and early
  if (canSplit && handsRemaining >= 2) {
    // Split Aces and 8s (classic blackjack strategy)
    const rank = playerCards[0]?.rank;
    if (rank === 'A' || rank === '8') {
      return { action: 'SPLIT' };
    }
  }

  // 2. Consider double down on strong initial hands (10-11)
  if (canDoubleDown && hitsThisRound === 0) {
    if (playerPoints === 10 || playerPoints === 11) {
      return { action: 'DOUBLE_DOWN' };
    }
    // Double 9 vs weak dealer card
    if (playerPoints === 9 && enemyVisibleValue >= 2 && enemyVisibleValue <= 6) {
      return { action: 'DOUBLE_DOWN' };
    }
  }

  // 3. Consider discard on very weak starting hand
  if (canDiscard && playerPoints < 12 && discardsRemaining > 0) {
    // Select all cards for discard (simplified)
    return { action: 'DISCARD' };
  }

  // 4. Main hit/stand decision
  if (canHit && playerPoints < standThreshold) {
    return { action: 'HIT' };
  }

  // 5. Stand when ready (harness handles multi-hand switching)
  return { action: 'STAND' };
}
