import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'
import dialog from './dialog'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideBar: false
    },
    getters: {
        sideBar: state => state.sideBar
    },
    mutations: {
        setSideBar: (state, value) => {
            state.sideBar = value
        }
    },
    actions: {
        setSideBar({ commit }, value) {
        commit('setSideBar', value)
        }
    },
    modules: {
        cart,
        alert,
        dialog,
        auth,
    }
})
