<template>
<header>
    <h1><link-button link="">Game</link-button></h1>
            <nav>
        <ul>
            <li>
            <link-button link="/intro">This World</link-button>
        </li>
        <li>
            <link-button link="/features" v-if="!isAdministrator">Features</link-button>
        </li>
            <li>
            <link-button link="/about" v-if="!isAdministrator">About</link-button>
        </li>
            <li>
            <link-button link="/contact" v-if="!isAdministrator">Contact</link-button>
        </li>
            <li>
            <link-button link="/playthroughs">Playthroughs</link-button>
        </li>
            <li>
            <link-button link="/users" v-if="isAdministrator">Users</link-button>
        </li>  <li>
            <link-button link='/auth' v-if="!isLoggedIn">Log in</link-button>
        </li>
        <li>
            <base-button mode="flytrap" v-if="isLoggedIn" @click="logOut">Log out</base-button>
        </li>
        </ul>
    </nav>
    

</header>


</template>


<script>
export default {
computed: {
    isLoggedIn(){
        return this.$store.getters.isAuthenticated;
    },
    isAdministrator(){
        return this.$store.getters.isAdmin;
    }
},
methods:{
    logOut(){
        this.$store.dispatch('logout');
    }
}

}
</script>


<style scoped>
header{
    display: grid;
    grid-template: repeat(12, 1fr);
    padding: 1rem;
    background-image: url('./../../assets/fondoHeader.png');
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px ridge wheat;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
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
    padding: 0.75rem;
  
    
}
a{
    text-decoration: none;
    color: #111c1e;
    
}


</style>

