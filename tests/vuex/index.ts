import { createStore } from 'vuex';
import { useModuleA } from './modules';

export const useStore = createStore({
    modules: {useModuleA},
    state: {
        globalCount: 100,
        globalSomeName: 'globalSomeName vuex',
    },
    mutations: {},
    actions: {},
});

