<template>
    <article>
        <header>
            <base-card>
            <h1 v-if="!hasGrown">{{ monsterName }} the {{ monsterSpecies }} is growing!</h1>
            <h1 v-if="hasGrown">{{ monsterName }} the {{ monsterSpecies }} has grown to the next stage!</h1>
        </base-card>
        </header>
        <div class="image-control">
           
            <figure v-if="monsterStage === 1 && !selecting">
        <transition name="evolution" mode="out-in">
            <img src="./../../assets/stage1geon.jpg" alt="your friend" class="image1 clickImage" v-if="showFirst" @click="changeShow">
            <img src="./../../assets/stage2geon.jpg" alt="your friend, but bigger" class="image2" v-else @animationend="clickMonster" >
        </transition>
            
        </figure>
        <figure v-else-if="monsterStage === 2 && monsterSpi >= monsterStr && !selecting">
            <transition name="evolution2" mode="out-in">
                <img src="./../../assets/stage2geon.jpg" alt="your friend" class="image1 clickImage" v-if="showFirst" @click="changeShow">
                <img src="./../../assets/stage3geon.png" alt="your friend, but bigger" class="image2" v-else @animationend="clickMonster" >
            </transition>
                
            </figure>
            <figure v-else-if="monsterStage === 2 && monsterSpi < monsterStr && !selecting">
                <transition name="evolution3" mode="out-in">
                  <div class="image-container" v-if="showFirst" @click="changeShow">
                    <div ref="blackLeft" class="black-div"></div>
                    <img src="./../../assets/stage2geon.jpg" alt="your friend" class="image1 clickImage">
                    <div ref="blackRight" class="black-div"></div>
                  </div>
                  <img src="./../../assets/stage4geon.jpg" alt="your friend, but bigger" class="image2" v-else @animationend="clickMonster">
                </transition>
              </figure>
            <base-card v-else>
            <header><h1>Choose a trait!</h1></header>
        <ul><li v-for="(trait, index) in randomTraits" :key="index"><base-button mode="flytrap" @click="setCurrentTrait(trait)">{{trait[0]}}</base-button></li></ul></base-card>
              
  </div>
    </article>
</template>

