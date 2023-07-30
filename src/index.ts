import { BindProperty } from './const';
import { DescriptorFactory } from './factory';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export const State = new DescriptorFactory(BindProperty.computed).makeVuexDescriptor(mapState);
export const Getter = new DescriptorFactory(BindProperty.computed).makeVuexDescriptor(mapGetters);
export const Mutation = new DescriptorFactory(BindProperty.methods).makeVuexDescriptor(mapMutations);
export const Action = new DescriptorFactory(BindProperty.methods).makeVuexDescriptor(mapActions);

export function namespace(namespaced?: string) {
    return {
        State: new DescriptorFactory(BindProperty.computed, namespaced).makeVuexDescriptor(mapState),
        Getter: new DescriptorFactory(BindProperty.computed, namespaced).makeVuexDescriptor(mapGetters),
        Mutation: new DescriptorFactory(BindProperty.methods, namespaced).makeVuexDescriptor(mapMutations),
        Action: new DescriptorFactory(BindProperty.methods, namespaced).makeVuexDescriptor(mapActions),
    };
}
