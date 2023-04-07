import { createApp } from 'vue'
import Router from './router.js';
import App from './App.vue'
import LinkButton from './components/ui/LinkButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import TheHeader from './components/ui/TheHeader.vue';
import BaseButton from './components/ui/BaseButton.vue';

import store from './store/index.js';
const app = createApp(App);

app.use(Router);
app.use(store)
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('the-header', TheHeader);
app.component('link-button', LinkButton);
app.mount('#app');