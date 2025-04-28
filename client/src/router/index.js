import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Votacao from '../pages/Votacao.vue';
import Login from '../pages/Login.vue';

const routes = [
    { path: '/', component: Dashboard },
    { path: '/votacao/:id', component: Votacao, props: true },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
