<template>
<div class="container">
    <header>
    <h1>DAY {{ gameDays }} OF YOUR JOURNEY IN IRKALA</h1>
</header>
<main>


    <img src="./../../assets/stage1geon.jpg">
 
<div class="status-control">
<base-card>
<h1>{{monsterName}}</h1>
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
    <base-button mode="flytrap">Alimentar</base-button>
    <!-- <base-button>Entrenar</base-button> -->
    <base-button mode="flytrap">Jugar</base-button>
    <base-button mode="flytrap">Explorar</base-button>
    <base-button mode="flytrap">Dormir</base-button>
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
            hunger: null
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
        }
    },
    mounted(){
        this.setName();
        this.setDays();
        this.setAttributesInit();
        this.setHunger();
        console.log(this.$store.getters.getMonster);
    }
    


}
</script>

<style scoped>
main{display: grid; grid-template-columns: repeat(12, 1fr); gap: 1em;}

main img{grid-column: span 5; width: 90%; border: 1px solid burlywood; border-radius: 12px;}
.status-control{grid-column: span 6; width: 100%;}


</style>