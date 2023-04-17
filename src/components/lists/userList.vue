

<template>
    <base-card>
    <div class="containing">
        <ul>
            <li v-for="user in allUsers" :key="user.username"><span class='names'>{{user.username}}</span> - <span class="emails">{{user.email}}</span> <base-button mode="wallflower"><img src='./../../assets/deleteUser.png' class="deletes"></base-button>
                <base-button mode="wallflower"><img src="./../../assets/edit.png" class="edits"></base-button></li>
        </ul>
        </div>
    </base-card>
</template>

<script>




export default {
    data() {
        return {
            allUsers: null
        };
    },
  async mounted() {
  try {
    const response = await fetch('https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users.json');
    const data = await response.json();
    this.allUsers = data;
  } catch (error) {
    console.error(error);
  }
},
};

</script>

<style scoped>


ul{
    list-style: none;
    padding: 0.75em;    
  
}
li{
    padding: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2em;
}

.names{
    font-family: "Lucida Console", Courier, monospace;
}
.emails{
    font-family: "Lucida Console", Courier, monospace;
}

.deletes,
.edits{
width: 3em;
}


</style>