<!-- igual que los últimos dos componentes, menor intervalo, mayor tablero. -->

<template>
    <main class="contenedor">
        <div class="error-handling"></div>
        <div class="tictactoe-control">
            <table>
                <tr id="row1">
                    <td id="cell1" class="cell"></td>
                    <td id="cell2" class="cell"></td>
                    <td id="cell3" class="cell"></td>
                    <td id="cell4" class="cell"></td>
                    <td id="cell5" class="cell"></td>

                </tr>
                <tr id="row2">
                    <td id="cell6" class="cell"></td>
                    <td id="cell7" class="cell"></td>
                    <td id="cell8" class="cell"></td>
                    <td id="cell9" class="cell"></td>
                    <td id="cell10" class="cell"></td>
                </tr>
                <tr id="row3">
                    <td id="cell11" class="cell"></td>
                    <td id="cell12" class="cell"></td>
                    <td id="cell13" class="cell"></td>
                    <td id="cell14" class="cell"></td>
                    <td id="cell15" class="cell"></td>
                </tr>
            </table>
            <div class="eat-control">{{ correctClick }} personas devoradas</div>
            <div class="controls-panel">
                <div class="button-control">
                    <button class="boton-exit" @click="exit">Exit</button>
                </div>
            </div>
        </div>
    </main>
</template>
    
<script>
export default {
    data() {
        return {
            cell1: null,
            cell2: null,
            cell3: null,
            cell4: null,
            cell5: null,
            cell6: null,
            cell7: null,
            cell8: null,
            cell9: null,
            cell10: null,
            cell11: null,
            cell12: null,
            cell13: null,
            cell14: null,
            cell15: null,
            randomNo: null,
            randomNo2: null,
            randomClass: null,
            correctClick: 0,
        };
    },
    computed: {
        whatMonsterStage() {
            return this.$store.getters.getMonsterStage;
        }
    },
    methods: {

        reInit() {
            document.querySelector('.boton-exit').disabled = true;
            let intervalId = setInterval(this.handleRandomizer, 550);
            setTimeout(() => {
                clearInterval(intervalId)
                document.querySelector('.boton-exit').disabled = false;
            }, 10000);
        },

        handleRandomizer() {
            if (!this.randomNo) {
                this.randomNo = Math.floor(Math.random() * 15) + 1;
            } else {
                document.querySelector(`#cell${this.randomNo}`).removeEventListener('click', this.handleClick);
                document.querySelector(`#cell${this.randomNo}`).classList.remove(`InUse${this.randomClass}`);
                this.randomNo = Math.floor(Math.random() * 15) + 1;
                this.randomClass = Math.floor(Math.random() * 7) + 1;

            }
            let randomCell = document.querySelector(`#cell${this.randomNo}`);
            randomCell.addEventListener('click', this.handleClick);
            randomCell.classList.add(`InUse${this.randomClass}`);
        },


        handleClick(event) {
            this.correctClick++;
            event.target.classList.add('goodClick', 'goodClick-small');
            setTimeout(() => {
                event.target.classList.remove('goodClick', 'goodClick-small', `InUse${this.randomClass}`);
            }, 200);
            event.target.removeEventListener('click', this.handleClick);
        },

        exit() {
            if (this.$store.getters.getCurrentTraits.some(([traitName]) => traitName === 'Gourmet')) {
                this.$store.dispatch('stage1FeedHp', this.correctClick * 2);
                this.$store.dispatch('feedingMonster', this.correctClick * 3);
            } else {
                this.$store.dispatch('stage1FeedHp', this.correctClick);
                this.$store.dispatch('feedingMonster', this.correctClick * 2);
            }
            this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten + this.correctClick);
            this.$store.dispatch('advanceStage');

        }
    },





    mounted() {
        this.cell1 = document.querySelector('#cell1'),
            this.cell2 = document.querySelector('#cell2'),
            this.cell3 = document.querySelector('#cell3'),
            this.cell4 = document.querySelector('#cell4'),
            this.cell5 = document.querySelector('#cell5'),
            this.cell6 = document.querySelector('#cell6'),
            this.cell7 = document.querySelector('#cell7'),
            this.cell8 = document.querySelector('#cell8'),
            this.cell9 = document.querySelector('#cell9'),
            this.cell10 = document.querySelector('#cell10'),
            this.cell11 = document.querySelector('#cell11'),
            this.cell12 = document.querySelector('#cell12'),
            this.cell13 = document.querySelector('#cell13'),
            this.cell14 = document.querySelector('#cell14'),
            this.cell15 = document.querySelector('#cell15'),
        this.reInit();
    }


}
</script>
    
<style scoped>
.InUse1 {
    background-image: url('./../../assets/whack/window1.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse2 {
    background-image: url('./../../assets/whack/window2.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse3 {
    background-image: url('./../../assets/whack/window3.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse4 {
    background-image: url('./../../assets/whack/window4.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse5 {
    background-image: url('./../../assets/whack/window5.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse6 {
    background-image: url('./../../assets/whack/window6.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.InUse7 {
    background-image: url('./../../assets/whack/window7.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.goodClick {
    transform: scale(1);
    transition: transform 0.2s ease;
}

.goodClick-small {
    transform: scale(0);
}

.error-handling {
    border: 1px solid crimson;
    color: crimson;
    display: none;
    font-size: x-large;
    padding: 1em;
}

.contenedor {
    margin: 0 auto;
    width: 100%;
}

table {
    border: 1px solid black;
    width: 100%;
}

.cell {
    border: 1px solid black;
    height: 15em;
    width: 15em;
    padding: 0.5em;
}

.button-control {
    text-align: center;
    margin-left: 1em;
}

.boton-exit {
    padding: 3em;
    font-size: 1.2em;
}

.eat-control {
    padding: 2em;
    font-size: large;
    text-align: center;
    border: 5px groove teal;
    color: teal;
    font-weight: bolder;

}

.controls-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
}




@media all and (max-width:760px) {
    .contenedor {
        margin: 0 auto;
        width: 100%;
    }


    .controls-panel {
        flex-direction: column;
    }

    .boton-exit {
        margin-left: 0;
    }

}</style>