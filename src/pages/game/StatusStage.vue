<!-- componente base del juego, desde aquí se accede a los demás y los demás traen aquí. -->

<template>
    <div class="container">
        <header>
            <h1 class="days">DAY {{ gameDays }} OF YOUR JOURNEY IN IRKALA</h1>
        </header>
        <main>


            <img src="./../../assets/stage1geon.jpg" v-if="monsterStage === 1">
            <img src="./../../assets/stage2geon.jpg" v-else-if="monsterStage === 2">
            <img src="./../../assets/stage3geon.png" v-else-if="monsterStage === 3">
            <img src="./../../assets/stage4geon.jpg" v-else-if="monsterStage === 4">

            <div class="status-control">
                <base-card>
                    <h1>{{ monsterName }} the stage {{ monsterStage }} Geon</h1>
                    <h2>Status</h2>
                    <p>Hit Points: <progress min=0 :max=monsterAttributes.hp
                            :value=currentHp></progress>{{ parseInt(currentHp) }} out of {{ monsterAttributes.hp }}</p>
                    <p>Strength: {{ monsterAttributes.str }}</p>
                    <p>Spirit: {{ monsterAttributes.spi }}</p>
                    <p>Satiation: <progress min=0 max=100 :value=hunger></progress>      {{ hunger }}% </p>
                </base-card>
                <base-card v-if="currentTraits.length > 0" id="traits-control">
                    <h1>Traits</h1>
                    <ul>
                        <li v-for="(trait, index) of currentTraits" :key="index">{{ trait[0] }}: {{ trait[1] }}</li>
                    </ul>
                </base-card>
            </div>
        </main>
        <nav>
            <base-card>
            <div class="error-control" v-if="error">{{ error }}</div>
            <h3>Energy left: {{ energy }}</h3>    
            <div class="control-menu">
              
                    <figure class="action-figure">
                        <figcaption>Feeding</figcaption>
                        <img src="./../../assets/statusmenu/eat.png" alt="feeding" @click="gameStageEat">
                        </figure>
                        <figure class="action-figure">
                            <figcaption>Playtime</figcaption>
                            <img src="./../../assets/statusmenu/play.png" alt="feeding" @click="gameStagePlay">
                            </figure>
                            <figure v-if="monsterStage > 1" class="action-figure">
                                <figcaption>Exploring</figcaption>
                                <img src="./../../assets/statusmenu/explore.png" alt="feeding" @click="exploreStage">
                                </figure>
                                <figure class="action-figure">
                                    <figcaption>Sleeping</figcaption>
                                    <img src="./../../assets/statusmenu/sleep.png" alt="feeding" @click="dormirStage">
                                    </figure>
                </div>
                <base-button mode="wallflower" @click="endNoSave">Salir del juego</base-button>
            </base-card>
        </nav>
    </div>
</template>

