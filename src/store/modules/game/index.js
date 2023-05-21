import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';


export default {
    state(){
        return {
            gameDays: null,
            gameStage: null,
            monsterStatus: {type: null,  name: null, hunger: null, attributes: {hp: null, str: null, spi: null}, stage: null, currentHp: null},
            enemyStatus: {type: null, name: null, attributes: {hp: null, dmg: null}},
            inventory: null,
            currentZone: null,
            energy: null,
          
         

        };
    },
    getters,
    actions,
    mutations
    
    };