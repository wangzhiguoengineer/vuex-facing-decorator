import { FromKey, Opts, StoreFactory, VuexMapHelper } from '../types';
import { BindProperty } from '../const';
import { createDecorator } from 'vue-facing-decorator';

export class VuexFactory implements StoreFactory {
    constructor(
        private bindProperty: BindProperty,
        private mapHelper: VuexMapHelper,
        private namespace?: string,
    ) {
    }

    make(fromKey: FromKey, opts?: Opts) {
        return createDecorator((options, toKey) => {
            options[this.bindProperty] ??= {};
            const params = {[toKey]: fromKey ?? toKey};
            const namespace = opts?.namespace ? opts?.namespace : this.namespace;
            const mapHelper = namespace
                ? this.mapHelper(namespace, params)
                : this.mapHelper(params);
            const helper = mapHelper[toKey];
            switch (this.bindProperty) {
                case BindProperty.computed:
                    options[this.bindProperty][toKey] = {
                        get: helper,
                    };
                    break;
                case BindProperty.methods:
                    options[this.bindProperty][toKey] = helper;
                    break;
                default:
                    break;
            }
        }, {preserve: false});
    }
}

export function createVuexFactory(bindProperty: BindProperty, mapHelper: VuexMapHelper, namespace?: string) {
    return new VuexFactory(bindProperty, mapHelper, namespace);
}
