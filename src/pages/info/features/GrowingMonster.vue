<template>
<div class="wrapper">
    <div class="intro">
<base-card>
<h1>A Growing Monster</h1>
<p>
Taking care of your companion is, of course, the meat and potatoes of what you will be doing in this game. That is not to say it is pointless busywork however, depending on 
what you prioritize and how adept you are at the diverse tasks and chores put in front of you, the monster will change.</p>
<p>As your monster grows, you may also unlock new activities for it to partake in or find that older ones have changed to accomodate for its growing size. Moreover, its changing physiology may also affect how it feeds or moves.</p>
<p>As this is just a prototype, don't expect massively intertwining branches of evolution paths, but do expect something showing off the system.</p>
<p>When I started envisioning this project, I wanted to make three different creatures with at least two different evolution paths each, but since I'm not exactly made of free time nor am I getting paid for this, there will be only one creature with two paths for it.</p>
</base-card>
</div>
<div class="evo1"></div>
<div class="evo1explanation">
<base-card>
<p>The first path is based on the regular giant dinosaur kaijus, who are on turn based on Godzilla. It will emphasize both defense and special skills.</p>
</base-card>
<div class="evo2explanation">
    <base-card>
    <p>The second path is based on hydra-styled kaijus, whose grandaddy is King Ghidorah. It will emphasize offense at the cost of defense.
         Battles may be less interactive than its counterpart, but prior planning and preparation will become more rewarding.</p>
    </base-card>
    </div>
</div>
<div class="evo2"></div>

</div>


</template>

<style scoped>
.wrapper{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1em;
}
.intro{
    grid-column: span 12;
}
.evo1{
    grid-column: span 3;
    height: 80vh;

    background-image: url('./../../../assets/imageFirstEvo.png');
    background-repeat: no-repeat;
    background-size: contain;

}
.evo1explanation{
    grid-column: span 6;
    
}
.evo2{
    grid-column: span 3;
    height: 80vh;
    background-image: url('./../../../assets/evo2.jpg');
    background-repeat: no-repeat;
    background-size: contain;

}
.evo2explanation{
    grid-column: span 4;
    margin-top: 5em;
}
</style>