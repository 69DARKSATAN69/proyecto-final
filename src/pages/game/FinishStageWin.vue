<!-- este componente es para ganar el juego. Te permite subir la partida a la bdd o sencillamente irte. -->
<template>
    <article>
        <header><base-card><h1>Winner!</h1></base-card></header>
        <main>
            <base-card>
           In the end, not even its most powerful champion could save {{ cityName }}.
        </base-card>
        <base-card>
        {{ monsterName }} stands triumphant over the remains of its fallen adversary. Entire city blocks were levelled in their fight and dust, granite and less inorganic matter cloud the air.
        Looking back on all your journey, it seems strange to have died, only to appear in a strange island to take care of a giant monster only to come back and help it destroy an unrelated city.
        I say help loosely, it's not like you did anything.
    </base-card>
        <base-card>
But it hardly matters. Life comes at you fast, you roll with the punches, live love laugh et cetera et cetera. Good job out there.
It's not like any of us wouldn't destroy an entire city given the chance.
Now you can retire, relax and see where things take you and {{ monsterName }}.    </base-card>
    <base-button mode="wallflower" @click="endNoSave">Finish</base-button>
    <base-button mode="flytrap" @click="endSave">Finish and upload data</base-button>
        </main>
        
    </article>
    
    </template>
    <script>
    export default {
    data(){
        return {
        monsterName: null,
        cityName: null,
        gameId: null,
        gameScore: null
        };
    },
    computed: {
        whatMonsterName(){
            return this.$store.getters.getName;
        },
        whatCityName(){
            return this.$store.getters.getLastCity;
        }
    
    },
    methods: {
        endNoSave(){
        this.$store.dispatch('endGame');
        this.$router.replace('/');
    },
    endSave(){
        this.$store.dispatch('sendGame', {gameId: this.gameId, gameScore: this.gameScore});
        this.generateId();
        this.endNoSave();
    },
    generateId(){
       
       this.gameId = null;
       this.gameId = this.$uuid.v4();
   

       },
       //esto es lo que genera el juego que va a guardar, mayormente de datos de la store.
       //en caso del jugador siendo un admin, al no tener username, se pone 'admin'.
       generateGameScore(){
        let finishedGame = {
            playthroughId: this.gameId,
            username: this.$store.getters.getUsername || 'admin',
            monster: this.$store.getters.getMonster,
            peopleEaten: this.$store.getters.getPeopleEaten,
            lastCity: this.$store.getters.getLastCity,
            combatsDone: this.$store.getters.getCombatsDone,
            combatsWon: this.$store.getters.getCombatsWon,
            gamesPlayed: this.$store.getters.getGamesPlayed,
            gamesWon: this.$store.getters.getGamesWon,
            gamesTied: this.$store.getters.getGamesTied

        }
        this.gameScore = finishedGame;
       }
    },
    mounted(){
        this.monsterName = this.whatMonsterName;
        this.cityName = this.whatCityName;
        this.generateId();
        this.generateGameScore();
    }
        
    
    
    }
    </script>