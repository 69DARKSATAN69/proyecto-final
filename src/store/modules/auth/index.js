import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
state(){
    return {
        username: null,
        userEmail: null,
        userId: null,
        token: null,
        tokenExpiration: null,
        isAdmin: null,
        canNavigate: true
    };
},
getters,
actions,
mutations

};