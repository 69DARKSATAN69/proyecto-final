<template>
<div class="container">
    <header>
    <h1>DAY {{ gameDays }} OF YOUR JOURNEY IN IRKALA</h1>
</header>
<main>

    
    <img src="./../../assets/stage1geon.jpg" v-if="monsterStage === 1">
    <img src="./../../assets/stage2geon.jpg" v-else-if="monsterStage === 2">
    <img src="./../../assets/stage3geon.png" v-else-if="monsterStage === 3">
    <img src="./../../assets/stage4geon.jpg" v-else-if="monsterStage === 4">
 
<div class="status-control">
<base-card>
<h1>{{monsterName}} the stage {{monsterStage}} Geon</h1>
<h2>Status</h2>
<p>Hit Points: <progress min=0 :max=monsterAttributes.hp :value=currentHp></progress>{{currentHp}} out of {{monsterAttributes.hp}}</p>
<p>Strength: {{monsterAttributes.str}}</p>
<p>Spirit: {{monsterAttributes.spi}}</p>
<p>Hunger: <progress min=0 max=100 :value=hunger></progress> </p>{{hunger}}%
</base-card>
</div>
</main>
<nav>
<base-card>
<div class="control-menu">
    <div class="error-control" v-if="error">{{error}}</div>
    <h3>Energy left: {{energy}}</h3>
    <base-button mode="flytrap" @click="gameStageEat">Alimentar</base-button>
    <base-button mode="flytrap" @click="gameStagePlay">Jugar</base-button>
    <base-button mode="flytrap" v-if="monsterStage > 1" @click="exploreStage">Explorar</base-button>
    <base-button mode="flytrap" @click="dormirStage">Dormir</base-button>
</div>
</base-card>
</nav>
</div>
</template>

<script>
export default {
    data() {
        return {
            monsterName: '',
            error: null,
            gameDays: 0,
            monsterAttributes: {hp: 0, str: 0, spi: 0},
            hunger: null,
            energy: 0,
            monsterStage: 0,
            currentHp: 0
          
        };
    },
    methods: {
        setDays(){
            this.gameDays = this.whatDays;
        },
        setName(){
            this.monsterName = this.whatName;
        },
        setAttributesInit(){
            this.monsterAttributes.hp = this.whatAttributes.hp;
            this.monsterAttributes.str = this.whatAttributes.str;
            this.monsterAttributes.spi = this.whatAttributes.spi;

        },
        setCurrentHp(){
            this.currentHp = this.whatCurrentHp;
        },
        setHunger(){
            this.hunger = this.whatHunger;
        },
        setEnergy(){
            this.energy = this.whatEnergy;
        },
        setMonsterStage(){
            this.monsterStage = this.whatMonsterStage;
        },
        gameStagePlay(){
            this.error = null;
            if(!this.energy > 0){
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            this.$store.dispatch('minigameStagePlay');

        },

        gameStageEat(){
            this.error = null;
            if(!this.energy > 0){
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            if(this.monsterStage === 1){
            this.$store.dispatch('minigameStageEat');
            }else{
                this.$store.dispatch('minigameStage2Eat');
            }
        },


        dormirStage(){
            this.error = null;
            this.$store.dispatch('hungryMonster', 10*Math.floor(Math.random()*2)+1);
            this.$store.dispatch('continueDays');
            this.$store.dispatch('restartEnergy');
            this.hunger = this.whatHunger;
            this.$store.dispatch('changeCurrentHp', (this.hunger/100)*this.monsterAttributes.hp);
            this.setCurrentHp();
            this.energy = this.whatEnergy;
            this.gameDays = this.whatDays;
            this.gameDays === 3 ? this.$store.dispatch('enterEvo') : null;
            this.gameDays === 6 ? this.$store.dispatch('enterEvo') : null;
        },

        exploreStage(){
            this.error = null;
            if(!this.energy > 0){
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            console.log(this.whatStage);
            this.$store.dispatch('enterExplore');
            console.log(this.whatStage);
        }
    },
    computed: {
        whatStage(){
            return this.$store.getters.gameStage;
        },
        whatDays(){
            return this.$store.getters.getDays;
        },
        whatName(){
            return this.$store.getters.getName;
        },
        whatAttributes(){
            return this.$store.getters.getMonster.attributes;
        },
        whatHunger(){
            return this.$store.getters.getHunger;
        },
        whatEnergy(){
            return this.$store.getters.getEnergy;
        },
        whatMonsterStage(){
            return this.$store.getters.getMonsterStage;
        },
        whatCurrentHp(){
            return this.$store.getters.getCurrentHp;
        }
    },
    mounted(){
        this.setName();
        this.setDays();
        this.setAttributesInit();
        this.setHunger();
        this.whatEnergy === null ? this.$store.dispatch('restartEnergy') : null;
        this.setEnergy();
        this.setMonsterStage();
        this.setCurrentHp();
        console.log(this.$store.getters.getMonster);
    }
    


}
</script>

<style scoped>
main{display: grid; grid-template-columns: repeat(12, 1fr); gap: 1em;}

main img{grid-column: span 5; width: 90%; border: 1px solid burlywood; border-radius: 12px;}
.status-control{grid-column: span 6; width: 100%;}

.error-control{padding: 2em;}
</style>