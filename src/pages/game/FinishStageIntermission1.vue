<template>
<article>
    <header><base-card><h1>The first challenge</h1></base-card></header>
    <main>
        <base-card>
        Your vision clears and you find yourself in the streets of {{cityName}}.
        Your hearing does not clear however, since it is being assailed by screams of passerby, cars freaking out and the noise of emergency vehicles.
        Turns out giant monsters are more exotic here back on real life than they are in Irkala.
    </base-card>
    <base-card>
    {{monsterName}} takes the initiative once again, however, and lunges at a nearby group of soldiers that are attempting to make first contact via American-brand diplomacy.
</base-card>
<base-button @click="progress">Lunch!</base-button>
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
    this.$store.dispatch('setFinishStage', 3);
}
},
mounted(){
    this.monsterName = this.whatMonsterName;
    this.cityName = this.whatCityName;
}
    


}
</script>