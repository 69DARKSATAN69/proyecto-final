<template>
    <section>
        <header><h1>Playthroughs</h1></header>
        <base-button mode="wallflower" @click="getPlaythroughs">Refresh</base-button>
        <ul v-if="allPlaythroughs && !isLoading">
            <li v-for="playt in allPlaythroughs" :key="playt">
                <article>
                    <base-card>
                    <header><h2>{{playt.monster.name}} the stage {{ playt.monster.stage }} {{playt.monster.type}}</h2></header>
                    <p>Player name: {{playt.username}}</p>
                    <p>City destroyed: {{playt.lastCity}}</p>
                    <div>Final Stats:</div>
                    <ul class="statsLi"><li class="statsLi">Health Points: {{playt.monster.attributes.hp}}</li>
                    <li class="statsLi">Strength: {{playt.monster.attributes.str}}</li>
                <li class="statsLi">Spirit: {{playt.monster.attributes.spi}}</li></ul>
                <p>People eaten: {{playt.peopleEaten}}</p>
                <p>Game score: Won {{playt.gamesWon}} out of {{playt.gamesPlayed}} with {{playt.gamesTied ? playt.gamesTied : 0}} ties.</p>
                <p>Combat score: Won {{playt.combatsWon}} out of {{playt.combatsDone}} combats.</p>
                <base-button v-if="this.$store.getters.isAdmin" mode="flytrap" @click="deletePlaythrough(playt.playthroughId)">Delete</base-button>
            </base-card>
                </article>
               
            </li>
        </ul>
        <div v-if="(!allPlaythroughs || allPlaythroughs.length < 1) && !isLoading">
            <base-card>
            <p>No playthroughs have been posted.</p>
            </base-card>
        </div>
        <div class="loading-control" v-if="isLoading">
            <p>Loading...</p>
        </div>
        <div class="error-control" v-if="!!error">
            <p>{{ error }}</p>
        </div>
        <div class="success-control" v-if="success">
            <p>Playthrough deleted successfully!</p>
        </div>

    </section>
</template>

<script>
export default {
    data() {
        return {
            allPlaythroughs: null,
            isLoading: false,
            error: null,
            success: false
        };
    },

    methods: {
        async getPlaythroughs() {
            this.error = null;
            this.isLoading = true;
            try {
                const response = await fetch('https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/playthroughs.json');
                const data = await response.json();
                this.allPlaythroughs = data;
                console.log('la respuesta es', response);
                console.log('el data es:', data);
            } catch (err) {
                this.error = err.message || "Failure to comply. Database couldn't be reached for playthroughs";

            } finally {
                this.isLoading = false;
            }
        },
        async deletePlaythrough(playthroughId) {
            this.success = false;
            this.error = null;
            this.isLoading = true;
            let response;
            try {
                response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/playthroughs/${playthroughId}.json`, { method: 'DELETE' });
                const data = await response.json();
                console.log(data);
            } catch (err) {
                this.error = err.message || 'Failure to comply. The selected playthrough has probably already been deleted.';
            } finally {
                if (response.ok) {
                    this.success = true;
                    this.getPlaythroughs();
      
                }
                this.isLoading = false;
            }

        }

    },
    async mounted() {
        this.getPlaythroughs();
    }


}
</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 0;
}

li {
    width: 100%;
    margin: 3em 0;
}

.statsLi{
    margin: 0;
}

.button-control {
    margin: auto;
    margin-top: 2em;

    padding: 0.25em;
    width: 50%;



}
</style>