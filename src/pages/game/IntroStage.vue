<template>
    <div v-if="whatStage === 1">
<base-card>
<h1>A fortuitous encounter</h1>
<p>As you open your eyes, you are greeted by the fresh smell of grass and the sight of rolling plains stretching into the horizon.</p>
<p>You walk forward, to nowhere in particular since where would you go even if you did know where you are, anyway?</p>
</base-card>
<base-card>
<p>After a few minutes walking, you trip on a hole concealed by the endless grass and land facefirst into the green carpet beneath.</p>
<p>Out of your many trip and falls, this probably rates a 4 out of ten. Nothing fancy.</p>
</base-card>
<base-card>
<p>The hole in front of you, however, contains something that could certainly be considered fancy.</p>
<p>If massive eggs, or at least egg-shaped boulders are your thing, anyway.</p>
</base-card>
<figure @click="advanceStage">
    <img src="./../../assets/eggInPlains.png" alt="a giant egg in the plains">
</figure>
</div>

</template>

<script>
export default {
    computed: {
        whatStage(){
            return this.$store.getters.gameStage;
        },
    },
methods: {
advanceStage(){
    this.$store.dispatch('advanceStage');
},
},
}
</script>


<style scoped>
figure{
    width: 50%;
    margin: 1em auto;

}
figure img{
    width: 100%;
  
    border: 3px solid burlywood;
}
</style>