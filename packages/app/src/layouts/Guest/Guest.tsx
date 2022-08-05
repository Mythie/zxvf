import { defineComponent, PropType, toRefs, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { useIsAuthenticated } from '~/composables/authentication';

export interface GuestLayoutProps {
  redirectTo: string;
}

export const GuestLayout = defineComponent({
  name: 'GuestLayout',

  props: {
    redirectTo: {
      type: String as PropType<GuestLayoutProps['redirectTo']>,
      default: '/',
    },
  },

  setup(props, { slots }) {
    const { redirectTo } = toRefs(props);

    const router = useRouter();

    const { loading, authenticated } = toRefs(useIsAuthenticated());

    watchEffect(() => {
      if (!loading.value && authenticated.value) {
        router.push(redirectTo.value);
      }
    });

    return () => {
      if (loading.value || authenticated.value) {
        return <div>Loading...</div>;
      }

      return slots.default && slots.default();
    };
  },
});
