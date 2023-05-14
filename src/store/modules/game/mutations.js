export default {
//esto se usa para manipular en que lugar esta el juego. null implica que no se esta jugando, 1 seria el inicio.
    setStage(state, payload){
        state.gameStage = payload;
    },

    nullifyStage(state){
        state.gameStage = null;
    },
    
    setMonster(state, payload){
        state.monsterStatus = payload;
    },

    setEnemy(state, payload){
        state.enemyStatus = payload;
    },

    setZone(state, payload){
        state.currentZone = payload;
    },

   setDays(state, payload){
    state.gameDays = payload;
   },

    newDay(state){
        state.gameDays+=1;
    },

    removeDays(state){
        state.gameDays = null;
    }

}