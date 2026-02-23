// Data Manager to handle loading of JSON datasets using fetch for web compatibility

class DataManager {
    constructor() {
        this.generals = [];
        this.enemies = [];
        this.schemes = [];
        this.relics = [];
    }

    async loadAllData() {
        try {
            // Use fetch for web compatibility
            const [generalsResponse, enemiesResponse, schemesResponse, relicsResponse] = await Promise.all([
                fetch('./data/generals.json'),
                fetch('./data/enemies.json'),
                fetch('./data/schemes.json'),
                fetch('./data/relics.json')
            ]);

            const generalsData = await generalsResponse.json();
            const enemiesData = await enemiesResponse.json();
            const schemesData = await schemesResponse.json();
            const relicsData = await relicsResponse.json();

            this.generals = generalsData.generals;
            this.enemies = enemiesData.enemies;
            this.schemes = schemesData.schemes;
            this.relics = relicsData.relics;

            console.log('Data loaded successfully via fetch:', {
                generalsCount: this.generals.length,
                enemiesCount: this.enemies.length,
                schemesCount: this.schemes.length,
                relicsCount: this.relics.length
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

    getSchemeById(id) {
        return this.schemes.find(s => s.id === id);
    }

    getRelicById(id) {
        return this.relics.find(r => r.id === id);
    }
}

// Export singleton instance
const dataManager = new DataManager();
export default dataManager;
