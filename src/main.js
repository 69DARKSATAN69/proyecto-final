import { createApp } from 'vue'
import Router from './router.js';
import App from './App.vue'
import LinkButton from './components/ui/LinkButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import TheHeader from './components/ui/TheHeader.vue';
import BaseButton from './components/ui/BaseButton.vue';
import store from './store/index.js';
import BaseDialog from './components/ui/BaseDialog.vue';
import GameCard from './components/game/GameCard.vue';
import withUUID from "vue-uuid";

const app = createApp(App);
app.use(Router);
app.use(store);
app.use(withUUID);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('the-header', TheHeader);
app.component('link-button', LinkButton);
app.component('base-dialog', BaseDialog);
app.component('game-card', GameCard);
app.mount('#app');