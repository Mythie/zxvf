import { defineComponent, ref, toRefs } from 'vue';

import { Button } from '~/styleguide/Button';
import { Card } from '~/styleguide/Card';

export const HelloWorldComponent = defineComponent({
  name: 'HelloWorldComponent',

  props: {
    msg: {
      type: String,
      default: 'Hello Vue 3 + TypeScript + Vite',
    },
  },

  setup(props) {
    const { msg } = toRefs(props);

    const count = ref(0);

    return () => (
      <Card>
        <h1 class="text-2xl font-bold leading-loose">{msg.value}</h1>

        <p class="leading-loose">
          Recommended IDE setup:{' '}
          <a href="https://code.visualstudio.com/" target="_blank">
            VS Code
          </a>{' '}
          +{' '}
          <a href="https://github.com/johnsoncodehk/volar" target="_blank">
            Volar
          </a>
        </p>

        <p class="leading-loose">
          See <code>README.md</code> for more information.
        </p>

        <p class="leading-loose">
          <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Vite Docs
          </a>{' '}
          |{' '}
          <a href="https://v3.vuejs.org/" target="_blank">
            Vue 3 Docs
          </a>
        </p>

        <Button
          variant="text"
          type="button"
          onClick={() => {
            count.value += 1;
          }}
        >
          count is: {count.value}
        </Button>
        <p class="leading-loose">
          Edit <code>components/HelloWorld/HelloWorld.tsx</code> to test hot module replacement.
        </p>
      </Card>
    );
  },
});
