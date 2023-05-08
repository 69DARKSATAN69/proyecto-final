<template>
<intro-stage v-if="whatStage === 1"></intro-stage>

</template>

<script>
import IntroStage from './IntroStage.vue';
export default {
    components: {
        IntroStage
    },
    computed: {
        whatStage(){
            return this.$store.getters.gameStage;
        }
    },
    mounted() {
        this.$store.dispatch('startGame');
    }

}

</script>