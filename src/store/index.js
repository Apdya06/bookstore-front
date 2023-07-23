import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'
import dialog from './dialog'
import auth from './auth'
import region from './region'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideBar: false,
        prevUrl: '',
        payment: [],
    },
    getters: {
        sideBar: state => state.sideBar,
        prevUrl: state => state.prevUrl,
        payment: state => state.payment,

    },
    mutations: {
        setSideBar: (state, value) => {
            state.sideBar = value
        },
        setPrevUrl: (state, value) => {
            state.prevUrl = value
        },
        setPayment: (state, value) => {
            state.payment = value
        }
    },
    actions: {
        setSideBar: ({ commit }, value) => {
            commit('setSideBar', value)
        },
        setPrevUrl: ({ commit }, value) => {
            commit('setPrevUrl', value)
        },
        setPayment: ({ commit }, value) => {
            commit('setPayment', value)
        },
    },
    modules: {
        cart,
        alert,
        dialog,
        auth,
        region,
    }
})
