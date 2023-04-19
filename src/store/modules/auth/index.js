import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
state(){
    return {
        userId: null,
        token: null,
        tokenExpiration: null,
        isAdmin: null,
        canNavigate: null
    };
},
getters,
actions,
mutations

};