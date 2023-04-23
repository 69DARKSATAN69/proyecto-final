<template>
<base-card>
<p>Contacting administrators as <span>{{userEmail}}</span></p>
<form>
<textarea id="commentBody" name="commentBody" rows="5" placeholder="Please enter your question/comment here" autofocus required v-model.trim="commentField" />
<div class="button-control">
<base-button mode="flytrap" @click="submitComment">Submit</base-button>
</div>
</form>
<div v-if="isLoading">
    Sending...
</div>
<div class="error-control" v-if="!!error">
<p >{{error}}</p>
</div>
<div class="success-control" v-if="success">
    <p>Comment sent successfully!</p>
    </div>
</base-card>
</template>

<script>
export default {
    data() {
        return {
            userEmail: '',
            commentField: '',
            dateStamp: null,
            commentId: null,
            error: null,
            success: false,
            isLoading: false,
          

        };
    },

    computed: {
    setEmail(){
        return this.$store.getters.userEmail;
    }
},
methods: {
    async handleSubmit(){
        this.isLoading = true;
        let response;
        const comment = {userEmail: this.userEmail, commentField: this.commentField, dateStamp: this.dateStamp, commentId: this.commentId};
        try{
        response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/comments/${comment.commentId}.json`, {
            method: 'PUT',
            body: JSON.stringify(comment)
    });
        let responseData = await response.json();
        console.log(responseData);
}catch(err){
    this.error = err.message || 'Failure to comply. The database did not seem to enjoy your attempt.';
 
}finally{
if(response.ok){

this.success = true;
}
this.isLoading = false;
this.generateId();
}

    },
    setDataEmail(){
        this.userEmail = this.setEmail;
    },
    setDateStamp(){
const d = new Date();
let y = d.getFullYear();
let m =  [...d.getMonth().toString()].length <= 1 ? '0'+d.getMonth() : d.getMonth()
let d8 =  [...d.getDate().toString()].length <= 1 ? '0'+d.getDate() : d.getDate()
let h =  [...d.getHours().toString()].length <= 1 ? '0'+d.getHours() : d.getHours()
let min = [...d.getMinutes().toString()].length <= 1 ? '0'+d.getMinutes() : d.getMinutes();
this.dateStamp = `${y}-${m}-${d8} ${h}:${min}`;
    
    },

 submitComment(){
    this.success = false;
    this.error = null;
    if(this.commentField === ''){
        this.error = "Please do not send empty comments or questions.";
        return;
    }
    this.handleSubmit();
 },
 generateId(){
       
       this.commentId = null;
       this.commentId = this.$uuid.v4();
   

       }


},
mounted() {
   this.setDataEmail();
   this.setDateStamp();
   this.generateId();
}
}

</script>

<style scoped>
span{
    font-weight: 600;
    text-decoration: underline;
}

textarea{
    width: 100%;
    margin: 5vh 0;
    border: 1px solid burlywood;
    font-size: 1.3rem;
    background-color:#FAF0E6 ;
}

.button-control{
    margin: 0 auto;
    width: 50%;
}



</style>