// Data Manager to handle loading of JSON datasets using fetch for web compatibility

class DataManager {
    constructor() {
        this.generals = [];
        this.enemies = [];
    }

    async loadAllData() {
        try {
            // Use fetch for web compatibility
            const [generalsResponse, enemiesResponse] = await Promise.all([
                fetch('./data/generals.json'),
                fetch('./data/enemies.json')
            ]);

            const generalsData = await generalsResponse.json();
            const enemiesData = await enemiesResponse.json();

            this.generals = generalsData.generals;
            this.enemies = enemiesData.enemies;

            console.log('Data loaded successfully via fetch:', {
                generalsCount: this.generals.length,
                enemiesCount: this.enemies.length
            });
            return true;
        } catch (error) {
            console.error('Failed to load data:', error);
            return false;
        }
    }

    getGeneralById(id) {
        return this.generals.find(g => g.id === id);
    }

    getEnemyById(id) {
        return this.enemies.find(e => e.id === id);
    }

    getEnemyByStage(index) {
        return this.enemies.find(e => e.stage_index === index);
    }
}

// Export singleton instance
const dataManager = new DataManager();
export default dataManager;
