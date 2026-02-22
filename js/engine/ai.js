// AI Logic for individual enemies
class AIEngine {
    /**
     * @param {Object} enemyData - Data from enemies.json
     * @param {Hand} enemyHand - Current AI hand
     * @param {Hand} playerHand - Current Player hand (to check visibility)
     */
    static shouldHit(enemyData, enemyHand, playerHand) {
        const currentPoints = enemyHand.getPoints();
        const threshold = enemyData.ai_stand_threshold;
        const tendency = enemyData.ai_tendency; // 莽撞, 穩健, 狡詐

        // Mandatory hit if below threshold (usually 17 as per GDD)
        // Except for Cunning, which might stop earlier if leading? No, GDD says "usually hits below 17".
        if (currentPoints < 16) return true;
        if (currentPoints >= 21) return false;

        // Probabilistic part:
        let hitProbability = 0;

        // Base probability based on threshold
        if (currentPoints < threshold) {
            hitProbability = 0.8; // High chance to hit if below threshold
        } else if (currentPoints === threshold) {
            hitProbability = 0.3; // Lower chance to hit at threshold
        } else {
            hitProbability = 0.05; // Very low chance to hit above threshold
        }

        // Adjust for tendency
        if (tendency === '莽撞') {
            hitProbability += 0.2; // Reckless hits more often
        } else if (tendency === '狡詐') {
            hitProbability -= 0.1; // Cunning stays safe

            // Cunning looks at player cards
            const playerVisiblePoints = playerHand.getPoints(); // In this prototype, player is fully visible or just明牌?
            // GDD says: "狡詐：當玩家明牌點數較高（例如 ≥ 20）時，更傾向要牌（認為需追趕或賭博）"
            if (playerVisiblePoints >= 20 && playerVisiblePoints > currentPoints) {
                hitProbability += 0.4; // Push to catch up
            }
        }

        return Math.random() < hitProbability;
    }
}

export default AIEngine;
