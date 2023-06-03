<template>
    <LastStageIntro v-if="this.$store.getters.getFinishStage === 1"></LastStageIntro>
    <FinishStageIntermission1 v-else-if="this.$store.getters.getFinishStage === 2"></FinishStageIntermission1>
    <FinishStageWhack v-else-if="this.$store.getters.getFinishStage === 3"></FinishStageWhack>
    <FinishStageIntermission2 v-else-if="this.$store.getters.getFinishStage === 4"></FinishStageIntermission2>
    <FinishStageToe v-else-if="this.$store.getters.getFinishStage === 5"></FinishStageToe>
    <FinishStageIntermission3 v-else-if="this.$store.getters.getFinishStage === 6"></FinishStageIntermission3>
    <CombatStage v-else-if="this.$store.getters.getFinishStage === 7"></CombatStage>
    <FinishStageWin v-else-if="this.$store.getters.getFinishStage === 'Win'"></FinishStageWin>
    <FinishStageLoss v-else-if="this.$store.getters.getFinishStage === 'Loss'"></FinishStageLoss>

    
</template>
<script>
import LastStageIntro from './LastStageIntro.vue';
import FinishStageIntermission1 from './FinishStageIntermission1.vue';
import FinishStageWhack from './FinishStageWhack.vue';
import FinishStageIntermission2 from './FinishStageIntermission2.vue';
import FinishStageToe from './FinishStageToe.vue';
import FinishStageIntermission3 from './FinishStageIntermission3.vue';
import CombatStage from './CombatStage.vue';
import FinishStageWin from './FinishStageWin.vue';
import FinishStageLoss from './FinishStageLoss.vue';
export default {
components: {
    LastStageIntro,
    FinishStageIntermission1,
    FinishStageWhack,
    FinishStageIntermission2,
    FinishStageToe,
    FinishStageIntermission3,
    CombatStage,
    FinishStageWin,
    FinishStageLoss
},

mounted(){
    this.$store.dispatch('setFinishStage', 1);
}
}
</script>