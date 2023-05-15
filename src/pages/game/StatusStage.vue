<template>
<div class="container">
    <header>
    <h1>DAY {{ gameDays }} OF YOUR JOURNEY IN IRKALA</h1>
</header>
<main>

    
    <img src="./../../assets/stage1geon.jpg">
 
<div class="status-control">
<base-card>
<h1>{{monsterName}} the stage {{monsterStage}} Geon</h1>
<h2>Status</h2>
<p>Hit Points: {{monsterAttributes.hp}}</p>
<p>Strength: {{monsterAttributes.str}}</p>
<p>Spirit: {{monsterAttributes.spi}}</p>
<p>Hunger: {{hunger}}%</p>
</base-card>
</div>
</main>
<nav>
<base-card>
<div class="control-menu">
    <div class="error-control" v-if="error">{{error}}</div>
    <h3>Energy left: {{energy}}</h3>
    <base-button mode="flytrap">Alimentar</base-button>
    <!-- <base-button>Entrenar</base-button> -->
    <base-button mode="flytrap" @click="gameStage">Jugar</base-button>
    <base-button mode="flytrap">Explorar</base-button>
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
        setHunger(){
            this.hunger = this.whatHunger;
        },
        setEnergy(){
            this.energy = this.whatEnergy;
        },
        setMonsterStage(){
            this.monsterStage = this.whatMonsterStage;
        },
        gameStage(){
            this.error = null;
            if(!this.energy > 0){
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            this.$store.dispatch('minigameStage');

        },
        dormirStage(){
            this.error = null;
            this.$store.dispatch('continueDays');
            this.$store.dispatch('restartEnergy');
            this.energy = this.whatEnergy;
            this.gameDays = this.whatDays;
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