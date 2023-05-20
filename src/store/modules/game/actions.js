export default {
startGame(context){
    context.commit('setStage', 1);
    context.commit('setDays', 1);
},

advanceStage(context){
    context.commit('setStage', 2);
},

hatchEgg(context){
context.commit('setStage', 'hatch');
},

minigameStagePlay(context){
    context.commit('setStage', 4);
},

minigameStageEat(context){
    context.commit('setStage', 5);
},

enterEvo(context){
    context.commit('setStage', 'evo');
},
handleEvolution(context, payload){
    context.commit('setMonsterStage', payload);
},

startDays(context){
    context.commit('setDays', 1);
},

continueDays(context){
    context.commit('newDay')
},

restartEnergy(context){
    context.commit('setEnergy', 3)
},

lowerEnergy(context){
    context.commit('lowerEnergy');
},

stage1PlayWin(context){
    context.commit('raiseMonsterSpi', 20);
},
stage1PlayTie(context){
    context.commit('raiseMonsterSpi', 10);
},
stage1PlayLose(context){
    context.commit('raiseMonsterSpi', 5);
},
feedingMonster(context, payload){
    context.commit('feedMonster', payload);
},
hungryMonster(context,payload){
    context.commit('monsterHungers', payload)
},

async InitMonsterData(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/${payload.stage}.json`);
    const data2 = await response2.json();
    context.commit('setMonster', {type: payload.type, name: payload.name, hunger: 100, attributes: {hp: data2.attributes.hp, str: data2.attributes.str, spi: data2.attributes.spi}, stage: 1});
    // monsterStatus: {type: null,  name: null, hunger: null, attributes: {hp: null, str: null, spi: null}},

},

async evolutionStatUpdate(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/${payload}.json`);
    const data2 = await response2.json();
    console.log(data2);
    context.commit('raiseMonsterHp', data2.attributes.hp);
    context.commit('raiseMonsterStr', data2.attributes.str);
    context.commit('raiseMonsterSpi', data2.attributes.spi);
}

}