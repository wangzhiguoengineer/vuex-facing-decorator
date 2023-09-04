export const B = {
    namespaced: true,
    state: () => ({
        name: 'b',
        count: 200,
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
    },
    mutations: {
        mutationsIncrement(state, count) {
            state.count += count;
        }
    },
    actions: {
        actionIncrement(context, count) {
            context.commit('mutationsIncrement', count);
        }
    }
};
