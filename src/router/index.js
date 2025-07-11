import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Main from '../pages/Main.vue';

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: Home 
    },
    { 
        path: '/main', 
        name: 'Main', 
        component: Main 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
