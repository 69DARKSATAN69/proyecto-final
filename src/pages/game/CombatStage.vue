<!-- //este componente lleva el minijuego de combate. -->
<template>
    <transition name="combatChange" mode="out-in">
        <section v-if="!whoWon">
            <header>
                <h1>Fight it out!</h1>
            </header>

            <div class="creature-control">
                <figure class="you-control" ref="youControl">
                    <figcaption>{{ monsterName }}</figcaption>
                    <img ref="youControl" class="you-control" src="./../../assets/stage2geon.jpg" v-if="monsterStage === 2">
                    <img ref="youControl" class="you-control" src="./../../assets/stage3geon.png"
                        v-else-if="monsterStage === 3">
                    <img  class="you-control" src="./../../assets/stage4geon.jpg" v-else>
                    <div ref="beam" class="beam"></div>
                </figure>
                <progress class="progress" id="monster-progress" min=0 :max=monsterAttributes.hp
                    :value=monsterCurrentHP></progress>
            </div>
            <div class="enemy-control">
                <figure ref="enemyAvatar">
                    <figcaption>{{ enemyName }}</figcaption>
                    <img class="enemy-control" src="./../../assets/forestenemy1.png" v-if="enemyId === 1 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/forestenemy2.png" v-else-if="enemyId === 2 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/lakeenemy1.png" v-else-if="enemyId === 3 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/lakeenemy2.png" v-else-if="enemyId === 4 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/mountainenemy1.png" v-else-if="enemyId === 5 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/mountainenemy2.png" v-else-if="enemyId === 6 && !this.$store.getters.getLastCity">
                    <img class="enemy-control" src="./../../assets/finish/enemigoOviedo.png" v-else-if="this.$store.getters.getLastCity === 'Oviedo'">
                    <img class="enemy-control" src="./../../assets/finish/enemigoCanberra.png" v-else-if="this.$store.getters.getLastCity === 'Canberra'">
                    <img class="enemy-control" src="./../../assets/finish/enemigoUlaanbaatar.png" v-else-if="this.$store.getters.getLastCity === 'Ulaanbaatar'">
                    <img class="enemy-control" src="./../../assets/stage1geon.jpg" v-else>
                </figure>
                <progress class="progress" id="enemy-progress" min=0 :max=enemyAttributes.hp
                    :value=enemyCurrentHP></progress>
              
            </div>
            <base-card class="button-control">
                <base-button mode="flytrap" @click="basicAttack()">Golpear</base-button>
                <base-button mode="flytrap" @click="regeneration()">Regenerar</base-button>
                <base-button mode="flytrap" @click="specialAttack()">Ataque Espiritual</base-button>
            </base-card>
        </section>
        <base-card v-else-if="whoWon === 'Monster'">
        <article>
            <header>
        <h1>Victory</h1>
    </header>
    <main class="winner-main"><p>After an arduous battle, {{monsterName}} emerges victorious against the nefarious {{enemyName}}.</p>
    <p>The strain of the battle causes {{monsterName}}'s muscles to swell!</p></main>
            <base-button mode="wallflower" @click="exit">Back to your camp</base-button>
        </article> 
        </base-card>
        <base-card v-else-if="whoWon === 'Enemy'">
        <article >
            <header>
                <h1>Defeat!</h1>
            </header>
            <main class="defeat-main">
                <p>Despite its best efforts, {{monsterName}} was defeated by {{enemyName}}'s overwhelming assault.</p>
                <p>{{monsterName}} nonetheless caused enough damage to {{enemyName}} to make it wary of giving chase.</p>
                <p>The sting of defeat and the strain of the battle strengthen {{monsterName}}'s resolve and muscles both.</p>
            </main>
            <base-button mode="wallflower" @click="exit">Leave</base-button>

        </article>
        </base-card>
    </transition>
</template>