<script>
export default {
    data(){
        return {
            monsterName: '',
            monsterSpecies: '',
            showFirst: true,
            hasGrown: false,
            monsterStage: 1,
            monsterStr: 0,
            monsterSpi: 0,
            traits: [],
            selectedTrait: '',
            selecting: false
     
        
        };
    },
    computed: {
        whatName(){
            return this.$store.getters.getName;
        },
        whatType(){
            return this.$store.getters.getMonsterType;
        },
        whatMonsterStage(){
            return this.$store.getters.getMonsterStage;
        },
        whatMonsterAttr(){
            return this.$store.getters.getMonsterAttributes;
        },
        whatCurrentTraits(){
            return this.$store.getters.getCurrentTraits;
        },
        whatTraits(){
            return this.$store.getters.getTraits;
        },
        randomTraits() {
    const traits = [...Object.entries(this.traits)];
    const randomSelection = [];
    console.log(traits);


    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * traits.length);
      const randomTrait = traits.splice(randomIndex, 1)[0]; // Remove the selected trait from the array
      randomSelection.push(randomTrait);
    }

    return randomSelection;
  },
},
        

    
    methods: {

        setName(){
            this.monsterName = this.whatName;
        },
        setSpecies(){
            this.monsterSpecies = this.whatType;
        },
        setTraits(){
            this.$store.dispatch('setTraits', this.traits);
        },
        setCurrentTrait(trait){
            this.selectedTrait = trait;
            console.log(trait);
            this.$store.dispatch('addTrait', this.selectedTrait);
           delete this.traits[trait];
            this.$store.dispatch('setTraits', this.traits);
                 
                 this.exitEvo();
            
        },
        changeShow(e){
            if(this.$refs.blackLeft){
                this.$refs.blackLeft.classList.add('left');
                this.$refs.blackRight.classList.add('right');
            }
            this.showFirst = false;
            e.target.removeEventListener('click', this.changeShow);
            
        },
        clickMonster(e){
            if(this.monsterStage === 1){
            e.target.addEventListener('click', this.exitEvo(2));
            try{
            this.$store.dispatch('evolutionStatUpdate', 'stage2');
            }catch(err){
                alert(err);
            }
        }
        else if(this.monsterStage === 2 && this.monsterSpi >= this.monsterStr){
            e.target.addEventListener('click', this.exitEvo(3));
            try{
            this.$store.dispatch('evolutionStatUpdate', 'stage3');
            }catch(err){
                alert(err);
            }
        
        }else{
            e.target.addEventListener('click', this.exitEvo(4));
            try{
            this.$store.dispatch('evolutionStatUpdate', 'stage4');
            }catch(err){
                alert(err);
            }
        }


            this.hasGrown = true;
            e.target.classList.add('clickImage');
        },
        exitEvo(monsterStage){
            if(!this.selecting){
            this.$store.dispatch('handleEvolution', monsterStage);
            this.selecting = !this.selecting;
            }else{
            this.$store.dispatch('advanceStage');
            }
        }
    },
    mounted(){
        this.setName();
        this.setSpecies();
        this.monsterStage = this.whatMonsterStage;
        this.monsterStr = this.whatMonsterAttr.str;
        this.monsterSpi = this.whatMonsterAttr.spi;
        this.traits = this.whatTraits;
        console.log('the monster spi is:', this.monsterSpi);
        console.log('the monster traits are:', this.traits);
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

.image-container{
    position: relative;
}

.black-div {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background-color: black;
    opacity: 0;
  }

  .left {
    left: 0;
    animation: mergeLeft 4s ease forwards;
  }
  
  .right {
    right: 0;
    animation: mergeRight 4s ease forwards;
  }


.clickImage{
cursor: pointer;
}

.evolution-enter-active{
    animation: entering 4s ease forwards;
}
.evolution-leave-active{
    animation: leaving 4s ease forwards;
}

.evolution-enter-from,
.evolution-leave-to{
    opacity: 0;
}

.evolution-enter-to,
.evolution-leave-from{
    opacity: 1;
}



.evolution2-enter-active{
    animation: entering2 4s ease forwards;
}
.evolution2-leave-active{
    animation: leaving2 4s ease forwards;
}

.evolution2-enter-from,
.evolution2-leave-to{
    opacity: 0;
}

.evolution2-enter-to,
.evolution2-leave-from{
    opacity: 1;
}



.evolution3-enter-active{
    animation: entering3 4s ease forwards;
}
.evolution3-leave-active{
    animation: leaving3 4s ease forwards;
}

.evolution3-enter-from,
.evolution3-leave-to{
    opacity: 0;
}

.evolution3-enter-to,
.evolution3-leave-from{
    opacity: 1;
}


@keyframes leaving {
    from { opacity: 1; }
    25%{ transform: skew(30deg, 20deg);}
    55%{ transform: rotate3d(1, 2, 3, 10deg);}
    75%{transform: rotate(3turn)}
    to { filter:brightness(10000%);
    opacity: 1; }
  }
  
  @keyframes entering {
    from { filter:brightness(10000000%); }
    25%{ filter:brightness(10000%);
        transform: rotate(2turn)}
    55%{ filter:brightness(15000%);}
    75%{filter:brightness(1000%)}
    to { filter:brightness(100%); }
  }

  @keyframes leaving2{
    from { transform: scale(1); filter:brightness(100%); opacity: 1;}
    25%{ transform: scale(1.2); filter:brightness(100000%);}
    50%{ transform: scale(1.3); filter:brightness(100000000%);}
    to{transform: scale(1.4); filter:brightness(100000000%); opacity: 1;}
  }

  @keyframes entering2{
    from{ transform: scale(1.4); filter:brightness(100000000%);}
    25%{ filter:brightness(1000%); transform: skew(100deg, 100deg);}
    50%{ filter: brightness(1000%); transform: skew(30deg, 30deg); transform: scale(1.2)}
    75%{ filter: brightness(800%);}
    to{transform: scale(1); filter:brightness(100%);}
  }

  @keyframes mergeLeft {
    0% { opacity: 0; width: 0; }
    50% { opacity: 0.6; width: 50%; }
    100% { opacity: 0.8; width: 100%; }
  }
  
  @keyframes mergeRight {
    0% { opacity: 0; width: 0; }
    50% { opacity: 0.6; width: 50%; }
    100% { opacity: 0.8; width: 100%; }
  }

    @keyframes leaving3{
        from{filter: brightness(100%); opacity: 1;}
        25%{filter: brightness(50%); transform: scale3d(1.2, 1.6, 3);}
        50%{filter: brightness(25%);}
        75%{filter: brightness(10%); transform: scale3d(1.3, 1.3, 1.5);}
        to{filter:brightness(0%); transform: scale3d(1.4, 1.4, 1.5); opacity: 1;}

    }

    @keyframes entering3{
        from{filter:brightness(0%); transform: scale3d(1.4, 1.4, 1.5); opacity: 1;}
        25%{ filter: brightness(5%); transform: scale3d(1.3, 1.3, 1.5);}
        45%{ filter: brightness(5%); transform: scale3d(1.3, 1.3, 1.5);}
        50%{filter: brightness(50%); transform: scale3d(1.5, 2, 1.5);}
        65%{filter: brightness(50%); transform: scale3d(1.5, 2, 1.5);}
        to{filter:brightness(100%); transform: scale3d(1,1,1);}
    }

</style>