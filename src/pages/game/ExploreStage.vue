<template>
    <section v-if="!exploreLocation">
        <header>
            <h2>Which region will you explore?</h2>
        </header>
        <base-card>

            <base-button mode="wallflower" @click="chooseLocation('Forest')">Forest</base-button>
            <base-button mode="wallflower" @click="chooseLocation('Lake')">Lake</base-button>
            <base-button mode="wallflower" @click="chooseLocation('Mountain')">Mountains</base-button>

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