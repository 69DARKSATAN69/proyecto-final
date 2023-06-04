<template>
<base-card>
<h1>You and your friends are dead. Game over.</h1>
<base-button mode="wallflower" @click="endNoSave">Leave</base-button>
</base-card>
</template>
<script>
export default {
methods: {
    endNoSave(){
        this.$store.dispatch('endGame');
        this.$router.replace('/');

    }
}
}
</script>

