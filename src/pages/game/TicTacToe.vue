<!-- componente de tres en raya, utilizado en la acción 'play' y aumenta el espíritu. -->

<template>
    <main class="contenedor">
        <div class="error-handling"></div>
        <base-card class="tictactoe-control">
            <table>
                <tr id="row1">
                    <td id="cell1" class="cell"></td>
                    <td id="cell2" class="cell"></td>
                    <td id="cell3" class="cell"></td>
                </tr>
                <tr id="row2">
                    <td id="cell4" class="cell"></td>
                    <td id="cell5" class="cell"></td>
                    <td id="cell6" class="cell"></td>
                </tr>
                <tr id="row3">
                    <td id="cell7" class="cell"></td>
                    <td id="cell8" class="cell"></td>
                    <td id="cell9" class="cell"></td>
                </tr>
            </table>
            <div class="win-control"></div>
            <div class="leyenda">
                <div class="control-leyenda-jugador">
                    <div class="jugador"></div><span>Player</span>
                </div>
                <div class="control-leyenda-skynet">
                    <div class="skynet"></div><span>Companion</span>
                </div>
            </div>
            <div class="controls-panel">
                <div class="button-control">
                    <button class="boton-inicio">Exit</button>
                </div>
            </div>
        </base-card>
    </main>
</template>

