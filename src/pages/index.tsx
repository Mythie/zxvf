import { useHead } from '@vueuse/head';
import { defineAsyncComponent, defineComponent } from 'vue';

import logo from '../assets/logo.png';

export const IndexPage = defineComponent({
  name: 'IndexPage',

  setup() {
    useHead({
      title: 'Hello World - Homepage',
    });

    const HelloWorld = defineAsyncComponent(() => import('../components/HelloWorld').then((m) => m.HelloWorld));

    return () => (
      <main class="flex flex-col items-center justify-center max-w-lg mx-auto font-sans leading-loose">
        <img alt="Vue logo" src={logo} class="w-16 pb-5 animate-bounce" />

        <HelloWorld class="text-center" msg="Hello Vue 3 + TypeScript + Vite" />
      </main>
    );
  },
});

export default IndexPage;
