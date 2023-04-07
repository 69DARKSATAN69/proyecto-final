import {createRouter, createWebHistory} from 'vue-router';
import StartPage from './pages/info/StartPage.vue';
import NotFound from './pages/info/NotFound.vue';
import AboutUs from './pages/info/AboutUs.vue';
import OurFeatures from './pages/info/OurFeatures.vue';
import AuthForm from './pages/auth/AuthForm.vue';
import GrowingMonster from './pages/info/features/GrowingMonster.vue';
import CombatFeature from './pages/info/features/CombatFeature.vue';
import RpgElements from './pages/info/features/RpgElements.vue';
import PublicRanking from './pages/info/features/PublicRanking.vue';
import MiniGames from './pages/info/features/MiniGames.vue';
import UsersList from './pages/auth/UsersList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/intro'},
        {path: '/intro', component: StartPage},
        {path: '/game', component: null},
        {path: '/auth', component: AuthForm},
        {path: '/features', component: OurFeatures, children: [
            {path: '/features/1', component: GrowingMonster},
            {path: '/features/2', component: CombatFeature},
            {path: '/features/3', component: RpgElements},
            {path: '/features/4', component: PublicRanking},
            {path: '/features/5', component: MiniGames}
        ]},
        {path: '/contact', component: UsersList},
        {path: '/about', component: AboutUs},
        {path: '/playthroughs', component: UsersList},
        {path: '/users', component: UsersList},
        {path: '/:notFound(.*)', component: NotFound}
    ],
})

export default router;