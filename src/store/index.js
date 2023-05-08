import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import gameModule from './modules/game/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        game: gameModule
    }
})

export default store;