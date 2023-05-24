<template>
<button @click="exit">Exit</button>    
</template>

<script>
export default {
    methods: {
        exit() {
            
           this.$store.dispatch('advanceStage');

        }
    }
}
</script>