import { useHead } from '@vueuse/head';
import { defineComponent, VNode } from 'vue';
import { RouterLink } from 'vue-router';

import { Button } from '~/styleguide/Button';
import { Card } from '~/styleguide/Card';

import { useFindDevicesQuery } from '~/common/api/device/findDevices';
import { Dashboard } from '~/layouts/Dashboard';

import PencilIcon from '~icons/heroicons-outline/pencil';
import PlusIcon from '~icons/heroicons-outline/plus';

export const DevicesIndexPage = defineComponent({
  name: 'DevicesIndexPage',

  setup() {
    useHead({
      title: 'Hello World - Homepage',
    });

    const { data, isLoading, isError } = useFindDevicesQuery();

    return () => (
      <main class="mx-auto flex flex-col items-center justify-center font-sans leading-loose">
        <div class="flex w-full flex-wrap gap-4">
          {data.value?.map((device) => (
            <Card class="w-1/4">
              {{
                title: () => (
                  <div class="flex items-start gap-x-4 pb-3">
                    <h4 class="flex-1 text-lg font-medium leading-tight">{device.name}</h4>

                    <div class="relative w-8">
                      <RouterLink
                        to={`/devices/${device.id}`}
                        class="absolute inset-0 flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-400 hover:bg-blue-200"
                      >
                        <PencilIcon />
                      </RouterLink>
                    </div>
                  </div>
                ),

                default: () => (
                  <>
                    <p class="text-sm">{device.description || 'Lorem ipsum dolar amut volar'}</p>

                    <div class="mt-3 text-sm text-gray-500">
                      Last updated {device.updatedAt ? new Date(device.updatedAt).toLocaleString() : 'never'}
                    </div>
                  </>
                ),
              }}
            </Card>
          ))}
        </div>
      </main>
    );
  },
});

DevicesIndexPage.getLayout = (children: VNode) => (
  <Dashboard>
    {{
      header: () => (
        <>
          <h1 class="text-lg font-medium text-gray-700">Devices</h1>

          <RouterLink to="/devices/new">
            <Button variant={'secondary'} size={'md'} rightIcon={<PlusIcon />}>
              New
            </Button>
          </RouterLink>
        </>
      ),
      default: () => children,
    }}
  </Dashboard>
);

export default DevicesIndexPage;
