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
minigameStage2Eat(context){
    context.commit('setStage', 6);
},
minigameStage3Eat(context){
    context.commit('setStage', 7);
},
enterExplore(context){
    context.commit('setStage', 9);
},
enterCombat(context){
    context.commit('setStage', 10);
},
enterEnd(context){
    context.commit('setStage', 11);
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
    if(context.state.currentTraits.some(([traitName]) => traitName === 'Dynamo')){
        context.commit('setEnergy', 4)}else{
    context.commit('setEnergy', 3)
        }
},

lowerEnergy(context){
    context.commit('lowerEnergy');
},

stage1PlayWin(context){
    if(context.state.currentTraits.some(([traitName]) => traitName === 'Great Spirit')){
    context.commit('raiseMonsterSpi', 30);}
    else{
        context.commit('raiseMonsterSpi', 20);
    }
},
stage1PlayTie(context){
    if(context.state.currentTraits.some(([traitName]) => traitName === 'Great Spirit')){
        context.commit('raiseMonsterSpi', 15);}
        else{
            context.commit('raiseMonsterSpi', 10);
        }
},
stage1PlayLose(context){
    if(context.state.currentTraits.some(([traitName]) => traitName === 'Great Spirit')){
        context.commit('raiseMonsterSpi', 10);}
        else{
            context.commit('raiseMonsterSpi', 5);
        }
},
stage1FeedHp(context, payload){
    context.commit('raiseMonsterHp', payload);
},
feedingMonster(context, payload){
    context.commit('feedMonster', payload);
},
hungryMonster(context,payload){
    context.commit('monsterHungers', payload)
},
changeCurrentHp(context, payload){
    
    let healTotal = payload > context.state.monsterStatus.attributes.hp ? context.state.monsterStatus.attributes.hp : payload;

    context.commit('setCurrentHp', healTotal);
},
combatEnd(context, payload){
    context.commit('raiseMonsterStr', payload);
},
resetEnemy(context){
    context.commit('setEnemy', {name: null, attributes: {hp: null, spi: null, str: null}});
},
setTraits(context,payload){
    context.commit('setTraits', payload);
},
addTrait(context, payload){
    context.commit('addCurrentTrait', payload);
},

setFinishStage(context, payload){
    context.commit('setFinishStage', payload)
},
setLastCity(context, payload){
    context.commit('setLastCity', payload);
},
endGame(context){
    context.commit('endGame');
},
setPeopleEaten(context, payload){
    context.commit('setPeopleEaten', payload);

},
setCombatsWon(context, payload){
    context.commit('setCombatsWon', payload);
},
setCombatsDone(context, payload){
    context.commit('setCombatsDone', payload);
},
setGamesPlayed(context, payload){
    context.commit('setGamesPlayed', payload);
},
setGamesWon(context, payload){
    context.commit('setGamesWon', payload);
},
setGamesTied(context, payload){
    context.commit('setGamesTied', payload);
},
async InitMonsterData(context, payload){
    
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/${payload.stage}.json?auth=${context.getters.token}`);
    const data2 = await response2.json();
    context.commit('setMonster', {type: payload.type, name: payload.name, hunger: 100, attributes: {hp: data2.attributes.hp, str: data2.attributes.str, spi: data2.attributes.spi}, stage: 1});


},

async evolutionStatUpdate(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/${payload}.json?auth=${context.getters.token}`);
    const data2 = await response2.json();
    context.commit('raiseMonsterHp', data2.attributes.hp);
    context.commit('raiseMonsterStr', data2.attributes.str);
    context.commit('raiseMonsterSpi', data2.attributes.spi);
},

async initEnemyData(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/Zones/${payload.zone}/Enemies/${payload.enemy}.json?auth=${context.getters.token}`);
    const data2 = await response2.json();
    context.commit('setEnemy', data2)

},

async initTraits(context){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/monsters/Geon/traits.json?auth=${context.getters.token}`);
    const data2 = await response2.json();
    context.commit('setTraits', data2);
},

async sendGame(context, payload){
    const response2 = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/playthroughs/${payload.gameId}.json?auth=${context.getters.token}`,
    {
        method: 'PUT',
        body: JSON.stringify(payload.gameScore)
});
    const data2 = await response2.json();

}
}