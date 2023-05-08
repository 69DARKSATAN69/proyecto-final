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
    }


}