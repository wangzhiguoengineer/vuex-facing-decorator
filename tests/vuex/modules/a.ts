export const A = {
    namespaced: true,
    state: () => ({
        name: 'a',
        count: 100,
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
