<template>
    <article>
        <header><base-card><h1>The second challenge</h1></base-card></header>
        <main>
            <base-card>
           After what some will call a harrowing battle and others (specifically, {{ monsterName }}) will call brunch, the remaining soldiers beat a hasty retreat.
           When you look slightly to the left outside of your peripheral vision, it becomes clear why.
        </base-card>
        <base-card>During the chaos, the forces of {{cityName}} dropped a comically large bomb next to {{monsterName}}. Thankfully, thanks to your hopefully extensive training,
    it is capable of disarming it and thus gets to work.</base-card>
  
    <base-button @click="progress">Hackerman!</base-button>
        </main>
        
    </article>
    
    </template>
    <script>
    export default {
    data(){
        return {
        monsterName: null,
        cityName: null,
        };
    },
    computed: {
        whatMonsterName(){
            return this.$store.getters.getName;
        },
        whatCityName(){
            return this.$store.getters.getLastCity;
        }
    
    },
    methods: {
    progress(){
        this.$store.dispatch('setFinishStage', 5);
    }
    },
    mounted(){
        this.monsterName = this.whatMonsterName;
        this.cityName = this.whatCityName;
    }
        
    
    
    }
    </script>