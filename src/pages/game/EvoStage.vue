<template>
    <article>
        <header>
            <base-card>
            <h1 v-if="!hasGrown">{{ monsterName }} the {{ monsterSpecies }} is growing!</h1>
            <h1 v-if="hasGrown">{{ monsterName }} the {{ monsterSpecies }} has grown to the next stage!</h1>
        </base-card>
        </header>
        <div class="image-control">
           
            <figure>
        <transition name="evolution" mode="out-in">
            <img src="./../../assets/stage1geon.jpg" alt="your friend" class="image1 clickImage" v-if="showFirst" @click="changeShow">
            <img src="./../../assets/stage2geon.jpg" alt="your friend, but bigger" class="image2" v-else @animationend="clickMonster" >
        </transition>
            
        </figure>
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
            hasGrown: false
        
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
        changeShow(e){
            this.showFirst = false;
            e.target.removeEventListener('click', this.changeShow);
        },
        clickMonster(e){
            e.target.addEventListener('click', this.exitEvo);
            try{
            this.$store.dispatch('evolutionStatUpdate', 'stage2');
            }catch(err){
                alert(err);
            }
            this.hasGrown = true;
            e.target.classList.add('clickImage');
        },
        exitEvo(){
            this.$store.dispatch('handleEvolution', 2);
            this.$store.dispatch('advanceStage');
        }
    },
    mounted(){
        this.setName();
        this.setSpecies();
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


</style>