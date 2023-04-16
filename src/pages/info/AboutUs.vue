<template>
    <div class="wrapper">
    <div class="information">
<base-card>
<h1>About me</h1>
<div>
    <p>I am a newbie web developer based in northern Spain.</p>
    <p>Before I started banging my head against the glorious granite wall of web development and design, I wasted my best years slaving away for a career in Law
    which only got me a few titles and certificates worth for nothing more than being used as impromptu toilet paper during emergencies.</p>
    <p>Afterwards, pushed by a friend from university who went through a similar situation, I attended vocational training classes in web development.
    Said classes taught me all the basics in Java with a particularly amazing professor, then those same basics again in PHP plus some SASS with less amazing professors 
    and finally the basics of JavaScript and React.</p>
    <p> During all of this I learned Vue.js through a very detailed and in-depth course by Maximilian Schwarzmüller in the website Udemy.com</p>
    <p>One thing led to another and here I am, building whatever the hell this is supposed to be with Vue in the hopes of getting actually paid for my work for once in two decades.</p>
</div>
</base-card>
</div>
<div class="image">

</div>
</div>
</template>

<style scoped>
.wrapper{
    display: grid;
    grid-template: repeat(12, 1fr);
    grid-gap: 2em;
}
.information{
    grid-column: 1 / 6;
}
.image{
    grid-column-start: 7;
    height: 80vh;
    width: 40.5vw;
    background-image: url('./../../assets/probablynotme.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 20px;
    
    
    
}


</style>