export default {

    gameStage(state){
        return state.gameStage;
    },

    getMonster(state){
        return state.monsterStatus;
    },
    getMonsterAttributes(state){
        return state.monsterStatus.attributes;
    },

    getEnemy(state){
        return state.enemyStatus;
    },

    getInv(state){
        return state.inventory;
    },

    getZone(state){
        return state.currentZone;
    },
    
    getDays(state){
        return state.gameDays;
    },
    getName(state){
        return state.monsterStatus.name;
    },
    getHunger(state){
        return state.monsterStatus.hunger;
    },
    getMonsterStage(state){
        return state.monsterStatus.stage;
    },
    getEnergy(state){
        return state.energy;
    },
    getMonsterType(state){
        return state.monsterStatus.type;
    },
    getCurrentHp(state){
        return state.monsterStatus.currentHp;
    },
    getTraits(state){
        return state.traits;
    },
    getCurrentTraits(state){
        return state.currentTraits;
    },
    getFinishStage(state){
        return state.finishStage;
    },
    getLastCity(state){
        return state.lastCity;
    }


}