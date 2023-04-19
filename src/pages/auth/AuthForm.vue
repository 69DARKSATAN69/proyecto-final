<template>
<div class="wrapper">
<base-card>
<form>
    <div class="form-data">
        <input type="text" name="username" placeholder="Your username please" v-model='userName' v-if="!login"/>
        </div>
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
            userName: '',
            email: '',
            password: '',
            isLoading: false,
            error: null,
            userNumber: this.$uuid.v4(),
            
        };
    },
    methods: {
        changeMode(){
            this.login = !this.login;
        },
        async submitForm(){
            const uniqueUsername = await fetch('https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users.json');
            const jsonUsername = await uniqueUsername.json();
            console.log(jsonUsername);
            
            this.formIsValid = true;
            this.error = null;
            if(!this.login){
                if(this.userName === ''){
                    this.formIsValid = false;
                    this.error = "Failure to comply. Please enter a username."
                    return;
                }else{
                   
                  for(let key in jsonUsername){
                    if(this.userName === key){
                        this.error = "Failure to comply. User name is taken."
                        return;
                    }
                  }
                }
            }
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false;
                this.error = "Failure to comply. Please enter a proper e-mail and a password of at least six letters.";
                return;
            }
            this.isLoading = true;

        try{
            if(this.login){
                await this.$store.dispatch('login', {email: this.email, password: this.password});
            }else{
            this.generateId();
              await this.$store.dispatch('signup', {username: this.userName, email: this.email, password: this.password, userNumber: this.userNumber});
         
            }
        }catch(err){
            this.error = err.message || 'Failure to comply.';
        }
            this.isLoading = false;
        },
        generateId(){
       
        this.userNumber = null;
        this.userNumber = this.$uuid.v4();
    

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