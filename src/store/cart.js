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
                error: null,
                quantity: 1,
            });
        },
        update: (state, payload) => {
            const index = state.carts.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                state.carts.splice(index, 1, {
                    ...state.carts[index],
                    ...payload
                });
                if (payload.quantity <= 0) {
                    state.carts.splice(index, 1);
                }
            }
        },
        set: (state, payload) => {
            state.carts = payload;
        },
    },
    actions: {
        add: ({ state, commit }, payload) => {
            const cartItem = state.carts.find((item) => item.id === payload.id);
            if (!cartItem) {
                if (payload.stock > 0){    
                    commit('insert', payload);
                } 
                else {     
                    commit('update', {...cartItem, error: 
                        {text: 'Stok Kosong', type: 'error'}})
                }
            } else {
                if (cartItem.quantity <= cartItem.stock) {
                    commit('update', { ...cartItem, quantity: cartItem.quantity + 1, 
                    error: cartItem.quantity + 1 === cartItem.stock ? 
                        {text: 'Stok Barang Tidak Mencukupi', type: 'error'} : null })
                } 
            }
        },
        remove: ({ state, commit }, payload) => {
            const cartItem = state.carts.find((item) => item.id === payload.id);
            if (cartItem) {
                if (cartItem.quantity === 1) {
                    commit('update', { ...cartItem, quantity: 0 });
                } else {
                    commit('update', { ...cartItem, quantity: cartItem.quantity - 1});
                    if (cartItem.error != null) commit('update', {...cartItem, error: null})      
                }
            }
        },
        set: ({ commit }, payload) => {
            commit('set', payload);
        }
    },
    getters: {
        carts: (state) => state.carts,
        count: (state) => state.carts.length,
        totalQuantity: (state) =>
            state.carts.reduce((total, item) => total + item.quantity, 0),
        totalPrice: (state) =>
            state.carts.reduce((total, item) => total + item.price * item.quantity, 0),
        totalWeight: (state) =>
            state.carts.reduce((total, item) => total + item.weight * item.quantity, 0),
    },
};