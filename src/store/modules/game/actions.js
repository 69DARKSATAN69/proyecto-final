export default {
startGame(context){
    context.commit('setStage', 1);
},

advanceStage(context){
    context.commit('setStage', 2);
}
}