<script>
export default {
//guarda datos referentes a status y atributos tanto del enemigo como del propio monstruo.
    data() {
        return {
            gameStage: 0,
            monsterCurrentHP: 1,
            enemyCurrentHP: 200,
            monsterStage: 2,
            currentTurn: 0,
            monsterAttributes: { hp: 100, str: 1, spi: 1 },
            enemyName: 'Mokujin',
            enemyAttributes: { hp: 200, str: 30, spi: 100 },
            enemyId: null,
            monsterName: '',
            error: null,
            whoWon: '',
            playerAvatar: null,
            enemyAvatar: null,
            beam: null,
        };
        //los datos computados sacan los datos del monstruo de la store de juego y del enemigo de la base de datos.
    },
    computed: {
        whatStage() {
            return this.$store.getters.gameStage;
        },
        whatName() {
            return this.$store.getters.getName;
        },
        whatAttributes() {
            return this.$store.getters.getMonster.attributes;
        },
        whatMonsterStage() {
            return this.$store.getters.getMonsterStage;
        },
        whatCurrentHp() {
            return this.$store.getters.getCurrentHp;
        },
        whatEnemyName() {
            return this.$store.getters.getEnemy.name;
        },
        whatEnemyAttributes() {
            return this.$store.getters.getEnemy.attributes;
        },
        whatEnemyId() {
            return this.$store.getters.getEnemy.id;
        }

    },

    methods: {
        //añade una clase para hacer una animación sencilla cuando el combatiente es golpeado.
        giveOnHit(fighter) {
            fighter.classList.add('being-hit');
            setTimeout(() => {
                fighter.classList.remove('being-hit');
            }, 600);
        },

        //calcula el ataque basico, del botón 'attack'. Utiliza mayormente fuerza y un poco de espíritu, pero varía
        //en función del stage del monstruo y de sus traits.
        calculateBasicAttack(fighterAttributes, monsterStage) {
            if (!monsterStage || monsterStage === 2) {
                const min = -5;
                const max = 15;
                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Brawler')) {
                    return fighterAttributes.str + (0.1 * fighterAttributes.spi) + Math.floor(Math.random() * (max - min + 1)) + min;
                } else {
                    return (0.8 * fighterAttributes.str) + (0.1 * fighterAttributes.spi) + Math.floor(Math.random() * (max - min + 1)) + min;

                }
            } else if (monsterStage === 3) {
                const min = -10;
                const max = 20;
                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Brawler')) {
                    return (0.8 * fighterAttributes.str) + (0.3 * fighterAttributes.spi) + Math.floor(Math.random() * (max - min + 1)) + min;
                } else {
                    return (0.6 * fighterAttributes.str) + (0.3 * fighterAttributes.spi) + Math.floor(Math.random() * (max - min + 1)) + min;

                }
            } else if (monsterStage === 4) {
                const min = -10;
                const max = 20;
                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Brawler')) {

                    return (fighterAttributes.str * 1.3) + Math.floor(Math.random() * (max - min + 1)) + min;
                } else {
                    return (fighterAttributes.str * 1.1) + Math.floor(Math.random() * (max - min + 1)) + min;

                }
            }
        },
        //función manejadora del ataque básico. añade y quita las animaciones pertinentes y utiliza la función de cálculo del daño
        //para restar vida al oponente. Acto seguido el oponente contraataca y el monstruo recibe daño.
        basicAttack() {
            this.playerAvatar.classList.add('player-attack');
            setTimeout(() => {
                this.playerAvatar.classList.remove('player-attack');
            }, 600);
            this.giveOnHit(this.enemyAvatar);
            this.enemyCurrentHP = this.enemyCurrentHP - this.calculateBasicAttack(this.monsterAttributes, this.monsterStage) < 0 ? 0 : this.enemyCurrentHP - this.calculateBasicAttack(this.monsterAttributes);
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Stone Scales')) {

                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8 < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8;
            } else {
                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);

            }

        },
        //calcula la curación resultante del botón regenerate. Utiliza espíritu.
        calculateHealing(fighterAttributes) {
            const min = -5;
            const max = 15;
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Wildfire')) {
                return fighterAttributes.spi * 0.7 + Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
                return fighterAttributes.spi * 0.5 + Math.floor(Math.random() * (max - min + 1)) + min;

            }
        },
        //manejador de regenerate, añade y quita animación y aumenta vida según el anterior cálculo. El enemigo ataca después.
        regeneration() {
            this.playerAvatar.classList.add('player-regen');
            setTimeout(() => {
                this.playerAvatar.classList.remove('player-regen');
            }, 600);
            this.monsterCurrentHP = this.monsterCurrentHP + this.calculateHealing(this.monsterAttributes) > this.monsterAttributes.hp ? this.monsterAttributes.hp : this.monsterCurrentHP + this.calculateHealing(this.monsterAttributes);
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Stone Scales')) {

                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8 < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8;
            } else {
                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);
            }
        },
        //calcula el daño del ataque espiritual, como su nombre indica basado en espíritu.
        calculateSpAttack(fighterAttributes, monsterStage) {
            if (!monsterStage || monsterStage === 2 || monsterStage === 4) {
                const min = 1;
                const max = 15;
                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Wildfire')) {
                    return fighterAttributes.spi * 0.7 + Math.floor(Math.random() * (max - min + 1)) + min;
                } else {
                    return fighterAttributes.spi * 0.5 + Math.floor(Math.random() * (max - min + 1)) + min;

                }
            } else if (monsterStage === 3) {
                const min = 5;
                const max = 20;
                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Wildfire')) {
                    return fighterAttributes.spi * 1.1 + Math.floor(Math.random() * (max - min + 1)) + min;
                } else {
                    return fighterAttributes.spi * 0.9 + Math.floor(Math.random() * (max - min + 1)) + min;

                }
            }

        },
        //manejador del ataque espiritual. Similar a los otros manejadores.
        specialAttack() {
            this.playerAvatar.classList.add('player-power-up');
            setTimeout(() => {
                this.playerAvatar.classList.remove('player-power-up');
            }, 600);
            this.beam.classList.add('beam-throw');
            setTimeout(() => {
                this.beam.classList.remove('beam-throw');
            }, 600);
            this.giveOnHit(this.enemyAvatar);
            this.enemyCurrentHP = this.enemyCurrentHP - this.calculateSpAttack(this.monsterAttributes, this.monsterStage) < 0 ? 0 : this.enemyCurrentHP - this.calculateSpAttack(this.monsterAttributes);
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Stone Scales')) {

                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8 < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) * 0.8;
            } else {
                this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);
            }
        },
        //estos siguientes métodos son para setear bien los datos al montarse este componente.
        setGameStage() {
            this.gameStage = this.whatStage;
        },

        setName() {
            this.monsterName = this.whatName;
        },
        setEnemyName() {
            this.enemyName = this.whatEnemyName;
        },
        setEnemyAttributes() {
            this.enemyAttributes = this.whatEnemyAttributes;
        },
        setAttributesInit() {
            this.monsterAttributes.hp = this.whatAttributes.hp;
            this.monsterAttributes.str = this.whatAttributes.str;
            this.monsterAttributes.spi = this.whatAttributes.spi;

        },
        setCurrentHp() {
            this.monsterCurrentHP = this.whatCurrentHp;
        },
        setMonsterStage() {
            this.monsterStage = this.whatMonsterStage;
        },
        setEnemyId() {
            this.enemyId = this.whatEnemyId;
        },

        //función manejadora de final de combate. Aumenta fuerza al ganar/perder, más si ganas, aumenta el número de combates
        //(y victorias si ganas) y devuelve al componente status si estabas explorando o lleva al final del juego si estabas en el último
        //combate.
        exit() {
        if(!this.$store.getters.getLastCity){
            this.$store.dispatch('changeCurrentHp', this.monsterCurrentHP);
            this.$store.dispatch('resetEnemy');
            if (this.whoWon === 'Monster') {
                this.$store.dispatch('setCombatsWon', this.$store.getters.getCombatsWon+1);
                this.$store.dispatch('setCombatsDone', this.$store.getters.getCombatsDone+1);


                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Herculean')) {
                    this.$store.dispatch('combatEnd', 30);
                } else {
                    this.$store.dispatch('combatEnd', 20);
                    console.log(this.whatAttributes.str);
                    this.$store.dispatch('advanceStage');
                }

            } else {
                this.$store.dispatch('setCombatsDone', this.$store.getters.getCombatsDone+1);

                if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Herculean')) {
                    this.$store.dispatch('combatEnd', 10);
                } else {
                    this.$store.dispatch('combatEnd', 5);
                    console.log(this.whatAttributes.str);
                    this.$store.dispatch('advanceStage');
                }


            }
    
            this.$store.dispatch('advanceStage');
        }else{
            if (this.whoWon === 'Monster') {
                this.$store.dispatch('setCombatsWon', this.$store.getters.getCombatsWon+1);
                this.$store.dispatch('setCombatsDone', this.$store.getters.getCombatsDone+1);
                this.$store.dispatch('setFinishStage', 'Win');

            }else{
                this.$store.dispatch('setCombatsDone', this.$store.getters.getCombatsDone+1);
                this.$store.dispatch('setFinishStage', 'Loss');
            }
        }
        }


    },
    //estos disparadores dan la victoria al monstruo o al enemigo cuando uno de los combatientes llega a 0 o menos de vida.
    watch: {
        enemyCurrentHP(newValue) {
            if (newValue <= 0) {
                this.whoWon = 'Monster';
            }
        },
        monsterCurrentHP(newValue) {
            if (newValue <= 0) {
                this.whoWon = 'Enemy';
            }
        }
    },

    //cuando se monta el componente, setea todo lo relevante.
    mounted() {
        this.playerAvatar = this.$refs.youControl;
        this.enemyAvatar = this.$refs.enemyAvatar;
        this.beam = this.$refs.beam;
        this.setName();
        this.setAttributesInit();
        this.setCurrentHp();
        this.setMonsterStage();
        this.setGameStage();
        this.setEnemyName();
        this.setEnemyAttributes();
        this.setEnemyId();
        this.enemyCurrentHP = this.enemyAttributes.hp;
    }
}
</script>

