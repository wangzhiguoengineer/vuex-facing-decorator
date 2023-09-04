import {
    mapActions as vuexMapActions,
    mapGetters as vuexMapGetters,
    mapMutations as vuexMapMutations,
    mapState as vuexMapState
} from 'vuex';

export type VuexMapHelper =
    typeof vuexMapState
    | typeof vuexMapGetters
    | typeof vuexMapMutations
    | typeof vuexMapActions;

export type Fn = (...args: any[]) => any;

export interface Opts {
    namespace: string
}

export type FromKey = string | Fn;

export interface StoreFactory {
    make(fromKey: FromKey, options?: Opts): any;
}
