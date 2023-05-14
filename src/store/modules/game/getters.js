export default {

    gameStage(state){
        return state.gameStage;
    },

    getMonster(state){
        return state.monsterStatus;
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
    }


}