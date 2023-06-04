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
    },
    setTraits(state, payload){
        state.traits = payload;
    },
    addCurrentTrait(state, payload){
        state.currentTraits.push(payload);
    },
    setFinishStage(state, payload){
        state.finishStage = payload;
    },
    setLastCity(state, payload){
        state.lastCity = payload;
    },
    initExtraStats(state){
        state.peopleEaten = 0;
        state.combatsWon = 0;
       state.combatsDone = 0;
       state.gamesPlayed = 0;
       state.gamesWon = 0;
       state.gamesTied = 0;
    },
    setPeopleEaten(state, payload){
        state.peopleEaten = payload;

    },
    setCombatsWon(state, payload){
        state.combatsWon = payload;
    },
    setCombatsDone(state, payload){
        state.combatsDone = payload;
    },
    setGamesPlayed(state, payload){
        state.gamesPlayed = payload;
    },
    setGamesWon(state, payload){
        state.gamesWon = payload;
    },
    setGamesTied(state, payload){
        state.gamesTied = payload;
    },


    endGame(state){
        state.gameDays= null;
        state.gameStage= null;
        state.monsterStatus= {type: null,  name: null, hunger: null, attributes: {hp: null, str: null, spi: null}, stage: null, currentHp: null};
        state.enemyStatus= {name: null, attributes: {hp: null, spi: null, str: null}, id: null};
        state.currentZone= null;
        state.energy= null;
        state.traits= null;
        state.currentTraits= [];
        state.finishStage= null;
        state.lastCity= null;
        state.peopleEaten = null;
        state.combatsWon = null;
       state.combatsDone = null;
       state.gamesPlayed = null;
       state.gamesWon = null;
       state.gamesTied = null;
      
    }

}