import 'mocha';
import { expect } from 'chai';
import { Component, Vue } from 'vue-facing-decorator';
import { shallowMount } from '@vue/test-utils';
import { useStore } from './vuex';
import { Action, Getter, Mutation, namespace, State } from '../src';
import { h } from 'vue';

global.SVGElement = window.SVGElement;

const ModuleA = namespace('A');
const ModuleB = namespace('B');

@Component
class Tests extends Vue {
    // module global
    @State name;
    @State count;
    @Getter doubleCount;
    @Mutation mutationsIncrement;
    @Action actionIncrement;
    // module namespace_a
    @State('name', {namespace: 'A'}) namespace_a_name;
    @State('count', {namespace: 'A'}) namespace_a_count;
    @Getter('doubleCount', {namespace: 'A'}) namespace_a_doubleCount;
    @Mutation('mutationsIncrement', {namespace: 'A'}) namespace_a_mutationsIncrement;
    @Action('actionIncrement', {namespace: 'A'}) namespace_a_actionIncrement;
    // module namespace_b
    @State('name', {namespace: 'B'}) namespace_b_name;
    @State('count', {namespace: 'B'}) namespace_b_count;
    @Getter('doubleCount', {namespace: 'B'}) namespace_b_doubleCount;
    @Mutation('mutationsIncrement', {namespace: 'B'}) namespace_b_mutationsIncrement;
    @Action('actionIncrement', {namespace: 'B'}) namespace_b_actionIncrement;
    // module module_a
    @ModuleA.State('name') module_a_name;
    @ModuleA.State('count') module_a_count;
    @ModuleA.Getter('doubleCount') module_a_doubleCount;
    @ModuleA.Mutation('mutationsIncrement') module_a_mutationsIncrement;
    @ModuleA.Action('actionIncrement') module_a_actionIncrement;
    // module module_b
    @ModuleB.State('name') module_b_name;
    @ModuleB.State('count') module_b_count;
    @ModuleB.Getter('doubleCount') module_b_doubleCount;
    @ModuleB.Mutation('mutationsIncrement') module_b_mutationsIncrement;
    @ModuleB.Action('actionIncrement') module_b_actionIncrement;
    // module a2b
    @ModuleA.State('name', {namespace: 'B'}) a2b_name;
    @ModuleA.State('count', {namespace: 'B'}) a2b_count;
    @ModuleA.Getter('doubleCount', {namespace: 'B'}) a2b_doubleCount;
    @ModuleA.Mutation('mutationsIncrement', {namespace: 'B'}) a2b_mutationsIncrement;
    @ModuleA.Action('actionIncrement', {namespace: 'B'}) a2b_actionIncrement;

    render() {
        return h('div', [
            h('div', {class: 'g'}, this.count),
            h('div', {class: 'namespace_a'}, this.namespace_a_count),
            h('div', {class: 'namespace_b'}, this.namespace_b_count),
            h('div', {class: 'module_a'}, this.module_a_count),
            h('div', {class: 'module_b'}, this.module_b_count),
            h('div', {class: 'a2b'}, this.a2b_count),
        ]);
    }
}

