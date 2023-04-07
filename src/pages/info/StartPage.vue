<template>
  <div class="wrapper">
  <div class="plot1">
    <base-card>
    <h3>It's a strange thing, being dead.</h3>
    <p>You see your life flashing before your eyes, all the good times, the bad times, your friends and family and even a few enemies.</p>
    <p>That's what I'd like to tell you anyway, but in reality you don't really see or remember much of all. Not because of any older memories being lost to time, or your brain's somewhat critical situation making them flicker and burn out.</p>
    <p>There simply wasn't that much to remember anyway.</p>
    <p>The end came to you like it comes to most people, in a regular day in a nondescript week. There was no gravitas to it, no skillful foreshadowing the monday before, no cryptic last conversation. It simply happened. </p>
    <p>None of that really matters now anyway. Your mind only has room for one question right now.</p>
    <h4>Just where the hell am I?</h4>
    </base-card>
    </div>
    <div class="plot2">
   
    <base-card class="irkala">
    <h3>The world of Irkala</h3>
    <p>World is a nice word. It doesn't imply astronomical realities and geometries like 'planet' does, or being yoked to a sentient civilization like 'realm'. It doesn't even imply an actual terrain composition like 'land' or 'sea' would.</p>
    <p>That's what Irkala is, in the end. A world.</p>
    <p>There is no real sense of how long it has existed or whether or not said existence is finite. There is also no real sense of life on it as we understand it.</p>
    <p>That is not to say it is a barren wasteland however, far from it. There is plenty of light, blue skies, fresh air and both vegetation and the water that sustains it. Weather changes, days become colder or warmer, rain falls, the wind blows heavily or remains a gentle breeze.</p>
    <p>Despite how familiar all of these things sound however, close observation of plants, the land, the movement of water and so on doesn't quite feel right. Like an impressionist painting, familiar shapes and forms give way under close scrutiny.</p>
    <p>Not that close scrutiny would be needed for everything, however. Take the massive creatures that grow in this place, for example.</p>
    <p>For reasons you cannot quite fathom -just having arrived here after all- this world is home to a growing menagerie of beast-like titans. Much like everything else in Irkala,
      they look similar to other animals you're familiar with from home but are just different enough to be somewhat unnerving. Mostly because of the ridiculous size they 
      seem to be able to naturally achieve.</p>
      <p>And lucky you, you stumbled into one of them just now hatching from its egg. Seems you have something (or someone) to care for.</p>
  </base-card>
  <div class="image"></div>
  </div>
  <div class="plot3">
    <div class="egg"></div>
    <base-card class="companion">
    <h3>Your new charge</h3>
<p>Look, I'll level with you. You are dead and in a strange place. You have absolutely nothing to do and no idea whether or not you can even eat or drink the water here. You might as well go ahead and take care of this thing because well, what's the worst that could happen? For all you know, dying again here would have you awake in an even worse place.</p>
<p>Or worse still, back home.</p>
<p>Caring for these things isn't particularly hard, as they'll pretty much let you know what they need when they need it, and the process of taking care of their needs is also fairly straightforward. That is not to say you can sleepwalk through it however. Good things might happen to those with an agile hand in taking care of their creature's needs.</p>
<p>Fewer bad things, at least.</p>
<p>While hanging out with your new..pet? vassal? master? let's settle for 'companion'. Anyway, you may explore different places of Irkala and meet exciting new inhabitants who are probably not all extremely violent.</p>
<p>Just do your best out there.</p>
<p>If you need help understanding what is going on and/or what you're supposed to do, check out the features section in this same page. If that doesn't help, the contact section allows you to ask admins about technical or gameplay issues. Try it out, we're nice people.</p>
<p>In order to actually play the game you need to create an account, which is done in the 'log in' section. Don't worry about your information being misused, the database is probably being wiped often.</p>

    </base-card>
  </div>
  </div>
</template>

<style scoped>

.wrapper{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
gap: 3em;
}
.plot1{
  grid-column: span 12;
}

.plot2{
  grid-column: span 12;
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 3em;
}

.plot3{
  grid-column: span 12;
  display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 3em;
}

.irkala,
.companion{
  grid-column: span 6;
}

.image{
  grid-column: span 6;
  height: 80vh;
  border: 1px groove burlywood;
  border-radius: 10px;
  background-image: url('./../../assets/irkala.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}
.egg{
  grid-column: span 6;
  height: 80vh;
  border: 1px groove burlywood;
  border-radius: 10px;
  background-image: url('./../../assets/giantEgg.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}


</style>