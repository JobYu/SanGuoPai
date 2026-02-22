// Combat and Damage calculation
class CombatEngine {
    /**
     * Calculate damage based on GDD: (Base + Additive) * Multiplier
     * @param {number} playerPoints 
     * @param {number} enemyPoints 
     * @param {boolean} isBlackjack 
     * @param {Array} additiveSkills - list of skill values (e.g. [20, 15])
     * @param {Array} multiplierSkills - list of multiplier values (e.g. [1.5, 1.2])
     */
    static calculateDamage(playerPoints, enemyPoints, isBlackjack, additiveSkills = [], multiplierSkills = []) {
        if (playerPoints > 21) return 0; // Bust
        if (playerPoints <= enemyPoints && enemyPoints <= 21) return 0; // Lose or Push

        let baseDamage = 0;
        if (playerPoints === 21) {
            baseDamage = 210;
        } else {
            const effectiveEnemyPoints = enemyPoints > 21 ? 0 : enemyPoints;
            baseDamage = (playerPoints - effectiveEnemyPoints) * 10;
        }

        const totalAdditive = additiveSkills.reduce((acc, val) => acc + val, 0);
        let totalMultiplier = multiplierSkills.reduce((acc, val) => acc * val, 1);

        const finalDamage = Math.floor((baseDamage + totalAdditive) * totalMultiplier);
        return finalDamage;
    }
}

export default CombatEngine;
