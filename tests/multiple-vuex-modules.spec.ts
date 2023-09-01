import 'mocha';
import { expect } from 'chai';
import { Component, Vue } from 'vue-facing-decorator';
import { shallowMount } from '@vue/test-utils';
import { useStore } from './vuex';
import { State } from '../src';
import { h } from 'vue';

@Component
class Tests extends Vue {
    @State('someName', { namespace: 'useModuleA' }) // Module A
    readonly someNameA!: string;

    @State('someNameB', { namespace: 'useModuleB' }) // Module B
    readonly someNameB!: string;

    render() {
        return h('div');
    }
}

describe('test with 2 different namespaced modules', () => {
    const wrapper = shallowMount(Tests, {
        global: {
            plugins: [useStore]
        }
    });
    const vm = wrapper.vm as any;
    it('State:useModuleA:someName', function () {
        expect(vm.someNameA).to.equal('someName vuex');
    });
    it('State:useModuleB:someNameB', function () {
        expect(vm.someNameB).to.equal('someName vuex B');
    });
});
