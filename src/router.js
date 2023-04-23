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
import UserList from './pages/admin/UserList.vue';
import ContactForm from './pages/contact/ContactForm.vue';
import ListComments from './pages/contact/ListComments.vue';
import store from './store/index.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/intro'},
        {path: '/intro', component: StartPage},
        {path: '/game', component: NotFound, meta: {mustBeLogged: true}},
        {path: '/auth', component: AuthForm},
        {path: '/features', component: OurFeatures, children: [
            {path: '/features/1', component: GrowingMonster},
            {path: '/features/2', component: CombatFeature},
            {path: '/features/3', component: RpgElements},
            {path: '/features/4', component: PublicRanking},
            {path: '/features/5', component: MiniGames}
        ]},
        {path: '/contact', component: ContactForm, meta: {mustBeLogged: true}},
        {path: '/comments', component: ListComments, meta: {mustBeAdmin: true}},
        {path: '/about', component: AboutUs},
        {path: '/playthroughs', component: NotFound},
        {path: '/users', component: UserList, meta: {mustBeAdmin: true}},
        {path: '/:notFound(.*)', component: NotFound}
    ],
});

router.beforeEach((to, from, next)=>{
if(store.getters.canNavigate){
if(to.meta.mustBeLogged && !store.getters.isAuthenticated){
    next('/auth');
    return;
}
if((to.meta.mustBeAdmin) && !store.getters.isAdmin){
    next('/');
    return;
}
next();
}else{
    next(false);
}
})

export default router;