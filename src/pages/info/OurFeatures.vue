<template>
<div class="wrapper">
    <div class="explanations">
<base-card>

<p>As this is little more than a prototype made to just barely pass a terrible class and get a title, don't expect much in the way of a feature-rich environment or like, finished or balanced mechanics.</p>
<p>What you can expect however, is that just about everything you find in this page took way too many hours of work.</p>
<p>But hey, it's how I like it.</p>
<h1>Features:</h1>
<ul class="lista">
    <li><link-button link="/features/1">A growing monster</link-button></li>
    <li><link-button link="/features/2">Combat</link-button></li>
    <li><link-button link="/features/3">RPG elements</link-button></li>
    <li><link-button link="/features/4">Public ranking</link-button></li>
    <li><link-button link="/features/5">Minigames</link-button></li>
</ul>

</base-card>
</div>
<router-view></router-view>
</div>

</template>

<style scoped>
h1{
    text-align: center;
}
ul{
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    list-style: none;
}
li{
    text-decoration: none;
    padding: 1em;
    
}
.explanations{
    margin-bottom: 2em;
}
</style>