<script>
export default {
    //las variables son en su mayoría atributos del monstruo.
    data() {
        return {
            monsterName: '',
            error: null,
            gameDays: 0,
            monsterAttributes: { hp: 0, str: 0, spi: 0 },
            hunger: null,
            energy: 0,
            monsterStage: 0,
            currentHp: 0,
            currentTraits: [],

        };
    },
    //todos los setters son para manejar los datos del monstruo/partida en tiempo real.
    methods: {
        setDays() {
            this.gameDays = this.whatDays;
        },
        setName() {
            this.monsterName = this.whatName;
        },
        setAttributesInit() {
            this.monsterAttributes.hp = this.whatAttributes.hp;
            this.monsterAttributes.str = this.whatAttributes.str;
            this.monsterAttributes.spi = this.whatAttributes.spi;

        },
        setCurrentHp() {
            this.currentHp = this.whatCurrentHp;
        },
        setHunger() {
            this.hunger = this.whatHunger;
        },
        setEnergy() {
            this.energy = this.whatEnergy;
        },
        setMonsterStage() {
            this.monsterStage = this.whatMonsterStage;
        },
        //esto lleva al minijuego de tres en raya, si la energia es 0 o menor, da un mensaje de error.
        gameStagePlay() {
            this.error = null;
            if (!this.energy > 0) {
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            this.$store.dispatch('minigameStagePlay');

        },

        gameStageEat() {
            //esto lleva al minijuego de alimentación, también depende de la energía.
            this.error = null;
            if (!this.energy > 0) {
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            if (this.monsterStage === 1) {
                this.$store.dispatch('minigameStageEat');
            } else if (this.monsterStage === 2) {
                this.$store.dispatch('minigameStage2Eat');
            } else {
                this.$store.dispatch('minigameStage3Eat');
            }
        },


        dormirStage() {
            //regenera la salud del monstruo en función de su hambre, resetea la energía y hace las comprobaciones de si ya toca
            //evolucionar o entrar en la última fase del juego.
            this.error = null;
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Trance')) {

                this.$store.dispatch('hungryMonster', 5 * Math.floor(Math.random() * 2) + 1);
            } else {
                this.$store.dispatch('hungryMonster', 10 * Math.floor(Math.random() * 2) + 1);

            }
            this.$store.dispatch('continueDays');
            this.$store.dispatch('restartEnergy');
            this.hunger = this.whatHunger;
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Trance')) {

                this.$store.dispatch('changeCurrentHp', (this.hunger / 80) * this.monsterAttributes.hp);
            } else {
                this.$store.dispatch('changeCurrentHp', (this.hunger / 100) * this.monsterAttributes.hp);

            }
            this.setCurrentHp();
            this.energy = this.whatEnergy;
            this.gameDays = this.whatDays;
            this.gameDays === 3 ? this.$store.dispatch('enterEvo') : null;
            this.gameDays === 6 ? this.$store.dispatch('enterEvo') : null;
            this.gameDays === 9 ? this.$store.dispatch('enterEnd') : null;
        },

        exploreStage() {
            //blablabla energía. Lleva al componente de exploración.
            this.error = null;
            if (!this.energy > 0) {
                this.error = 'Sleep is healthy. You should try that sometime.'
                return;
            }
            this.$store.dispatch('lowerEnergy');
            this.$store.dispatch('enterExplore');
        },
        endNoSave() {
            //permite salir de la partida reseteando todas las variables. Es la forma segura.
            this.$store.dispatch('endGame');
            this.$router.replace('/');
        }
    },
    computed: {
        //en general utilizados para manejar los datos en tiempo real.
        whatStage() {
            return this.$store.getters.gameStage;
        },
        whatDays() {
            return this.$store.getters.getDays;
        },
        whatName() {
            return this.$store.getters.getName;
        },
        whatAttributes() {
            return this.$store.getters.getMonster.attributes;
        },
        whatHunger() {
            return this.$store.getters.getHunger;
        },
        whatEnergy() {
            return this.$store.getters.getEnergy;
        },
        whatMonsterStage() {
            return this.$store.getters.getMonsterStage;
        },
        whatCurrentHp() {
            return this.$store.getters.getCurrentHp;
        },
        whatCurrentTraits() {
            return this.$store.getters.getCurrentTraits;
        }
    },
    mounted() {
        //al monstarse este componente, setea todos los datos del juego/monstruo a los de la store.
        this.setName();
        this.setDays();
        this.setAttributesInit();
        this.setHunger();
        this.whatEnergy === null ? this.$store.dispatch('restartEnergy') : null;
        this.setEnergy();
        this.setMonsterStage();
        this.setCurrentHp();
        this.currentTraits = this.whatCurrentTraits;
    }



}
</script>

<style scoped>
main {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1em;
}

main img {
    grid-column: span 5;
    width: 90%;
    border: 1px solid burlywood;
    border-radius: 12px;
    margin: 1em;
}

.status-control {
    grid-column: span 6;
    width: 100%;
}

.control-menu{
    display: flex;
    flex-direction: row;
}
.error-control {
    padding: 2em;
}
header{
    text-align: center;
}

figcaption{
    text-align: center;
}

.action-figure img{
    width: 100%;
    cursor: pointer;
}

#traits-control{
    margin-top: 1em;
}

#traits-control ul{
    list-style: none;
}
.days{
    letter-spacing: 0.2em;
    
}

</style>