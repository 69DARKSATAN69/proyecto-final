<template>
<div class="wrapper">
<base-card>
<form>
    <div class="form-data">
<input type="email" name="email" placeholder="Your E-mail please" v-model='email'/>
</div>
<div class="form-data">
<input type="password" name="password" placeholder="Your password please" v-model="password"/> 
</div>
<div class="button-control">
<base-button mode="flytrap" id="logControl" @click="submitForm">{{login ? 'Log In' : 'Register' }}</base-button>
<base-button mode="wallflower" @click="changeMode">{{login ? 'Would you rather register?' : 'You might want to log in instead' }}</base-button>
</div>
</form>
</base-card>
</div>


</template>

<script>
export default {
    data() {
        return {
            login: true,
            formIsValid: true,
            email: '',
            password: ''
        };
    },
    methods: {
        changeMode(){
            this.login = !this.login;
        },
        submitForm(){
            this.formIsValid = true;
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                alert('Invalid form!');
                return;
            }
        
            if(this.mode === 'login'){
                //....
            }else{
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
}


</script>

<style scoped>
.wrapper{
    display: grid;
    grid-template: repeat(12, 1fr);
}
form{
    grid-column: span 12;
    display: grid;
    grid-template: repeat(12, 1fr);
    gap: 2em;
    padding: 2em;
    
}

.form-data{
    grid-column: 1/10;
    text-align: center;
    
}

.button-control{
grid-column: 5/7;
display: flex;
flex-direction: row;

}

#logControl{
    margin-right: 30px;
}

input{
    padding: 0.5em;
    width: 70%;
}

</style>