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
        private namespaced?: string,
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
            this.namespaced = b?.namespaced;
        }
        if (typeof a === 'string') {
            // a=fromKey, b=opts
            return this.handleVuexDecorator(a);
        }
        if (typeof a === 'function') {
            // a=fromFn, b=opts
            return this.handleVuexDecorator(a);
        }
        if (typeof b === 'string') {
            // b=toKey=fromKey
            return this.handleVuexDecorator(b)(a, b);
        }
    }

    /**
     * 处理vuex装饰器
     * @param fromKey
     * @private
     */
    private handleVuexDecorator(fromKey?: any) {
        return createDecorator((options, toKey) => {
            options[this.bindProperty] ??= {};
            const params = {[toKey]: fromKey ?? toKey};
            const mapHelper = this.namespaced
                ? this.vuexMapHelper(this.namespaced, params)
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