<script>
export default {
    data() {
        //guarda datos varios del tablero, qué combinaciones dan victoria, quién ganó y la dificultad del juego, que es 1 por defecto.
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
            row1: null,
            row2: null,
            row3: null,
            board: null,
            condicionesVictoria: [],
            difficulty: 1,
            winner: null,
        };
    },
    computed: {
        whatMonsterStage() {
            return this.$store.getters.getMonsterStage;
        }
    },
    methods: {

        reInit() {
            //resetea el tablero y permite jugar.

            document.querySelector('.boton-inicio').addEventListener('click', this.exit);
            document.querySelector('.boton-inicio').disabled = true;
            let winDif = document.querySelector('.win-control');
            winDif.classList.remove('skynet-win');
            winDif.classList.remove('player-win');
            winDif.innerHTML = '';
            winDif.style.display = 'none';

            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    this.board[i][j].classList.remove('porJugador');
                    this.board[i][j].classList.remove('porSkynet');
                    this.board[i][j].addEventListener('click', this.manejarClic);
                }
            }
        },

        pulsaCelda(c) {
            //manejador del evento de click. Pinta la celda pulsada si se puede pintar y hace moverse a la máquina según la dificultad.
            document.querySelector('.error-handling').style.display = 'none';
            if (!c.classList.contains('porJugador') && !c.classList.contains('porSkynet')) {
                c.classList.add('porJugador');
                if (this.comprobacionVictoria('porJugador')) {
                    this.handleVictory('jugador');
                } else {
                    switch (this.difficulty) {
                        case 1:
                            this.skynetMueve();
                            break;
                        case 2:
                            this.skynetMueveRandom();
                            break;
                        case 3:
                        case 4:
                            this.skynetMueveAMatar();
                            break;
                        default:
                            this.skynetMueve();
                            break;
                    }

                }

            } else {
                //errores en caso de pulsar donde no debes.
                document.querySelector('.error-handling').style.display = 'block';
                document.querySelector('.error-handling').innerHTML = 'Not there, chief.';
            }
        },
        manejarClic(evento) {
            //función intermedia para llamar a la anterior.
            this.pulsaCelda(evento.target)
        },

        skynetMueve() {
            //versión más sencilla de la ia, mueve al primer sitio vacío.
            if (!this.quedanVacias()) {
                return;
            } else {
                for (let i = 0; i < this.board.length; i++) {
                    for (let j = 0; j < this.board[i].length; j++) {
                        if (!this.board[i][j].classList.contains('porJugador') && !this.board[i][j].classList.contains('porSkynet')) {
                            this.board[i][j].classList.add('porSkynet');
                            if (this.comprobacionVictoria('porSkynet')) {
                                this.handleVictory('skynet')
                            }
                            return;
                        }
                    }
                }
            }
        },

        skynetMueveRandom() {
            //versión intermedia, mueve a una celda aleatoria.
            let movimientoCorrecto = false;
            if (!this.quedanVacias()) {
                return;
            } else {
                while (movimientoCorrecto === false) {
                    let moving = Math.floor(Math.random() * 9) + 1;
                    if (!document.querySelector(`#cell${moving}`).classList.contains('porSkynet') && !document.querySelector(`#cell${moving}`).classList.contains('porJugador')) {
                        movimientoCorrecto = true;
                        document.querySelector(`#cell${moving}`).classList.add('porSkynet');
                        if (this.comprobacionVictoria('porSkynet')) {
                            this.handleVictory('skynet')
                        }

                    }
                }

            }
        },


        skynetMueveAMatar() {
            //versión avanzada, busca si el jugador está a punto de ganar para interrumpirle, o si ella misma está a punto de ganar
            //para ganar.
            let movimientoCorrecto = false;
            if (!this.quedanVacias()) {
                return;
            } else {
                for (let combinacion of this.condicionesVictoria) {
                    const combinaciones = [...combinacion];
                    const contenidoCombinacion1 = combinaciones[0];
                    const contenidoCombinacion2 = combinaciones[1];
                    const contenidoCombinacion3 = combinaciones[2];
                    if ((contenidoCombinacion1.classList.contains('porSkynet') && contenidoCombinacion2.classList.contains('porSkynet')) || (contenidoCombinacion1.classList.contains('porSkynet') && contenidoCombinacion3.classList.contains('porSkynet')) || (contenidoCombinacion2.classList.contains('porSkynet') && contenidoCombinacion3.classList.contains('porSkynet')) ||
                        (contenidoCombinacion1.classList.contains('porJugador') && contenidoCombinacion2.classList.contains('porJugador')) || (contenidoCombinacion1.classList.contains('porJugador') && contenidoCombinacion3.classList.contains('porJugador')) || (contenidoCombinacion2.classList.contains('porJugador') && contenidoCombinacion3.classList.contains('porJugador'))) {
                        for (const celda of combinacion) {
                            if (!celda.classList.contains('porSkynet') && !celda.classList.contains('porJugador')) {
                                celda.classList.add('porSkynet');
                                movimientoCorrecto = true;
                                if (this.comprobacionVictoria('porSkynet')) {
                                    this.handleVictory('skynet')
                                }
                                return;
                            }
                        }
                    }
                }
                if (!movimientoCorrecto) {
                    this.skynetMueveRandom();
                    return;
                }

            }
        },


        quedanVacias() {
            //función comprobadora de empate, que es cuando el tablero está lleno y no hay ganadores.
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (!this.board[i][j].classList.contains('porJugador') && !this.board[i][j].classList.contains('porSkynet')) {
                        return true;
                    }
                }
            }
            this.handleVictory('empate');
            return false;
        },

        comprobacionVictoria(faction) {
            //comprueba si las condiciones de victoria se cumplen para algún jugador.
            for (let i = 0; i < this.condicionesVictoria.length; i++) {
                const [cellA, cellB, cellC] = this.condicionesVictoria[i];
                if (cellA.classList.contains(faction) && cellB.classList.contains(faction) && cellC.classList.contains(faction)) {
                    return true;
                }
            }

            return false;
        },

        handleVictory(ganador) {
            //maneja la lógica en caso de que algún jugador gane, o haya empate.
            let winDif = document.querySelector('.win-control');
            winDif.style.display = 'block';
            switch (ganador) {
                case 'jugador':
                    winDif.classList.add('player-win');
                    winDif.innerHTML = 'YOU WIN';
                    this.winner = 'player';
                    this.gameDecided();
                    break;
                case 'skynet':
                    winDif.classList.add('skynet-win');
                    winDif.innerHTML = 'YOU FAIL';
                    this.winner = 'companion';
                    this.gameDecided();
                    break;
                default:
                    winDif.innerHTML = 'YOU TIED';
                    this.winner = 'tie';
                    this.gameDecided();
                    break;
            }

        },

        gameDecided() {
            //al terminar la partida, quita interactuabilidad al tablero.
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    this.board[i][j].removeEventListener('click', this.manejarClic);

                }
            }
            document.querySelector('.boton-inicio').disabled = false;

        },

        exit() {
            //maneja salir de la partida, aumenta el espíritu más o menos según ganes, pierdas o empates.
            this.$store.dispatch('setGamesPlayed', this.$store.getters.getGamesPlayed+1);
            switch (this.difficulty) {
                case 1:
                default:

                    switch (this.winner) {
                        case 'player':
                            this.$store.dispatch('stage1PlayWin');
                            this.$store.dispatch('setGamesWon', this.$store.getters.getGamesWon+1);

                            this.$store.dispatch('advanceStage');
                            break;
                        case 'tie':
                            this.$store.dispatch('stage1PlayTie');
                            this.$store.dispatch('setGamesTied', this.$store.getters.getGamesTied+1);

                            this.$store.dispatch('advanceStage');
                            break;
                        case 'companion':
                        default:
                            this.$store.dispatch('stage1PlayLose');
                            this.$store.dispatch('advanceStage');
                            break;

                    }
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
            this.row1 = [this.cell1, this.cell2, this.cell3],
            this.row2 = [this.cell4, this.cell5, this.cell6],
            this.row3 = [this.cell7, this.cell8, this.cell9],
            this.board = [this.row1, this.row2, this.row3],
            //estos arrays son los que deben tener la misma clase para haber una victoria.
            this.condicionesVictoria = [
                [this.cell1, this.cell2, this.cell3],
                [this.cell4, this.cell5, this.cell6],
                [this.cell7, this.cell8, this.cell9],
                [this.cell1, this.cell4, this.cell7],
                [this.cell2, this.cell5, this.cell8],
                [this.cell3, this.cell6, this.cell9],
                [this.cell1, this.cell5, this.cell9],
                [this.cell3, this.cell5, this.cell7]
            ],
            //la dificultad es igual al stage del monstruo, 3 y 4 se consideran al mismo nivel.
            this.difficulty = this.whatMonsterStage;
        this.reInit();
    }


}
</script>

