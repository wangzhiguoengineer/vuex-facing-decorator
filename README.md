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
import { namespace, State } from 'vuex-facing-decorator';

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
```

## Discussion

To discord [https://discord.gg/CuK79ede](https://discord.gg/CuK79ede)
