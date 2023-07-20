import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '*',
        redirect: {
        name: 'home'
        }    
    },
    { 
        path: '/categories',
        name: 'categories',
        component: () => import('../views/CategoriesView.vue')
    },
    { 
        path: '/books',
        name: 'books',
        component: () => import('../views/BooksView.vue')
    },
    { 
        path: '/category/:slug',
        name: 'category',
        component: () => import('../views/CategoryView.vue')
    },
    { 
        path: '/book/:slug',
        name: 'book',
        component: () => import('../views/BookView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
