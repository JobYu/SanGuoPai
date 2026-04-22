// Combat and Money calculation
class CombatEngine {
    /**
     * Calculate money gained based on blackjack result
     * @param {number} playerPoints
     * @param {number} enemyPoints
     * @param {boolean} isBlackjack
     * @param {number} betMultiplier - 1 (normal), 2 (double down)
     * @param {Array} additiveSkills - list of skill values (e.g. [20, 15])
     * @param {Array} multiplierSkills - list of multiplier values (e.g. [1.5, 1.2])
     * @returns {Object} { money: number, result: 'WIN'|'LOSE'|'PUSH'|'BUST' }
     */
    static calculateMoney(playerPoints, enemyPoints, isBlackjack, betMultiplier = 1, additiveSkills = [], multiplierSkills = [], bustProtection = 0) {
        const multiplier = playerPoints + 5;
        const baseMoney = playerPoints * multiplier * betMultiplier;

        // Bust: partial reward (closer to 21 = more reward)
        // Base: 22=70%, 23=60%, 24=50%, 25=40%, 26=30%, 27=20%, 28=10%, 29+: 0%
        // bustProtection adds to keepRatio (capped at 1.0)
        if (playerPoints > 21) {
            const overage = playerPoints - 21;
            let keepRatio = Math.max(0, 0.8 - overage * 0.1);
            keepRatio = Math.min(1.0, keepRatio + bustProtection);
            const totalAdditive = additiveSkills.reduce((acc, val) => acc + val, 0) + playerPoints;
            const totalMultiplier = multiplierSkills.reduce((acc, val) => acc * val, 1);
            const partialMoney = Math.floor((baseMoney * keepRatio + totalAdditive) * totalMultiplier);
            return { money: partialMoney, result: 'BUST' };
        }

        // Push: no money exchange
        if (playerPoints === enemyPoints) {
            return { money: 0, result: 'PUSH' };
        }

        // Lose: no money gained
        if (playerPoints < enemyPoints && enemyPoints <= 21) {
            return { money: 0, result: 'LOSE' };
        }

        // Win: calculate money (higher points = much higher reward)
        const totalAdditive = additiveSkills.reduce((acc, val) => acc + val, 0) + playerPoints;
        const totalMultiplier = multiplierSkills.reduce((acc, val) => acc * val, 1);
        const finalMoney = Math.floor((baseMoney + totalAdditive) * totalMultiplier);

        return {
            money: finalMoney,
            baseMoney: Math.floor(baseMoney),
            result: isBlackjack ? 'BLACKJACK' : 'WIN'
        };
    }

    /**
     * Check if player meets the stage goal
     * @param {number} currentMoney - Total money earned this battle
     * @param {number} targetMoney - Money target for this stage
     * @param {number} currentRound - Current round number
     * @param {number} maxRounds - Maximum rounds allowed
     * @returns {Object} { achieved: boolean, reason: 'SUCCESS'|'OUT_OF_ROUNDS'|'INSUFFICIENT_MONEY' }
     */
    static checkStageGoal(currentMoney, targetMoney, currentRound, maxRounds) {
        if (currentMoney >= targetMoney) {
            return { achieved: true, reason: 'SUCCESS' };
        }
        if (currentRound >= maxRounds) {
            return { achieved: false, reason: 'OUT_OF_ROUNDS' };
        }
        return { achieved: false, reason: 'INSUFFICIENT_MONEY' };
    }
}

export default CombatEngine;
