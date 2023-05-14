<template>
<intro-stage v-if="whatStage === 1"></intro-stage>
<status-stage v-if="whatStage === 2"></status-stage>
</template>

<script>
import IntroStage from './IntroStage.vue';
import StatusStage from './StatusStage.vue';
export default {
    components: {
        IntroStage,
        StatusStage
    },
    data(){
    return {
        days: 0,
        monsterName: '',
        monsterStr: 0,
        monsterHp: 0,
        monsterSpi: 0,
        monsterStage: 0,
    };
},

    computed: {
        whatStage(){
            return this.$store.getters.gameStage;
        },
        whatDays(){
            return this.$store.getters.getDays;
        },
    },
    mounted() {
        this.$store.dispatch('startGame');
    }

}

</script>