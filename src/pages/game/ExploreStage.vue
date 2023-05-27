<template>
    <section v-if="!exploreLocation">
        <header>
            <h2>Which region will you explore?</h2>
        </header>
        <base-card>

            <base-button mode="wallflower" @click="chooseLocation('forest')">Forest</base-button>
            <base-button mode="wallflower" @click="chooseLocation('lake')">Lake</base-button>
            <base-button mode="wallflower" @click="chooseLocation('mountain')">Mountains</base-button>

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
            this.exploreLocation = place;
            this.$store.dispatch('enterCombat');

        },
        setGameStage() {
            this.gameStage = this.whatStage;
        }
    },
    mounted() {
        this.setGameStage();
        console.log(this.gameStage);
        console.log(this.whatStage);
    }

}
</script>