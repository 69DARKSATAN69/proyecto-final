<!-- es un componente sencillo intermediario entre el status y el combate -->
<template>
    <section v-if="!exploreLocation">
        <header>
            <h2>Which region will you explore?</h2>
        </header>
        <base-card>
        <div class="option-control">
            <figure>
                <figcaption>Forest</figcaption>
                <img src="./../../assets/explore/forest.jpg" @click="chooseLocation('Forest')">
            </figure>
            <figure>
                <figcaption>Lake</figcaption>
                <img src="./../../assets/explore/lake.jpg" @click="chooseLocation('Lake')">
            </figure>
        
        <figure>
            <figcaption>Mountain</figcaption>
            <img src="./../../assets/explore/mountain.jpg" @click="chooseLocation('Mountain')">
        </figure>
    </div>
        </base-card>
    </section>
</template>

<script>
export default {
//los datos son en qué parte del juego nos encontramos y hacia dónde quiere ir el jugador
    data() {
        return {
            exploreLocation: '',
            gameStage: '',
        };

    },
    computed: {
        whatStage() {
            return this.$store.getters.gameStage;
        },
    },
    //al seleccionar un lugar, se elige a un monstruo de la base de datos de ese lugar para servir de oponente en el combate
    //acto seguido se inicia el combate.
    methods: {
        chooseLocation(place) {
           
            let randomEnemy = Math.floor(Math.random()*2)+1;
            this.$store.dispatch('initEnemyData', {zone: place, enemy: randomEnemy} );
            this.$store.dispatch('enterCombat');

        },
        setGameStage() {
            this.gameStage = this.whatStage;
        }
    },
    mounted() {
        this.setGameStage();
   
    }

}
</script>

<style scoped>

.option-control{
    display: flex;
    flex-direction: row;
    gap: 1em;
}

figcaption{
    text-align: center;
}

img{
    width: 100%;
    cursor: pointer;
    
}
h2{
    text-align: center;
}
header{
    padding: 2em;
}

</style>