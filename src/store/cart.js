export default {
    namespaced: true,
    state: {
      carts: [],
    },
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                stock: payload.stock, 
                quantity: 1,
            });
        },
        update: (state, payload) => {
            const idx = state.carts.indexOf(payload);
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                stock: payload.stock, 
                quantity: payload.quantity,
            });
        },
    },
    actions: {
        add: ({ state, commit }, payload) => {
            const cartItem = state.carts.findIndex((item) => item.id === payload.id);
            if (cartItem === -1) {
                commit('insert', payload);
            } else {    
                commit('update', cartItem);
            }
        },
    },
    getters: {
        carts: (state) => state.carts,
        count: (state) => {
            return state.carts.length
        }
    },
  };