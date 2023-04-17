import { createApp } from 'vue'
import Router from './router.js';
import App from './App.vue'
import LinkButton from './components/ui/LinkButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import TheHeader from './components/ui/TheHeader.vue';
import BaseButton from './components/ui/BaseButton.vue';
import TheFooter from './components/ui/TheFooter.vue';
import store from './store/index.js';
import userList from './components/lists/userList.vue';
import { VueFire, VueFireAuth, VueFireDatabaseOptionsAPI } from 'vuefire';
import { firebaseApp } from './firebase';


const app = createApp(App);
app.use(VueFire, {firebaseApp, modules: [VueFireAuth(), VueFireDatabaseOptionsAPI()]});
app.use(Router);
app.use(store)
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('the-header', TheHeader);
app.component('the-footer', TheFooter);
app.component('link-button', LinkButton);
app.component('user-list', userList);
app.mount('#app');