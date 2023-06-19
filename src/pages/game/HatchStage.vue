<!-- este componente sencillamente muestra el huevo eclosionando -->

<template>
    <article>
        <header>
            <base-card>
            <h1>{{ monsterName }} the {{ monsterSpecies }} is hatching!</h1>
        </base-card>
        </header>
        <div class="image-control">
           
            <figure>
            <img src="./../../assets/eggInPlains.png" alt="a giant egg in the plains" class="image1" v-if="showEgg" @animationend="transitionControl()">
            <transition>
            <img src="./../../assets/stage1geon.jpg" alt="your new friend" v-if="!showEgg" class="image2" @animationend="clickMonster">
        </transition>
            
        </figure>
  </div>
    </article>
</template>

<script>
export default {
    data(){
        //el boolean showEgg gobierna cuando se muestra el huevo y cuando su eclosión.
        return {
            monsterName: '',
            monsterSpecies: '',
            showEgg: true
        };
    },
    computed: {
        whatName(){
            return this.$store.getters.getName;
        },
        whatType(){
            return this.$store.getters.getMonsterType;
        }

    },
    methods: {
        setName(){
            this.monsterName = this.whatName;
        },
        setSpecies(){
            this.monsterSpecies = this.whatType;
        },
        transitionControl(){
            this.showEgg = false;
        },
        clickMonster(e){
            e.target.addEventListener('click', ()=>this.$store.dispatch('advanceStage'));
            e.target.classList.add('clickImage');
        }
    },
    //al montarse ya se empiezan a setear los atributos del monstruo.
    mounted(){
        this.$store.dispatch('initTraits');
        this.setName();
        this.setSpecies();
        this.$store.dispatch('changeCurrentHp', this.$store.getters.getMonsterAttributes.hp);
    }
}

</script>

<style scoped>
h1{
    text-align: center;
}

figure{
    width: 50%;
    margin: 1em auto;

}
figure img{
    width: 100%;
  
    border: 3px solid burlywood;
}

.image1 {
    animation: fadeOut 3s ease forwards;
}
.clickImage{
    cursor: pointer;
}
  

@keyframes fadeOut {
    from { opacity: 1; }
    25%{ filter:brightness(100%)}
    55%{ filter:brightness(550%)}
    75%{filter:brightness(100000%)}
    to { filter:brightness(100000000%); }
  }
  
  @keyframes fadeIn {
    from { filter:brightness(10000000%); }
    25%{ filter:brightness(10000%)}
    55%{ filter:brightness(1000%)}
    75%{filter:brightness(100%)}
    to { filter:brightness(100%); }
  }

.v-enter-from{
    filter:brightness(100000000%); 
}

.v-enter-active{
 animation: fadeIn 2s ease forwards;
}

.v-enter-to{
    filter:brightness(100%);
}

</style>