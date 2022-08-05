import { defineComponent, PropType, toRefs, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import { DashboardSidebar } from '~/components/DashboardSidebar';
import { DashboardSidebarMenuItem } from '~/components/DashboardSidebarMenuItem';
import { DashboardSidebarProfile } from '~/components/DashboardSidebarProfile';
import { useIsAuthenticated } from '~/composables/authentication';

import CubeIcon from '~icons/heroicons-outline/cube';
import DeviceTabletIcon from '~icons/heroicons-outline/device-tablet';
import HomeIcon from '~icons/heroicons-outline/home';
import LogoutIcon from '~icons/heroicons-outline/logout';
import ShoppingCartIcon from '~icons/heroicons-outline/shopping-cart';
import TruckIcon from '~icons/heroicons-outline/truck';
import ViewBoardsIcon from '~icons/heroicons-outline/view-boards';

export interface DashboardLayoutProps {
  redirectTo: string;
}

export const DashboardLayout = defineComponent({
  name: 'DashboardLayout',

  props: {
    redirectTo: {
      type: String as PropType<DashboardLayoutProps['redirectTo']>,
      default: '/login',
    },
  },

  setup(props, { slots }) {
    const { redirectTo } = toRefs(props);

    const router = useRouter();
    const { loading, authenticated, user } = toRefs(useIsAuthenticated());

    watchEffect(() => {
      console.log({ loading: loading.value, authenticated: authenticated.value });
      if (!loading.value && !authenticated.value) {
        router.push(redirectTo.value);
      }
    });

    return () => {
      if (loading.value || !authenticated.value) {
        return <div>Loading...</div>;
      }

      return (
        <main class="flex min-h-screen w-full">
          <DashboardSidebar class="max-h-screen w-80 flex-shrink-0 border-r bg-white">
            {{
              default: () => (
                <>
                  <DashboardSidebarMenuItem color={'blue'} to="/" label="Home" icon={HomeIcon} />
                  <DashboardSidebarMenuItem color={'orange'} to="/products" label="Products" icon={ShoppingCartIcon} />
                  <DashboardSidebarMenuItem
                    color={'green'}
                    to="/product-groups"
                    label="Product Groups"
                    icon={CubeIcon}
                  />
                  <DashboardSidebarMenuItem color={'indigo'} to="/menu" label="Menu" icon={ViewBoardsIcon} />
                  <DashboardSidebarMenuItem color={'purple'} to="/orders" label="Orders" icon={TruckIcon} />
                  <DashboardSidebarMenuItem color={'red'} to="/devices" label="Devices" icon={DeviceTabletIcon} />
                </>
              ),

              footer: () => (
                <>
                  <DashboardSidebarMenuItem color="gray" to="/logout" label="Logout" icon={LogoutIcon} />

                  <div class="-mx-3 -mb-3 -mt-1 border-t">
                    {user.value && (
                      <DashboardSidebarProfile user={user.value}>
                        <RouterLink
                          to="/account/profile"
                          class="block w-full min-w-[150px] rounded px-5 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </RouterLink>
                        <RouterLink
                          to="/account/settings"
                          class="block w-full min-w-[150px] rounded px-5 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </RouterLink>
                      </DashboardSidebarProfile>
                    )}
                  </div>
                </>
              ),
            }}
          </DashboardSidebar>

          <section class="relative flex flex-1 flex-col">
            {/* <div class="absolute top-0 left-0 z-0 h-[40vh] w-full bg-gray-600" /> */}

            <header class="z-10 flex h-16 items-center justify-between border-b bg-white px-4 py-3">
              {slots.header ? (
                slots.header()
              ) : (
                <h1 class="text-lg font-medium text-gray-700">{slots.title ? slots.title() : 'Dashboard'}</h1>
              )}
            </header>

            <div class="z-10 max-h-[calc(100vh-4rem)] overflow-y-auto p-5">{slots.default && slots.default()}</div>
          </section>
        </main>
      );
    };
  },
});
