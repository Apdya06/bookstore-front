import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

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
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/CheckoutPage.vue'),
        meta: { auth: true }
    },
]    
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if(store.getters['auth/guest']) {
            store.dispatch('alert/set', {
                status: true,
                text: 'Login First',
                type: 'error',
            })
            store.dispatch('setPrevUrl', to.path)
            store.dispatch('dialog/setComponent', 'login-page')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
