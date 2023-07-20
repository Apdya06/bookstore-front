export default {
    namespaced: true,
    state: {
        status: false,
        text: '',
        type: 'succes',
    },
    mutations: {
        set: (state, payLoad) => {
            state.status = payLoad.status
            state.text = payLoad.text
            state.type = payLoad.type
        },
    },
    actions: {
        set: ({commit}, payLoad) => {
            commit('set', payLoad)
        },
    },
    getters: {
        status: state => state.status,
        text: state => state.text,
        type : state => state.type,
    }
}