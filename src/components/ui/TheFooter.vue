<template>
    <footer v-if="isLoggedIn">
        <link-button>Don8</link-button>
    </footer>
</template>

<script>
export default {
computed: {
    isLoggedIn(){
        return this.$store.getters.isAuthenticated;
    }
}

}
</script>

<style scoped>
footer{
    padding: 0.75rem;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: fixed-bottom;
    border: 1px ridge wheat;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    background-image: url('./../../assets/fondoFooter.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    
}

</style>