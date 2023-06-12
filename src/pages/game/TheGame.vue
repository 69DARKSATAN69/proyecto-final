<template>
    <transition name="stageChange" mode="out-in">
        <intro-stage v-if="whatStage === 1" key="intro"></intro-stage>
        <hatch-stage v-else-if="whatStage === 'hatch'" key="hatch"></hatch-stage>
        <status-stage v-else-if="whatStage === 2" key="status"></status-stage>
        <tic-tac-toe v-else-if="whatStage === 4" key="ticTacToe"></tic-tac-toe>
        <whacka-mole v-else-if="whatStage === 5" key="whackaMole"></whacka-mole>
        <whacka-mole2 v-else-if="whatStage === 6" key="whackaMole2"></whacka-mole2>
        <whacka-mole3 v-else-if="whatStage === 7" key="whackaMole3"></whacka-mole3>
        <evo-stage v-else-if="whatStage === 'evo'" key="evo"></evo-stage>
        <explore-stage v-else-if="whatStage === 9" key="explore"></explore-stage>
        <combat-stage v-else-if="whatStage === 10" key="combatStage"></combat-stage>
        <last-stage v-else-if="whatStage === 11" key="lastStage"></last-stage>

</transition>

</template>

<script>
import IntroStage from './IntroStage.vue';
import HatchStage from './HatchStage.vue';
import StatusStage from './StatusStage.vue';
import TicTacToe from './TicTacToe.vue';
import WhackaMole from './WhackaMole.vue';
import EvoStage from './EvoStage.vue';
import WhackaMole2 from './WhackaMole2.vue';
import ExploreStage from './ExploreStage.vue';
import CombatStage from './CombatStage.vue';
import WhackaMole3 from './WhackaMole3.vue';
import LastStage from './LastStage.vue';

export default {
    components: {
        IntroStage,
        StatusStage,
        TicTacToe,
        WhackaMole,
        WhackaMole2,
        WhackaMole3,
        HatchStage,
        EvoStage,
        ExploreStage,
        CombatStage,
        LastStage
    },
    data(){
    return {
        days: 0,
        monsterName: '',
        monsterStr: 0,
        monsterHp: 0,
        monsterSpi: 0,
        monsterStage: 0,
        traits: {}
    };
},

    computed: {
        whatStage(){
            return this.$store.getters.gameStage;
        },
        whatDays(){
            return this.$store.getters.getDays;
        },
        whatTraits(){
          return this.$store.getters.getTraits;
        }
    },
    mounted() {
        this.$store.dispatch('startGame');
    }

}

</script>

<style scoped>
.stageChange-enter-active {
    transition: all 0.3s ease-in-out;
  }
  .stageChange-leave-active {
    transition: all 0.3s ease-in-out;
  }
  
  .stageChange-enter-from{
    opacity: 0;
    translate: -55em;
  }
  .stageChange-leave-to {
    opacity: 0;
    translate: 55em;
  }
  
  .stageChange-enter-to,
  .stageChange-leave-from {
    opacity: 1;
    translate: 0;
  }
</style>