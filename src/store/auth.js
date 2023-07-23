export default {
    namespaced: true,
    state: {
        user: {} || JSON.parse(localStorage.getItem('user')) ,
        token: null || localStorage.getItem('token') ,
    },
    mutations: {
        set: (state, payLoad) =>{
            state.user = payLoad
        },
    },
    actions: {
        // set: ({ commit }, payLoad) => {
        //     commit('set', payLoad)
        // },
        set: ({ commit }, data) => {
            if (data) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.api_token);
                commit('set', data); // Directly set the data object, including user and token
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                commit('set', {}); // Empty object to clear the user data
            }
        },
    },
    getters: {
        user: state => state.user,
        guest: state => Object.keys(state.user).length === 0,
    }
}