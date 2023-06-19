<!-- ver intermission 1 para comentarios acerca de este tipo de componente. -->
<template>
    <article>
        <header><base-card><h1>The second challenge</h1></base-card></header>
        <main>
            <base-card>
           After what some will call a harrowing battle and others (specifically, {{ monsterName }}) will call brunch, the remaining soldiers beat a hasty retreat.
           When you look slightly to the left outside of your peripheral vision, it becomes clear why.
        </base-card>
        <figure>
            <img src="./../../assets/finish/bomb.png" alt="the ira would be proud">
          </figure>
        <base-card class="lastp">During the chaos, the forces of {{cityName}} dropped a comically large bomb next to {{monsterName}}. Thankfully, thanks to your hopefully extensive training,
    it is capable of disarming it and thus gets to work.
    <base-button class="button" @click="progress" mode="flytrap">Hackerman!</base-button>

</base-card>

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

<style scoped>
article{
   
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  gap: 3em;
}
header{
    grid-column: span 12;
    text-align: center;
}
main{
    grid-column: 3/11;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
}

.lastp{
    grid-column: span 12;
    text-align: center;
}

.button{
    width: 50%;
    margin: auto;
    margin-top: 2em;
}
</style>