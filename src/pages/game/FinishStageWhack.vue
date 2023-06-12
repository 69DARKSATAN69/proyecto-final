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
                    <td id="cell6" class="cell"></td>
                   
                </tr>
                <tr id="row2">
                    <td id="cell7" class="cell"></td>
                    <td id="cell8" class="cell"></td>
                    <td id="cell9" class="cell"></td>
                    <td id="cell10" class="cell"></td>
                    <td id="cell11" class="cell"></td>
                    <td id="cell12" class="cell"></td>

                </tr>
                <tr id="row3">
                    <td id="cell13" class="cell"></td>
                    <td id="cell14" class="cell"></td>
                    <td id="cell15" class="cell"></td>
                    <td id="cell16" class="cell"></td>
                    <td id="cell17" class="cell"></td>
                    <td id="cell18" class="cell"></td>

                </tr>
            </table>
    <div class="eat-control">{{correctClick}} soldados devorados de </div>
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
                cells: Array(18).fill(null),
                randomNo: [], 
                randomNo2: [], 
                randomClass: null,
                correctClick: 0,
                intervalIds: [],
   
                
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
      this.intervalIds = []; // Clear previous interval IDs

      const intervalId = setInterval(this.handleRandomizer, 1000);
      this.intervalIds.push(intervalId);
      const intervalId2 = setInterval(this.handleRandomizer, 1550);
      this.intervalIds.push(intervalId2);

      setTimeout(() => {
        this.intervalIds.forEach((id) => clearInterval(id));
        document.querySelector('.boton-exit').disabled = false;
      }, 10000);
    },

    handleRandomizer() {
  this.randomNo.forEach((num) => {
    const randomCell = document.querySelector(`#cell${num}`);
    randomCell.removeEventListener('click', this.handleClick);
    randomCell.classList.remove(`InUse1`);
  });

  this.randomNo2.forEach((num) => {
    const randomCell2 = document.querySelector(`#cell${num}`);
    randomCell2.removeEventListener('click', this.handleClick);
    randomCell2.classList.remove(`InUse1`);
  });

  this.randomNo = [];
  this.randomNo2 = [];
  this.randomClass = Math.floor(Math.random() * 7) + 1;

  const randomNo = Math.floor(Math.random() * 9) + 1;
  const randomNo2 = Math.floor(Math.random() * (18 - 9 + 1)) + 8;
  this.randomNo.push(randomNo);
  this.randomNo2.push(randomNo2);

  this.randomNo.forEach((num) => {
    const randomCell = document.querySelector(`#cell${num}`);
    randomCell.addEventListener('click', this.handleClick);
    randomCell.classList.add(`InUse1`);
  });

  this.randomNo2.forEach((num) => {
    const randomCell2 = document.querySelector(`#cell${num}`);
    randomCell2.addEventListener('click', this.handleClick);
    randomCell2.classList.add(`InUse1`);
  });
},

    handleClick(event) {
      this.correctClick++;
      event.target.classList.add('goodClick', 'goodClick-small');
      setTimeout(() => {
        event.target.classList.remove(
          'goodClick',
          'goodClick-small',
          `InUse1`,
          
        );
      }, 200);

      const index = event.target.id.replace('cell', '');
      this.randomNo = this.randomNo.filter((num) => num !== Number(index));
      this.randomNo2 = this.randomNo2.filter((num) => num !== Number(index));

      event.target.removeEventListener('click', this.handleClick);
    },

    
    exit() {
            switch(this.$store.getters.getLastCity){
                case 'Oviedo':
                    if(this.correctClick > 7){
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                        this.$store.dispatch('setFinishStage', 4)
                    }else{
                        this.$store.dispatch('changeCurrentHp', this.$store.getters.getCurrentHp/2);
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                        this.$store.dispatch('setFinishStage', 4)

                    }
                    break;
                case 'Cranberra':
                          if(this.correctClick > 9){
                            this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                            this.$store.dispatch('setFinishStage', 4)

                    }else{
                        this.$store.dispatch('changeCurrentHp', this.$store.getters.getCurrentHp/2);
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                        this.$store.dispatch('setFinishStage', 4)

                    }
                    break;
                case 'Ulaanbaatar':
                if(this.correctClick > 11){
                    this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                    this.$store.dispatch('setFinishStage', 4)
                    }else{
                        this.$store.dispatch('changeCurrentHp', this.$store.getters.getCurrentHp/2);
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
                        this.$store.dispatch('setFinishStage', 4)

                    }
                    break;
                default:
                    if(this.correctClick > 7){
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
            console.log('so far there have been people eaten of this number: ', this.$store.getters.getPeopleEaten);
                        this.$store.dispatch('setFinishStage', 4)

                    }else{
                        this.$store.dispatch('changeCurrentHp', this.$store.getters.getCurrentHp/2);
                        this.$store.dispatch('setPeopleEaten', this.$store.getters.getPeopleEaten+this.correctClick);
            console.log('so far there have been people eaten of this number: ', this.$store.getters.getPeopleEaten);
                        this.$store.dispatch('setFinishStage', 4)

                    }
                    break;
            }

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
                this.cell16 = document.querySelector('#cell16'),
                this.cell17 = document.querySelector('#cell17'),
                this.cell18 = document.querySelector('#cell18'),
                this.difficulty = this.whatMonsterStage;
                this.reInit();
        }
    
    
    }
    </script>
    
    <style scoped>
    .InUse1 {
        background-image: url('./../../assets/finish/soldier.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .goodClick{
        transform: scale(1);
        transition: transform 0.2s ease;
    }
    
    .goodClick-small{
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
        font-weight:bolder;
     
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
    
    }
    </style>