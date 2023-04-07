<template>
<header>
    <h1><link-button link="">Game</link-button></h1>
            <nav>
        <ul>
            <link-button link="/intro">This World</link-button>
            <link-button link="/features">Features</link-button>
            <link-button link="/about">About</link-button>
            <link-button link="/contact">Contact</link-button>
            <link-button link="/playthroughs">Playthroughs</link-button>
            <link-button link="/users">Users</link-button>
            <link-button link='/auth'>Log in</link-button>
        </ul>
    </nav>
    

</header>


</template>

<style scoped>
header{
    display: grid;
    grid-template: repeat(12, 1fr);
    padding: 1rem;
    background-image: url('./../../assets/fondoHeader.png');
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px ridge wheat;
    border-radius: 16px;
    margin-bottom: 4rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #111c1e;
    font-size: 1.3em;

}

h1{
    grid-column: 1 / span 3;
    font-weight: bolder;
  
}
nav{
    grid-column: 9;
}

ul
{
   
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content: space-evenly;
   


}
li{
    padding: 0.75rem 0.75rem;
  
    
}
a{
    text-decoration: none;
    color: #111c1e;
    
}


</style>

