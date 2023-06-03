<template>
    <article>
        <header><base-card><h1>The last challenge</h1></base-card></header>
        <main>
            <base-card>
           With either deft claws or tough skin, {{ monsterName }} has averted yet another crisis thrown its way by the merciless forces of people trying not to die in the most awesome way possible.

        </base-card>
        <base-card>{{cityName}} is not done however. Clearing the rubble around you, their most powerful champion stands tall, 
        challenging {{monsterName}} to a winner-takes-all fight to the death.</base-card>
  
    <base-button @click="progress">It's our last dance!</base-button>
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
    async progress(){
        await this.$store.dispatch('initEnemyData', {zone: this.whatCityName, enemy: 1} );
        this.$store.dispatch('setFinishStage', 7);
    }
    },
    mounted(){
        this.monsterName = this.whatMonsterName;
        this.cityName = this.whatCityName;
    }
        
    
    
    }
    </script>