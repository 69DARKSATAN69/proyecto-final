export default {

    userId(state){
        return state.userId;
    },
    token(state){
        return state.token;
    },
    userEmail(state){
        return state.userEmail;
    },
    isAuthenticated(state){
        return !!state.token;
    },
    isAdmin(state){
        return state.isAdmin;
    },
    canNavigate(state){
        return state.canNavigate;
    }
};