describe('test', () => {
    const wrapper = shallowMount(Tests, {
        global: {
            plugins: [useStore]
        }
    });
    const vm = wrapper.vm as any;
    // module global
    it('Render:g:count=1000', function () {
        expect(vm.$el.querySelector('.g').innerHTML).to.equal('1000');
    });
    it('name=g', function () {
        expect(vm.name).to.equal('g');
    });
    it('doubleCount=2000', function () {
        expect(vm.doubleCount).to.equal(2000);
    });
    it('mutationsIncrement:100=1100|4200', function () {
        vm.mutationsIncrement(100);
        expect(vm.count).to.equal(1100);
        expect(vm.doubleCount).to.equal(2200);
    });
    it('actionIncrement:100=100|200', function () {
        vm.actionIncrement(100);
        expect(vm.count).to.equal(1200);
        expect(vm.doubleCount).to.equal(2400);
    });
    // module namespace_a
    it('Render:namespace_a:count=100', function () {
        expect(vm.$el.querySelector('.namespace_a').innerHTML).to.equal('100');
    });
    it('namespace_a_name=a', function () {
        expect(vm.namespace_a_name).to.equal('a');
    });
    it('namespace_a_doubleCount=200', function () {
        expect(vm.namespace_a_doubleCount).to.equal(200);
    });
    it('namespace_a_mutationsIncrement:100=200|400', function () {
        vm.namespace_a_mutationsIncrement(100);
        expect(vm.namespace_a_count).to.equal(200);
        expect(vm.namespace_a_doubleCount).to.equal(400);
    });
    it('namespace_a_actionIncrement:100=300|600', function () {
        vm.namespace_a_actionIncrement(100);
        expect(vm.namespace_a_count).to.equal(300);
        expect(vm.namespace_a_doubleCount).to.equal(600);
    });
    // module namespace_b
    it('Render:namespace_b:count=200', function () {
        expect(vm.$el.querySelector('.namespace_b').innerHTML).to.equal('200');
    });
    it('namespace_b_name=b', function () {
        expect(vm.namespace_b_name).to.equal('b');
    });
    it('namespace_b_doubleCount=400', function () {
        expect(vm.namespace_b_doubleCount).to.equal(400);
    });
    it('namespace_b_mutationsIncrement:100=300|600', function () {
        vm.namespace_b_mutationsIncrement(100);
        expect(vm.namespace_b_count).to.equal(300);
        expect(vm.namespace_b_doubleCount).to.equal(600);
    });
    it('namespace_b_actionIncrement:100=400|800', function () {
        vm.namespace_b_actionIncrement(100);
        expect(vm.namespace_b_count).to.equal(400);
        expect(vm.namespace_b_doubleCount).to.equal(800);
    });
    // module module_a
    it('Render:module_a:count=300', function () {
        expect(vm.$el.querySelector('.module_a').innerHTML).to.equal('300');
    });
    it('module_a_name=a', function () {
        expect(vm.module_a_name).to.equal('a');
    });
    it('module_a_doubleCount=600', function () {
        expect(vm.module_a_doubleCount).to.equal(600);
    });
    it('module_a_mutationsIncrement:100=400|800', function () {
        vm.module_a_mutationsIncrement(100);
        expect(vm.module_a_count).to.equal(400);
        expect(vm.module_a_doubleCount).to.equal(800);
    });
    it('module_a_actionIncrement:100=500|1000', function () {
        vm.module_a_actionIncrement(100);
        expect(vm.module_a_count).to.equal(500);
        expect(vm.module_a_doubleCount).to.equal(1000);
    });
    // module module_b
    it('Render:module_b:count=400', function () {
        expect(vm.$el.querySelector('.module_b').innerHTML).to.equal('400');
    });
    it('module_b_name=b', function () {
        expect(vm.module_b_name).to.equal('b');
    });
    it('module_b_doubleCount=800', function () {
        expect(vm.module_b_doubleCount).to.equal(800);
    });
    it('module_b_mutationsIncrement:100=500|1000', function () {
        vm.module_b_mutationsIncrement(100);
        expect(vm.module_b_count).to.equal(500);
        expect(vm.module_b_doubleCount).to.equal(1000);
    });
    it('module_b_actionIncrement:100=600|1200', function () {
        vm.module_b_actionIncrement(100);
        expect(vm.module_b_count).to.equal(600);
        expect(vm.module_b_doubleCount).to.equal(1200);
    });
    // module a2b
    it('Render:a2b:count=600', function () {
        expect(vm.$el.querySelector('.a2b').innerHTML).to.equal('600');
    });
    it('a2b_name=b', function () {
        expect(vm.a2b_name).to.equal('b');
    });
    it('a2b_doubleCount=1200', function () {
        expect(vm.a2b_doubleCount).to.equal(1200);
    });
    it('a2b_mutationsIncrement:100=700|1400', function () {
        vm.a2b_mutationsIncrement(100);
        expect(vm.a2b_count).to.equal(700);
        expect(vm.a2b_doubleCount).to.equal(1400);
    });
    it('a2b_actionIncrement:100=800|1600', function () {
        vm.a2b_actionIncrement(100);
        expect(vm.a2b_count).to.equal(800);
        expect(vm.a2b_doubleCount).to.equal(1600);
    });
});
