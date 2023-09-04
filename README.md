# vuex-facing-decorator

Binding helpers for [Vuex](https://github.com/vuejs/vuex)
and [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)

Designed for vue 3, do the same work like [vuex-class](https://github.com/ktsn/vuex-class).

Welcome to suggest and contribute.

## Installation

```shell
npm i vuex-facing-decorator
```

## Dependencies

- [Vuex](https://github.com/vuejs/vuex)
- [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)

## Example

```typescript
import { h } from 'vue';
import { Component, Vue } from 'vue-facing-decorator';
import { Action, Getter, Mutation, namespace, State } from 'vuex-facing-decorator';

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
```

## Discussion

To discord [https://discord.gg/DWvyAtua99](https://discord.gg/DWvyAtua99)
