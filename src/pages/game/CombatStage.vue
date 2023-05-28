<template>
    <transition name="combatChange" mode="out-in">
    <section v-if="!whoWon">
        <header>
            <h1>Fight it out!</h1>
        </header>

        <div class="creature-control">
            <figure>
                <figcaption>{{ monsterName }}</figcaption>
                <img src="./../../assets/stage2geon.jpg">
            </figure>
            <progress class="progress" id="monster-progress" min=0 :max=monsterAttributes.hp
                :value=monsterCurrentHP></progress>
        </div>
        <div class="enemy-control">
            <figure>
                <figcaption>{{ enemyName }}</figcaption>
                <img src="./../../assets/forestenemy1.png" v-if="enemyId === 1">
                <img src="./../../assets/forestenemy2.png" v-else-if="enemyId === 2">
                <img src="./../../assets/lakeenemy1.png" v-else-if="enemyId === 3">
                <img src="./../../assets/lakeenemy2.png" v-else-if="enemyId === 4">
                <img src="./../../assets/mountainenemy1.png" v-else-if="enemyId === 5">
                <img src="./../../assets/mountainenemy2.png" v-else-if="enemyId === 6">
                <img src="./../../assets/stage1geon.jpg" v-else>
            </figure>
            <progress class="progress" id="enemy-progress" min=0 :max=enemyAttributes.hp :value=enemyCurrentHP></progress>
        </div>
        <base-card class="button-control">
            <base-button mode="flytrap" @click="basicAttack()">Golpear</base-button>
            <base-button mode="flytrap" @click="regeneration()">Regenerar</base-button>
            <base-button mode="flytrap" @click="specialAttack()">Ataque Espiritual</base-button>
        </base-card>
    </section>
    <base-card v-else-if="whoWon === 'Monster'">
        <h1>YOU ARE WINNAR</h1>
        <base-button mode="wallflower" @click="exit">Leave</base-button>
    </base-card>
    <base-card v-else-if="whoWon === 'Enemy'">
        <h1>You and your friends are dead. Game over.</h1>
        <base-button mode="wallflower" @click="exit">Leave</base-button>
    </base-card>
</transition>
</template>

<script>
export default {

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
            whoWon: ''
        };
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
        whatEnemyName(){
            return this.$store.getters.getEnemy.name;
        },
        whatEnemyAttributes(){
            return this.$store.getters.getEnemy.attributes;
        },
        whatEnemyId(){
            return this.$store.getters.getEnemy.id;
        }
        
    },

    methods: {
        calculateBasicAttack(fighterAttributes) {
            //modificar esto para traits
            const min = -5;
            const max = 15;
            return fighterAttributes.str + (0.1 * fighterAttributes.spi) + Math.floor(Math.random() * (max - min + 1)) + min;
        },

        basicAttack() {

            console.log(`before attack: ${this.enemyCurrentHP}`);
            this.enemyCurrentHP = this.enemyCurrentHP - this.calculateBasicAttack(this.monsterAttributes) < 0 ? 0 : this.enemyCurrentHP - this.calculateBasicAttack(this.monsterAttributes);
            this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);
            console.log(`after attack: ${this.enemyCurrentHP}`);
        },

        calculateHealing(fighterAttributes) {
            //modificar esto para traits
            const min = -5;
            const max = 15;
            return fighterAttributes.spi * 0.5 + Math.floor(Math.random() * (max - min + 1)) + min;
        },

        regeneration() {
            this.monsterCurrentHP = this.monsterCurrentHP + this.calculateHealing(this.monsterAttributes) > this.monsterAttributes.hp ? this.monsterAttributes.hp : this.monsterCurrentHP + this.calculateHealing(this.monsterAttributes);
            this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);
        },

        calculateSpAttack(fighterAttributes) {
            const min = 1;
            const max = 15;
            return fighterAttributes.spi * 0.6 + Math.floor(Math.random() * (max - min + 1)) + min;
        },

        specialAttack() {
            console.log(`before spattack: ${this.enemyCurrentHP}`);
            this.enemyCurrentHP = this.enemyCurrentHP - this.calculateSpAttack(this.monsterAttributes) < 0 ? 0 : this.enemyCurrentHP - this.calculateSpAttack(this.monsterAttributes);
            this.monsterCurrentHP = this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes) < 0 ? 0 : this.monsterCurrentHP - this.calculateBasicAttack(this.enemyAttributes);
            console.log(`after spattack: ${this.enemyCurrentHP}`);
        },
        setGameStage(){
            this.gameStage = this.whatStage;
            console.log('the store stores this stage: ', this.whatStage);
        },

        setName() {
            this.monsterName = this.whatName;
        },
        setEnemyName(){
            this.enemyName = this.whatEnemyName;
        },
        setEnemyAttributes(){
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
        setEnemyId(){
            this.enemyId = this.whatEnemyId;
        },

        exit() {
            this.$store.dispatch('changeCurrentHp', this.monsterCurrentHP);
            this.$store.dispatch('resetEnemy');
    


            if (this.whoWon === 'Monster') {
                this.$store.dispatch('combatEnd', 20);
                console.log(this.whatAttributes.str);
                this.$store.dispatch('advanceStage');
                

            } else {
                this.$store.dispatch('combatEnd', 5);
                console.log(this.whatAttributes.str);
                this.$store.dispatch('advanceStage');



            }
            // this.$store.dispatch('advanceStage');
            console.log(this.$store.getters.gameStage);
        }


    },
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

    mounted() {
        this.setName();
        this.setAttributesInit();
        this.setCurrentHp();
        this.setMonsterStage();
        this.setGameStage();
        this.setEnemyName();
        this.setEnemyAttributes();
        this.setEnemyId();
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


.combatChange-enter-active {
    transition: all 0.3s ease-in-out;
  }
  .combatChange-leave-active {
    transition: all 0.3s ease-in-out;
  }
  
  .combatChange-enter-from{
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
</style>