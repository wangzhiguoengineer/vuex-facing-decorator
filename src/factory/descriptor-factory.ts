import { BindProperty } from '../const';
import { createDecorator } from 'vue-facing-decorator';
import { Fn, Opts, VuexMapHelper } from '../types';

/**
 * 构建装饰器工厂
 */
export class DescriptorFactory {
    private vuexMapHelper!: VuexMapHelper;

    constructor(
        private bindProperty: BindProperty,
        private namespace?: string,
    ) {
    }

    public makeVuexDescriptor(vuexMapHelper: VuexMapHelper) {
        this.vuexMapHelper = vuexMapHelper;
        return this.vuexDescriptor.bind(this);
    }

    private vuexDescriptor(fromKey: string, opts?: Opts): any;

    private vuexDescriptor(fn: Fn, opts?: Opts): any;

    private vuexDescriptor(target: any, toKey: string): any;

    /**
     * 装饰器重载
     * @param a
     * @param b
     */
    private vuexDescriptor(a: any, b: any) {
        if (typeof b === 'object') {
            this.namespace = b?.namespace;
        }
        if (typeof a === 'string') {
            // a=fromKey, b=opts
            return this.handleVuexDecorator(a, this.namespace);
        }
        if (typeof a === 'function') {
            // a=fromFn, b=opts
            return this.handleVuexDecorator(a, this.namespace);
        }
        if (typeof b === 'string') {
            // b=toKey=fromKey
            return this.handleVuexDecorator(b, this.namespace)(a, b);
        }
    }

    /**
     * 处理vuex装饰器
     * @param fromKey
     * @param fromNs
     * @private
     */
    private handleVuexDecorator(fromKey?: any, fromNs?: any) {
        return createDecorator((options, toKey) => {
            options[this.bindProperty] ??= {};
            const params = {[toKey]: fromKey ?? toKey};
            const mapHelper = fromNs
                ? this.vuexMapHelper(fromNs, params)
                : this.vuexMapHelper(params);
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
