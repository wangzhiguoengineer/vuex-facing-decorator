import 'mocha';
import { expect } from 'chai';
import { Component, Vue } from 'vue-facing-decorator';
import { shallowMount } from '@vue/test-utils';
import { useStore } from './vuex';
import { namespace, State } from '../src';
import { h } from 'vue';

global.SVGElement = window.SVGElement;

const ModuleA = namespace('useModuleA');

@Component
class Tests extends Vue {
    @State globalSomeName;
    @State('globalCount') globalCount;
    @ModuleA.State someName;
    @ModuleA.State('count') count;
    @ModuleA.State((state, getter) => state.count + getter.doubleCount) count_doubleCount;
    @ModuleA.Getter('doubleCount') doubleCount;
    @ModuleA.Mutation('increment') increment;
    @ModuleA.Action('actionIncrement') actionIncrement;

    render() {
        return h('div', this.count);
    }
}

describe('test', () => {
    const wrapper = shallowMount(Tests, {
        global: {
            plugins: [useStore]
        }
    });
    const vm = wrapper.vm as any;
    it('State:globalCount=100', function () {
        expect(vm.globalCount).to.equal(100);
    });
    it('State:globalSomeName=globalSomeName vuex', function () {
        expect(vm.globalSomeName).to.equal('globalSomeName vuex');
    });
    it('State:someName=someName vuex', function () {
        expect(vm.someName).to.equal('someName vuex');
    });
    it('Render:0', function () {
        expect(vm.$el.innerHTML).to.equal('0');
    });
    it('State:count=0', function () {
        expect(vm.count).to.equal(0);
    });
    it('Mutation:increment(1),count=1', function () {
        vm.increment(1);
        expect(vm.count).to.equal(1);
    });
    it('Render:1', function () {
        expect(vm.$el.innerHTML).to.equal('1');
    });
    it('Getter:doubleCount=2', function () {
        expect(vm.doubleCount).to.equal(2);
    });
    it('Action:actionIncrement(10),count=11', function () {
        vm.actionIncrement(10);
        expect(vm.count).to.equal(11);
    });
    it('State:count_doubleCount=33', function () {
        expect(vm.count_doubleCount).to.equal(33);
    });
    it('Render:11', function () {
        expect(vm.$el.innerHTML).to.equal('11');
    });
});
