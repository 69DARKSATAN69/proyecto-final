<template>
<article>
    <header>
        <base-card><h1>A new development!</h1></base-card>
    </header>
    <main>
        <base-card>
        A strange loud, booming noise startles you awake.
        You open your eyes and find yourself in what might just be the single most uncomfortable position ever to sleep in,
        but that was probably caused by the explosion of light that just happened in the middle of your makeshift camp.
    </base-card>
    <base-card>
    Where a small clearing with dirt, sand and a campfire stood just last night, now there is a large, ominous... portal of sorts floating mere centimetres from the ground.
    This "portal" carries a sense of familiarity with it however, since you can see shapes and images within its depths that you thought would be reduced to mere memories in your new (un?)life, as well as 
    noises that garnished your old life, such as cars honking, engines, indistinct chatter and annoying, overexaggerated laughs.
</base-card>
<base-card>
Your first instincts are, of course, to get the hell out of here to somewhere more peaceful to settle down again.
But said instincts have never been {{monsterName}}'s priority. It lurches up from its slumber, stares at the portal and rushes in, bellowing.
</base-card>
<base-card>Where in the world does the portal take you?
<base-button mode='flytrap' @click="chooseCity('Oviedo')">Oviedo</base-button>
<base-button mode='flytrap' @click="chooseCity('Oviedo')">Canberra</base-button>
<base-button mode='flytrap' @click="chooseCity('Ulaanbaatar')">Ulaanbaatar</base-button>
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
