import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';


export default {
    state(){
        return {
            gameDays: null,
            gameStage: null,
            monsterStatus: {type: null,  name: null, hunger: null, attributes: {hp: null, str: null, spi: null}, stage: null, currentHp: null},
            enemyStatus: {name: null, attributes: {hp: null, spi: null, str: null}, id: null},
            currentZone: null,
            energy: null,
            traits: null,
            currentTraits: [],
            finishStage: null,
            lastCity: null,
            peopleEaten: null,
            combatsWon: null,
            combatsDone: null,
            gamesPlayed: null,
            gamesWon: null,
            gamesTied: null,

          
         

        };
    },
    getters,
    actions,
    mutations
    
    };