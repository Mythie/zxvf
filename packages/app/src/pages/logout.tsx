import { useHead } from '@vueuse/head';
import { defineComponent, onBeforeMount, VNode } from 'vue';

import { Card } from '~/styleguide/Card';

import { useAuth } from '~/composables/firebase';
import { Dashboard } from '~/layouts/Dashboard';

export const LogoutPage = defineComponent({
  name: 'LogoutPage',

  setup() {
    useHead({
      title: 'OrderDi - Logout',
    });

    const auth = useAuth();

    onBeforeMount(() => {
      auth.signOut();
    });

    return () => (
      <main class="mx-auto flex max-w-lg flex-col items-center justify-center font-sans leading-loose">
        <Card>Have a good day!</Card>
      </main>
    );
  },
});

LogoutPage.getLayout = (children: VNode) => <Dashboard>{children}</Dashboard>;

export default LogoutPage;
