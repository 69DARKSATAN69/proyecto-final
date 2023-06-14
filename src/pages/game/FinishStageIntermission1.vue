<template>
<article>
    <header><base-card><h1>The first challenge</h1></base-card></header>
    <main>
        <base-card class="firstp">
        Your vision clears and you find yourself in the streets of {{cityName}}.
        Your hearing does not clear however, since it is being assailed by screams of passerby, cars freaking out and the noise of emergency vehicles.
        Turns out giant monsters are more exotic here back on real life than they are in Irkala.
    </base-card>
    <figure>
        <img src="./../../assets/finish/interm1.jpg" alt="this picture is awful">
    </figure>
    <base-card class="lastp">
    {{monsterName}} takes the initiative once again, however, and lunges at a nearby group of soldiers that are attempting to make first contact via American-brand diplomacy.
    <base-button @click="progress" mode="flytrap" class="button">Lunch!</base-button>

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
    this.$store.dispatch('setFinishStage', 3);
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

main{
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  gap: 3em;
}

header{
    grid-column: span 12;
    text-align: center;
}

figure{
    grid-column: 3/10
}

img{
    width: 100%;
    border: 1px solid burlywood;
    border-radius: 12px;
}

.firstp{
    grid-column: span 12;
    height: 70%;
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