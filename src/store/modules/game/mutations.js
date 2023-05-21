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
    },
    setEnergy(state, payload){
        state.energy = payload;
    },
    lowerEnergy(state){
        console.log(state.energy);
        state.energy = state.energy-1 >= 0 ? state.energy-1 : 0; 
        console.log(state.energy);

    },
    raiseMonsterStr(state, payload){
        state.monsterStatus.attributes.str += payload;
    },
    raiseMonsterHp(state,payload){
        state.monsterStatus.attributes.hp += payload;
    },
    raiseMonsterSpi(state, payload){
        state.monsterStatus.attributes.spi += payload;
    },
    feedMonster(state, payload){
        state.monsterStatus.hunger = state.monsterStatus.hunger + payload > 100 ? 100 : state.monsterStatus.hunger+payload;
    },
    monsterHungers(state, payload){
        state.monsterStatus.hunger = state.monsterStatus.hunger - payload < 0 ? 0 : state.monsterStatus.hunger-payload;
    },
    setMonsterStage(state, payload){
        state.monsterStatus.stage = payload;
    },
    setCurrentHp(state, payload){
        state.monsterStatus.currentHp = payload;
    }
}