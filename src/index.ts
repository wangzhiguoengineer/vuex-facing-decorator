import { BindProperty } from './const';
import { DescriptorFactory } from './factory';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export const State = new DescriptorFactory(BindProperty.computed).makeVuexDescriptor(mapState);
export const Getter = new DescriptorFactory(BindProperty.computed).makeVuexDescriptor(mapGetters);
export const Mutation = new DescriptorFactory(BindProperty.methods).makeVuexDescriptor(mapMutations);
export const Action = new DescriptorFactory(BindProperty.methods).makeVuexDescriptor(mapActions);

export function namespace(namespace?: string) {
    return {
        State: new DescriptorFactory(BindProperty.computed, namespace).makeVuexDescriptor(mapState),
        Getter: new DescriptorFactory(BindProperty.computed, namespace).makeVuexDescriptor(mapGetters),
        Mutation: new DescriptorFactory(BindProperty.methods, namespace).makeVuexDescriptor(mapMutations),
        Action: new DescriptorFactory(BindProperty.methods, namespace).makeVuexDescriptor(mapActions),
    };
}
