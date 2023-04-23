

<template>
    <base-dialog :clickEvent="changeUsername" :fixed="fixDialog" :show="showDialog" title="Edit" @close="toggleDialog">
        <form>
            <div class="form-control">
                <input type="text" v-model='currentUsername' />
                <div class="button-control"><base-button mode="flytrap" @click="changeUsername">Submit</base-button>
                </div>
            </div>
        </form>
    </base-dialog>
    <base-button mode="wallflower" @click="getUsers">Refresh</base-button>
    <base-card>
        <div class="containing">
   
            <ul v-if="allUsers">
                <li v-for="user in allUsers" :key="user.userNumber"><span class='names'>{{ user.username }}</span> - <span
                        class="emails">{{ user.email }}</span> <base-button
                        :mode="user.canNavigate ? 'wallflower' : 'flytrap'"
                        @click="changeNavigation(user.username, user.canNavigate, user.email, user.userNumber)"><img
                            src='./../../assets/deleteUser.png' class="deletes"></base-button>
                    <base-button mode="wallflower"
                        @click="toggleDialog(user.username, user.email, user.canNavigate, user.userNumber)"><img
                            src="./../../assets/edit.png" class="edits"></base-button>
                </li>
            </ul>
            <p v-else>Loading...</p>
        </div>
        <p class="error-control" v-if="error">{{ error }}</p>
    </base-card>
</template>

<script>

export default {
    data() {
        return {
            allUsers: null,
            error: null,
            showDialog: false,
            fixDialog: false,
            currentUserNumber: null,
            currentUsername: '',
            currentEmail: '',
            currentNavigation: null
        };
    },
    methods: {
        async changeNavigation(username, navigation, email, userNumber) {
            try {
                await this.$store.dispatch('toggleNavigation', { canNavigate: !navigation, email, username, userNumber });

            } catch (err) {
                this.error = err.message || 'Failure to comply. The database does not seem to be responding properly.';
                return;

            }
            this.getUsers();
        },
        async getUsers() {
            this.error = null;
            try {
                const response = await fetch('https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/users.json');
                const data = await response.json();
                this.allUsers = data;
            } catch (err) {
                this.error = err.message;

            }
        },
        toggleDialog(username, email, navigation, userNumber) {

            this.currentUsername = username;
            this.currentEmail = email;
            this.currentNavigation = navigation;
            this.currentUserNumber = userNumber;
            this.showDialog = !this.showDialog;
        },
        async changeUsername() {
            try {
                await this.$store.dispatch('toggleNavigation', { canNavigate: this.currentNavigation, email: this.currentEmail, username: this.currentUsername, userNumber: this.currentUserNumber });

            } catch (err) {
                this.error = err.message || 'Failure to comply. The database does not seem to be responding properly.';
                return;

            }
            this.getUsers();
        },

    },
    async mounted() {
        this.getUsers();
    }
}


</script>

<style scoped>
ul {
    list-style: none;
    padding: 0.75em;

}

li {
    padding: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2em;
}

.names {
    font-family: "Lucida Console", Courier, monospace;
}

.emails {
    font-family: "Lucida Console", Courier, monospace;
}

.deletes,
.edits {
    width: 3em;
}

.error-control {
    text-align: center;
    color: red;
    border: 5px groove crimson;
}

.form-control {
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.button-control {

    margin-top: 2em;
    padding: 0.25em;

}</style>