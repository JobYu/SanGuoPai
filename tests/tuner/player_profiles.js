/**
 * SanGuoPai Player Profiles — Simulated Skill Levels
 *
 * Each profile exports a decide(state) function representing a different
 * player skill level. Used by the tuner to measure how parameter changes
 * affect players of varying ability.
 *
 * KEY DESIGN: With the new damage formula p*(p+5) and partial bust rewards,
 * the mathematically optimal stand threshold is ~15. The skill gap comes from:
 * 1. Stand threshold (newbie stops too early, losing ~40% expected value)
 * 2. Split/double usage frequency
 * 3. Discard timing
 */

// ---------------------------------------------------------------------------
// Profile 1: Newbie (新手)
//   - Very conservative: stands at 12 (loses ~40% expected value per hand)
//   - Never splits or doubles down (too complicated)
//   - Rarely discards (doesn't understand the mechanic)
// ---------------------------------------------------------------------------

export function newbieDecide(state) {
  const { playerPoints, handsRemaining, discardsRemaining, canHit, canDiscard } = state;

  // Ultra-conservative: stand at 12 or above (far below optimal ~15)
  if (canHit && playerPoints < 12) {
    return { action: 'HIT' };
  }

  // Occasionally discards on very weak hands (30% chance)
  if (canDiscard && playerPoints < 9 && discardsRemaining > 0 && Math.random() < 0.3) {
    return { action: 'DISCARD' };
  }

  return { action: 'STAND' };
}

// ---------------------------------------------------------------------------
// Profile 2: Casual (休闲玩家)
//   - Basic blackjack strategy, stand at 14 (slightly below optimal)
//   - Splits Aces and 8s
//   - Doubles on 10-11
//   - Discards weak starting hands (< 11)
// ---------------------------------------------------------------------------

export function casualDecide(state) {
  const {
    playerPoints, playerCards, hitsThisRound,
    handsRemaining, discardsRemaining,
    enemyVisibleCard, canHit, canDoubleDown, canSplit, canDiscard,
  } = state;

  let standThreshold = 14;

  const enemyVisibleValue = enemyVisibleCard
    ? (enemyVisibleCard.rank === 'A' ? 11
      : ['J', 'Q', 'K'].includes(enemyVisibleCard.rank) ? 10
      : parseInt(enemyVisibleCard.rank))
    : 0;

  if (enemyVisibleValue >= 10) standThreshold += 1;
  if (enemyVisibleValue >= 2 && enemyVisibleValue <= 6) standThreshold -= 1;

  // Split Aces and 8s
  if (canSplit && handsRemaining >= 2) {
    const rank = playerCards[0]?.rank;
    if (rank === 'A' || rank === '8') {
      return { action: 'SPLIT' };
    }
  }

  // Double on 10-11
  if (canDoubleDown && hitsThisRound === 0) {
    if (playerPoints === 10 || playerPoints === 11) {
      return { action: 'DOUBLE_DOWN' };
    }
  }

  // Discard weak starting hand
  if (canDiscard && playerPoints < 11 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }

  if (canHit && playerPoints < standThreshold) {
    return { action: 'HIT' };
  }

  return { action: 'STAND' };
}

// ---------------------------------------------------------------------------
// Profile 3: Hardcore (硬核玩家)
//   - Near-optimal stand threshold (~15) for the new damage formula
//   - Aggressive split/double to maximize expected value
//   - Strategic discard to improve weak/mediocre hands
// ---------------------------------------------------------------------------

export function hardcoreDecide(state) {
  const {
    playerPoints, playerCards, hitsThisRound,
    handsRemaining, discardsRemaining,
    enemyVisibleCard, difficulty, selectedGenerals,
    canHit, canDoubleDown, canSplit, canDiscard,
    roundsRemaining, progressRatio,
  } = state;

  const hasGeneral = (id) => selectedGenerals.some(g => g.id === id);

  // === New mechanic bonuses ===
  const totalBustProtection = selectedGenerals.reduce((sum, g) => sum + (g.bust_protection || 0), 0);
  const hasHitLimitBonus = selectedGenerals.some(g => g.hit_limit_bonus > 0);
  const hasExtraDraw = selectedGenerals.some(g => g.extra_draw > 0);

  // Optimal stand threshold for p*(p+5) + partial bust reward
  let standThreshold = 15;
  if (difficulty === '困難') standThreshold = 14;
  if (difficulty === '入門') standThreshold = 16;

  // General-specific adjustments
  if (hasGeneral('guan_yu')) standThreshold += 1;
  if (hasGeneral('zhu_ge_liang')) standThreshold -= 2;
  if (hasGeneral('zhang_liao') && hitsThisRound === 0) standThreshold -= 2;
  if (hasGeneral('zhou_yu')) standThreshold += 2;
  if (hasGeneral('huang_yue_ying')) standThreshold += 1;
  if (hasGeneral('zhao_yun')) standThreshold += 1;
  if (hasGeneral('huang_zhong')) standThreshold += 1;
  if (hasGeneral('pang_de')) standThreshold += 1;

  // New mechanic adjustments
  if (totalBustProtection > 0) standThreshold += 1;
  if (hasHitLimitBonus) standThreshold += 1;
  if (hasExtraDraw) standThreshold -= 1;

  const enemyVisibleValue = enemyVisibleCard
    ? (enemyVisibleCard.rank === 'A' ? 11
      : ['J', 'Q', 'K'].includes(enemyVisibleCard.rank) ? 10
      : parseInt(enemyVisibleCard.rank))
    : 0;

  if (enemyVisibleValue >= 10) standThreshold += 1;
  if (enemyVisibleValue >= 2 && enemyVisibleValue <= 6) standThreshold -= 1;

  // Pressure: need to push harder
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

  // === 2. Double Down: maximize EV ===
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
  if (canDiscard && playerPoints < 12 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }
  if (canDiscard && playerPoints < 14 && enemyVisibleValue >= 10 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }
  if (canDiscard && playerPoints < 15 && progressRatio < 0.4 && roundsRemaining <= 2 && discardsRemaining > 0) {
    return { action: 'DISCARD' };
  }

  // === 4. Hit/Stand: optimal threshold ===
  if (canHit && playerPoints < standThreshold) {
    return { action: 'HIT' };
  }

  return { action: 'STAND' };
}

// ---------------------------------------------------------------------------
// Profile Registry
// ---------------------------------------------------------------------------

export const playerProfiles = {
  newbie:   { name: '新手',     decide: newbieDecide,   description: '保守策略（12點停牌），几乎不利用游戏机制' },
  casual:   { name: '休闲玩家', decide: casualDecide,   description: '基础策略（14點停牌），会分牌和双倍下注' },
  hardcore: { name: '硬核玩家', decide: hardcoreDecide, description: '最优策略（15點停牌），充分利用武将技能和机制' },
};
