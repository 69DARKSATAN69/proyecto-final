<template>
    <section v-if="!exploreLocation">
        <header>
            <h2>Which region will you explore?</h2>
        </header>
        <base-card>

            <!-- <base-button mode="wallflower" @click="chooseLocation('Forest')">Forest</base-button>
            <base-button mode="wallflower" @click="chooseLocation('Lake')">Lake</base-button>
            <base-button mode="wallflower" @click="chooseLocation('Mountain')">Mountains</base-button> -->
        <!-- <figure>
            <img src="./../../assets/explore/forest.jpg" @click="chooseLocation('Forest')">
        
            <img src="./../../assets/explore/lake.jpg" @click="chooseLocation('Lake')">
            <img src="./../../assets/explore/mountain.jpg" @click="chooseLocation('Mountain')">
        </figure> -->
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