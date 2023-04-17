export default {
    setUser(state, payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
        state.isAdmin = payload.userId === 'GDnNBbcAsdhah8HbfMxBVFaL8by1' && !!payload.token;
    }
};