import { createStore } from 'vuex';
import { useModuleA, useModuleB } from './modules';

export const useStore = createStore({
    modules: {useModuleA, useModuleB},
    state: {
        globalCount: 100,
        globalSomeName: 'globalSomeName vuex',
    },
    mutations: {},
    actions: {},
});