<style scoped>
body {
    background: radial-gradient(circle, whitesmoke, rgb(238, 225, 225), aliceblue, lightblue);
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
    width: 50%;
}

table {
    border: 1px solid black;
    width: 100%;
}

.cell {
    border: 1px solid black;
    height: 10em;
    width: 10em;
    padding: 0.5em;
}

.button-control {
    text-align: center;
    margin-left: 1em;
}

.boton-inicio {
    padding: 3em;
    font-size: 1.2em;
}

.porSkynet {
    background-color: rebeccapurple;
}

.porJugador {
    background-color: darksalmon;
}

.win-control {
    padding: 2em;
    font-size: x-large;
    text-align: center;
    display: none;
}

.player-win {
    border: 5px groove darksalmon;
    color: darksalmon;
}

.skynet-win {
    border: 5px groove rebeccapurple;
    color: rebeccapurple;
}

.leyenda {
    display: flex;
    flex-direction: column;
}

.controls-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.control-leyenda-jugador {
    display: flex;
    flex-direction: row;
}

.control-leyenda-skynet {
    display: flex;
    flex-direction: row;
}

.skynet {
    width: 30px;
    height: 30px;
    background-color: rebeccapurple;
}

.jugador {
    width: 30px;
    height: 30px;
    background-color: darksalmon;
}






@media all and (max-width:760px) {
    .contenedor {
        margin: 0 auto;
        width: 100%;
    }

    .controls-panel {
        flex-direction: column;
    }

    .boton-inicio {
        margin-left: 0;
    }


}</style>