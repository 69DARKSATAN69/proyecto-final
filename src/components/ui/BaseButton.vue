<template>
<div :class='mode'>
    <slot></slot>
</div>


</template>


<script>

export default {
    props: ['mode'],


}

</script>

<style scoped>

div{
    text-align: center;
    color:  #6f5c43;
    padding: 0.75em 1.25em;
}

.flytrap{
    border: 1px solid burlywood;
    border-radius: 30%;
    color: #111c1e;
}
.flytrap:hover{
    background-color: rgb(222,184,135, 0.6);
 
}

.wallflower:hover{
    border: 1px solid burlywood;
    background-color: rgb(222,184,135, 0.2);
    color: #372e21;

}
</style>