import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
state(){
    return {
        username: sessionStorage.getItem('username') || null,
        userEmail: sessionStorage.getItem('userEmail') || null,
        userId: sessionStorage.getItem('userId') || null,
        token: sessionStorage.getItem('token') || null,
        tokenExpiration: null,
        isAdmin: (sessionStorage.getItem('userId') === 'GDnNBbcAsdhah8HbfMxBVFaL8by1' && !!sessionStorage.getItem('token')) || null,
        canNavigate: sessionStorage.getItem('canNavigate') || true
    };
},
getters,
actions,
mutations

};