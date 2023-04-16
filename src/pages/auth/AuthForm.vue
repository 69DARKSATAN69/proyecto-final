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
<div class="error-control" v-if="error">
    <p>{{ error }}</p>
</div>
<div class="loading-control" v-if="isLoading">
    <p>Reticulating splines...</p>
</div>
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
            password: '',
            isLoading: false,
            error: null
        };
    },
    methods: {
        changeMode(){
            this.login = !this.login;
        },
        async submitForm(){
            this.formIsValid = true;
            this.error = null;
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                this.error = "Failure to comply. Please enter a proper e-mail and a password of at least six letters.";
                return;
            }
            this.isLoading = true;
            const actionPayload = {
                    email: this.email,
                    password: this.password
                };
        try{
            if(this.login){
                await this.$store.dispatch('login', actionPayload);
            }else{
              await this.$store.dispatch('signup', actionPayload);
            }
        }catch(err){
            this.error = err.message || 'Failure to comply.';
        }
            this.isLoading = false;
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

.error-control{
    text-align: center;
    color: red;
    border: 5px groove crimson;
}
</style>