export default {
    setUser(state, payload){
        state.userEmail = payload.email,
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
        state.isAdmin = payload.userId === 'GDnNBbcAsdhah8HbfMxBVFaL8by1' && !!payload.token;
    },
    setNavigation(state, payload){
        state.canNavigate = payload.canNavigate;
    },
    setUsername(state, payload){
        state.username = payload;
    }
};