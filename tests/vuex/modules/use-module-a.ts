export const useModuleA = {
    namespaced: true,
    state: () => ({
        count: 0,
        someName: 'someName vuex'
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
    },
    mutations: {
        increment(state, count) {
            state.count += count;
        }
    },
    actions: {
        actionIncrement(context, count) {
            context.commit('increment', count);
        }
    }
};