<style scoped>
section {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}

header {
    grid-column: 4 / 9;
    text-align: center;
}

header h1 {
    padding: 1em;
}

.creature-control {
    grid-column: 1 / 5;
    justify-items: center;
    align-items: center;

}

.enemy-control {
    grid-column: 8 / 12;
    text-align: center;
}

.progress {
    width: 100%;
    height: 2em;
    margin-left: 2.5em;

}

.button-control {
    margin-top: 2em;
    padding: 2em;
    grid-column: span 12;
}


figure {
    width: 100%;
}

figure img {
    width: 100%;
}

.winner-main, .defeat-main{
    text-align:center;
    padding: 1em;
}

.combatChange-enter-active {
    transition: all 0.3s ease-in-out;
}

.combatChange-leave-active {
    transition: all 0.3s ease-in-out;
}

.combatChange-enter-from {
    opacity: 0;
    transform: translateY(-55em);
}

.combatChange-leave-to {
    opacity: 0;
    transform: translateY(-55em);
}

.combatChange-enter-to,
.combatChange-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.you-control {
    position: relative;
}

.player-attack {
    animation: attacking 0.6s ease-in;
}

.player-regen {
    animation: regenerating 0.6s ease-out;
}

.being-hit {
    animation: beingHit 0.6s ease-out;
}

