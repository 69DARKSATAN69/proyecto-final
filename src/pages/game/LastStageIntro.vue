<!-- similar al componente de exploración, da información y permite seleccionar dónde se irá a la prueba final. -->

<template>
<article>
    <header>
        <base-card><h1>A new development!</h1></base-card>
    </header>
    <main>
        <base-card class="firstp">
        A strange loud, booming noise startles you awake.
        You open your eyes and find yourself in what might just be the single most uncomfortable position ever to sleep in,
        but that was probably caused by the explosion of light that just happened in the middle of your makeshift camp.
    </base-card>


    <base-card class="secondp">
    Where a small clearing with dirt, sand and a campfire stood just last night, now there is a large, ominous... portal of sorts floating mere centimetres from the ground.
    This "portal" carries a sense of familiarity with it however, since you can see shapes and images within its depths that you thought would be reduced to mere memories in your new (un?)life, as well as 
    noises that garnished your old life, such as cars honking, engines, indistinct chatter and annoying, overexaggerated laughs.
</base-card>
<img class="portal" src="./../../assets/finish/portal.jpg" alt="foreboding portal">

<base-card class="thirdp">
Your first instincts are, of course, to get the hell out of here to somewhere more peaceful to settle down again.
But said instincts have never been {{monsterName}}'s priority. It lurches up from its slumber, stares at the portal and rushes in, bellowing.
</base-card>
<base-card class="fourthp">
<span>Where in the world does the portal take you?</span>

<figure>
    <img src="./../../assets/finish/oviedo.jpg" alt="Uvieu" @click="chooseCity('Oviedo')">
    <img src="./../../assets/finish/canberra.jpg" alt="Canberra" @click="chooseCity('Canberra')">
    <img src="./../../assets/finish/ulaan.jpg" alt="Ulaan Baatar" @click="chooseCity('Ulaanbaatar')">


</figure>

</base-card>
    </main>
</article>
</template>
<script>
export default {
data(){
    return {
        monsterName: null,

    };
},

computed: {
    whatName(){
        return this.$store.getters.getName;
    }
},
methods: {
    //las ciudades por orden de dificultad son: ulaanbaatar > canberra > oviedo.
chooseCity(city){
    this.$store.dispatch('setLastCity', city);
    this.$store.dispatch('setFinishStage', 2);
}
},


mounted(){
    this.monsterName = this.whatName;
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
}

main{
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  gap: 1em;
}
.firstp{
    grid-column: span 12;

}

.secondp{
    grid-column: span 12;
}

.thirdp{
    grid-column: span 6;
}

.fourthp{
    grid-column: span 12;
    text-align: center;
}
figure{
    display: flex;
    flex-direction: row;
    gap: 1em;

}



img{
    width: 100%;
    cursor: pointer;
}


.portal{
    width: 100%;
    border: 1px solid burlywood;
    border-radius: 12px;
    grid-column: span 6;
}
</style>