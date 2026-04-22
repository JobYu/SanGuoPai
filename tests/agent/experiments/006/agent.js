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

  // === New mechanic bonuses ===
  const totalBustProtection = selectedGenerals.reduce((sum, g) => sum + (g.bust_protection || 0), 0);
  const hasHitLimitBonus = selectedGenerals.some(g => g.hit_limit_bonus > 0);
  const hasExtraDraw = selectedGenerals.some(g => g.extra_draw > 0);

  // === Enemy visible card value ===
  const enemyVisibleValue = enemyVisibleCard
    ? (enemyVisibleCard.rank === 'A' ? 11
      : ['J', 'Q', 'K'].includes(enemyVisibleCard.rank) ? 10
      : parseInt(enemyVisibleCard.rank))
    : 0;

  // === Base stand threshold ===
  // With partial bust rewards, optimal is ~15
  let standThreshold = 15;
  if (difficulty === '困難') standThreshold = 14;
  if (difficulty === '入門') standThreshold = 16;

  // === General-specific adjustments ===
  if (hasGeneral('guan_yu')) standThreshold += 1;       // 20/21 bonus
  if (hasGeneral('zhu_ge_liang')) standThreshold -= 2;  // no bust = 2.2x
  if (hasGeneral('zhang_liao') && hitsThisRound === 0) standThreshold -= 2; // 0 hit bonus
  if (hasGeneral('zhou_yu')) standThreshold += 2;       // >=2 hits bonus
  if (hasGeneral('huang_yue_ying')) standThreshold += 1; // 21 bonus
  if (hasGeneral('zhao_yun')) standThreshold += 1;      // 21 bonus
  if (hasGeneral('huang_zhong')) standThreshold += 1;   // >=18 bonus
  if (hasGeneral('pang_de')) standThreshold += 1;       // >=17 bonus

  // New mechanic adjustments
  if (totalBustProtection > 0) standThreshold += 1;     // safer to push with protection
  if (hasHitLimitBonus) standThreshold += 1;            // more hits = can push further
  if (hasExtraDraw) standThreshold -= 1;                // stronger initial hand = can be conservative

  // Enemy-visible-card adjustment
  if (enemyVisibleValue >= 10) standThreshold += 1;
  if (enemyVisibleValue >= 2 && enemyVisibleValue <= 6) standThreshold -= 1;

  // Pressure: low progress + few rounds → push harder
  if (progressRatio < 0.3 && roundsRemaining <= 2) standThreshold += 2;

  standThreshold = Math.max(12, Math.min(21, standThreshold));

  // === 1. Split: maximize EV ===
  if (canSplit && handsRemaining >= 2) {
    const rank = playerCards[0]?.rank;
    if (rank === 'A' || rank === '8') return { action: 'SPLIT' };
    if (['2','3','4','5','6','7'].includes(rank) && enemyVisibleValue >= 2 && enemyVisibleValue <= 7) {
      return { action: 'SPLIT' };
    }
    if (rank === '9' && enemyVisibleValue >= 2 && enemyVisibleValue <= 6) {
      return { action: 'SPLIT' };
    }
  }

  // === 2. Double Down ===
  if (canDoubleDown && hitsThisRound === 0) {
    if (playerPoints === 10 || playerPoints === 11) return { action: 'DOUBLE_DOWN' };
    if (playerPoints === 9 && enemyVisibleValue >= 2 && enemyVisibleValue <= 6) {
      return { action: 'DOUBLE_DOWN' };
    }
    // Soft 16-18 vs weak dealer
    if (playerPoints >= 16 && playerPoints <= 18 && enemyVisibleValue >= 2 && enemyVisibleValue <= 6) {
      return { action: 'DOUBLE_DOWN' };
    }
  }

  // === 3. Strategic Discard: refresh weak/mediocre hands ===
  if (canDiscard && playerPoints < 10 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }
  if (canDiscard && playerPoints < 13 && enemyVisibleValue >= 10 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }
  if (canDiscard && playerPoints < 15 && progressRatio < 0.4 && roundsRemaining <= 2 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }

  // === 4. Hit/Stand ===
  if (canHit && playerPoints < standThreshold) {
    return { action: 'HIT' };
  }

  return { action: 'STAND' };
}
