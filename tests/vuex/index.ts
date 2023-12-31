import { createStore } from 'vuex';
import { A, B } from './modules';

export const useStore = createStore({
    modules: {A, B},
    state: {
        name: 'g',
        count: 1000,
    },
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
});

