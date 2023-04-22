<template>
  <the-header></the-header>
<router-view></router-view>
<the-footer></the-footer>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
body{
  background-image: url('./assets/fondoTodo.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}
#app{
font-family: Avenir, Helvetica, Arial, sans-serif;
color:#111c1e;
margin-top:1em;
margin-left: 1em;
margin-right: 1em;

}

.error-control{
  margin: 3vh 0;
  text-align: center;
  color: crimson;
  border: 5px groove crimson;
}

.success-control{
  margin: 3vh 0;
  text-align: center;
  border: 1px solid bisque;
  color: bisque;
}
</style>
