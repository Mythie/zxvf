import { useHead } from '@vueuse/head';
import { defineAsyncComponent, defineComponent, VNode } from 'vue';

import logo from '../assets/logo.png';

import { Default } from '~/layouts/Default';

export const IndexPage = defineComponent({
  name: 'IndexPage',

  setup() {
    useHead({
      title: 'Hello World - Homepage',
    });

    const HelloWorld = defineAsyncComponent(() => import('../components/HelloWorld').then((m) => m.HelloWorld));

    return () => (
      <main class="mx-auto flex max-w-lg flex-col items-center justify-center font-sans leading-loose">
        <img alt="Vue logo" src={logo} class="w-16 animate-bounce pb-5" />

        <HelloWorld class="text-center" msg="Hello Vue 3 + TypeScript + Vite" />
      </main>
    );
  },
});

IndexPage.getLayout = (children: VNode) => <Default>{children}</Default>;

export default IndexPage;
