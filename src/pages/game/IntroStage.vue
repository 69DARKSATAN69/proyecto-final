<!-- esto es el componente de intro al juego, es informativo. -->

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
<div class="input-control">
<input type="text"  placeholder="Name your companion and press on the image below" v-model.trim="monsterName">
</div>
<div class="error-control" v-if="error">
    <p>{{ error }}</p>
</div>
<figure @click="advanceStage">
    <img src="./../../assets/eggInPlains.png" alt="a giant egg in the plains">
</figure>
</div>

</template>

<script>

export default {
    //la variable monsterName es para nombrar al monstruo, la de error es para manejo de errores de nombres inválidos.
    data() {
        return {
            monsterName: '',
            error: null
        };
    },
    computed: {
        whatStage(){
            
            return this.$store.getters.gameStage;
        },
    },
methods: {
    //utiliza un método de la store para inicializar al monstruo con sus atributos básicos.
async setupMonster(){
   await this.$store.dispatch('InitMonsterData', {stage: 'stage1', type:'Geon', name: this.monsterName});
   
},

async advanceStage(){
    if(this.monsterName === ''){

     this.handleNameError()}
    else{
        //el try catch saltaría si el servidor por lo que fuera no respondiera, por faltar auth o que cayese firebase.
        try{
        await this.setupMonster();
        }catch(err){
            this.error = err || "The server thinks you are wearing white socks. But really, it doesn't work right now, try again later";
        }
     this.$store.dispatch('hatchEgg');
    }
},
handleNameError(){
this.error = 'Please input a name';
}
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

.input-control{
    text-align: center;
    padding: 1em;
}

input{
    width: 50%;
    padding: 1em 0;
}
</style>