.player-power-up {
    animation: beamPowerUp 0.6s ease-in;
}

.beam {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 0;
    height: 10px;
    background-color: greenyellow;
    transform-origin: left center;


}

.beam-throw {
    animation: beamAnimation 0.6s ease-in;
}




@keyframes attacking {
    from {
        left: 0;
        transform: scale(1);
    }

    10% {
        left: -10%;
    }

    15% {
        left: -10%;
    }

    35% {
        transform: scale(1.1);
    }

    55% {
        left: 70%;
    }

    to {
        left: 0;
        transform: scale(1);
    }
}

@keyframes beingHit {
    from {
        opacity: 1;
    }

    74% {
        opacity: 1;
    }

    75% {
        opacity: 0;
    }

    80% {
        opacity: 1
    }

    85% {
        opacity: 0;
    }

    90% {
        opacity: 1;
    }

    95% {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes regenerating {
    from {
        filter: brightness(100%);
    }

    20% {
        filter: brightness(60%);
    }

    40% {
        filter: brightness(200%);
    }

    60% {
        filter: brightness(400%);
    }

    80% {
        filter: brightness(200%);
    }

    to {
        filter: brightness(100%);
    }

}

@keyframes beamPowerUp {
    from {
        filter: brightness(100%);
    }

    20% {
        filter: brightness(200%);
    }

    40% {
        filter: brightness(400%);
    }

    60% {
        filter: brightness(700%);
    }

    80% {
        filter: brightness(100000%);
    }

    to {
        filter: brightness(100%);
    }

}


@keyframes beamAnimation {
    from {
        width: 0;
        opacity: 0;
        height: 150px;
    }

    35% {
        width: 250px;
        opacity: 0.6;
        height: 150px;
    }

    55% {
        width: 450px;
        opacity: 0.8;
        height: 150px;
    }

    80% {
        height: 150px;
        width: 450px;
        opacity: 1;
    }

    95% {
        width: 0;
        opacity: 0;
    }
}
</style>