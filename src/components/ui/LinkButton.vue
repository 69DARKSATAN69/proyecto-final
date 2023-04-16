<template>
<router-link :to="link">
    <slot></slot>
</router-link>
</template>

<script>

export default {
    props: {

        link: {
            type: String,
            required: true,
            default: '/'
        }
    }
    
}
</script>

<style scoped>
a{
    text-decoration: none;
    padding: 0.75rem 1rem;
    font: ínherit;
    background-color: transparent;
    border: 1px hidden burlywood;
    cursor: pointer;
    border-radius: 20px;
    color: #111c1e;
    border: 5px groove transparent;

}

a:hover,
a:active,
.router-link-exact-active{
    background-color: rgb(252, 186, 92, 0.6);
    border: 5px groove burlywood;
    

}



</style>