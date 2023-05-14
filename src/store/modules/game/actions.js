export default {
startGame(context){
    context.commit('setStage', 1);
    context.commit('setDays', 1);
},

advanceStage(context){
    context.commit('setStage', 2);
},

startDays(context){
    context.commit('setDays', 1);
},

continueDays(context){
    context.commit('newDay')
},

async InitMonsterData(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/${payload.stage}.json`);
    console.log(response2);
    const data2 = await response2.json();
    console.log(data2);
    context.commit('setMonster', {type: payload.type, name: payload.name, hunger: 100, attributes: {hp: data2.attributes.hp, str: data2.attributes.str, spi: data2.attributes.spi}});
    // monsterStatus: {type: null,  name: null, hunger: null, attributes: {hp: null, str: null, spi: null}},

}
}