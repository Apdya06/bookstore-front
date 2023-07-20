export default {
    namespaced: true,
    state: {
        user : {},
    },
    mutations: {
        set: (state, payLoad) =>{
            state.user = payLoad
        },
    },
    actions: {
        set: ({commit}, payLoad) => {
            commit('set', payLoad)
        },
    },
    getters: {
        user: state => state.user,
        guest: state => Object.keys(state.user).length === 0,
    }
}