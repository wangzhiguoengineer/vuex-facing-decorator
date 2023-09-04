import { Fn, Opts, StoreFactory } from '../types';

/**
 * 构建属性装饰器工厂
 */
export class PropertyDescriptorFactory {
    constructor(
        private storeFactory: StoreFactory
    ) {
    }

    public make() {
        return this.descriptor.bind(this);
    }

    private descriptor(fromKey: string, opts?: Opts): any;

    private descriptor(fn: Fn, opts?: Opts): any;

    private descriptor(target: any, toKey: string): any;

    /**
     * 装饰器重载
     * @param a
     * @param b
     */
    private descriptor(a: any, b: any) {
        if (typeof a === 'string') {
            // a=fromKey, b=opts
            return this.storeFactory.make(a, b);
        }
        if (typeof a === 'function') {
            // a=fromFn, b=opts
            return this.storeFactory.make(a, b);
        }
        if (typeof b === 'string') {
            // b=toKey=fromKey
            return this.storeFactory.make(b)(a, b);
        }
    }
}

/**
 * 创建属性装饰器
 * @param storeFactory
 */
export function createPropertyDescriptor(storeFactory: StoreFactory) {
    return new PropertyDescriptorFactory(storeFactory).make();
}
