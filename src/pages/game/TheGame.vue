<template>
<intro-stage v-if="whatStage === 1"></intro-stage>
<hatch-stage v-if="whatStage === 'hatch'"></hatch-stage>
<status-stage v-if="whatStage === 2"></status-stage>
<tic-tac-toe v-if="whatStage === 4"></tic-tac-toe>
<whacka-mole v-if="whatStage === 5"></whacka-mole>
<evo-stage v-if="whatStage === 'evo'"></evo-stage>
</template>

<script>
import IntroStage from './IntroStage.vue';
import HatchStage from './HatchStage.vue';
import StatusStage from './StatusStage.vue';
import TicTacToe from './TicTacToe.vue';
import WhackaMole from './WhackaMole.vue';
import EvoStage from './EvoStage.vue';
export default {
    components: {
        IntroStage,
        StatusStage,
        TicTacToe,
        WhackaMole,
        HatchStage,
        EvoStage
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