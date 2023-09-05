import { BindProperty as B } from './const';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { createPropertyDescriptor, createVuexFactory } from './factory';

export const State = createPropertyDescriptor(createVuexFactory(B.computed, mapState));
export const Getter = createPropertyDescriptor(createVuexFactory(B.computed, mapGetters));
export const Mutation = createPropertyDescriptor(createVuexFactory(B.methods, mapMutations));
export const Action = createPropertyDescriptor(createVuexFactory(B.methods, mapActions));

export function namespace(namespace?: string) {
    return {
        State: createPropertyDescriptor(createVuexFactory(B.computed, mapState, namespace)),
        Getter: createPropertyDescriptor(createVuexFactory(B.computed, mapGetters, namespace)),
        Mutation: createPropertyDescriptor(createVuexFactory(B.methods, mapMutations, namespace)),
        Action: createPropertyDescriptor(createVuexFactory(B.methods, mapActions, namespace)),
    };
}
