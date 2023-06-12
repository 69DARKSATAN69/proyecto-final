<template>
    <div>
        <base-button mode="wallflower" @click="getComments">Refresh</base-button>
        <ul v-if="allComments && !isLoading">
            <li v-for="comment in allComments" :key="comment">
                <base-card>
                    <p class="comment-email"><a :href="'mailto:' + comment.userEmail">{{ comment.userEmail }}</a></p>
                    <p class="comment-date">{{ comment.dateStamp }}</p>
                    <p class="comment-body">{{ comment.commentField }}</p>
                    <div class="button-control">
                        <base-button mode="flytrap" @click="deleteComment(comment.commentId)">Delete</base-button>
                    </div>
                </base-card>
            </li>
        </ul>
        <div v-if="(!allComments || allComments.length < 1) && !isLoading">
            <base-card>
            <p>No questions and/or comments have been posted.</p>
            </base-card>
        </div>
        <div class="loading-control" v-if="isLoading">
            <p>Loading...</p>
        </div>
        <div class="error-control" v-if="!!error">
            <p>{{ error }}</p>
        </div>
        <div class="success-control" v-if="success">
            <p>Comment deleted successfully!</p>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            allComments: null,
            isLoading: false,
            error: null,
            success: false
        };
    },

    methods: {
        async getComments() {
            this.error = null;
            this.isLoading = true;
            try {
                const response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=${this.$store.getters.token}`);
                const data = await response.json();
                this.allComments = data;
            } catch (err) {
                this.error = err.message || "Failure to comply. Database couldn't be reached for comments.";

            } finally {
                this.isLoading = false;
            }
        },
        async deleteComment(commentId) {
            this.success = false;
            this.error = null;
            this.isLoading = true;
            let response;
            try {
                response = await fetch(`https://irkala-b41eb-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentId}.json`, { method: 'DELETE' });
                const data = await response.json();
            } catch (err) {
                this.error = err.message || 'Failure to comply. The selected comment has probably already been deleted.';
            } finally {
                if (response.ok) {
                    this.success = true;
                    this.getComments();
                }
                this.isLoading = false;
            }

        }

    },
    async mounted() {
        this.getComments();
    }


}
</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 0;
}

li {
    width: 100%;
    margin: 3em 0;
}

.button-control {
    margin: auto;
    margin-top: 2em;

    padding: 0.25em;
    width: 50%;



}
</style>