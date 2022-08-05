import { useHead } from '@vueuse/head';
import { defineComponent, ref, VNode } from 'vue';
import { RouterLink } from 'vue-router';

import { Button } from '~/styleguide/Button';
import { Table } from '~/styleguide/Table';
import { TableColumn } from '~/styleguide/Table/Table.types';

import { useFindDevicesQuery } from '~/common/api/device/findDevices';
import { Dashboard } from '~/layouts/Dashboard';

import PlusIcon from '~icons/heroicons-outline/plus';

export const DevicesIndexPage = defineComponent({
  name: 'DevicesIndexPage',

  setup() {
    useHead({
      title: 'Hello World - Homepage',
    });

    const { data, isLoading, isError } = useFindDevicesQuery();

    const columns = ref<TableColumn[]>([
      {
        prop: 'id',
        label: 'ID',
        type: 'id',
      },
      {
        prop: 'name',
        label: 'Name',
      },
    ]);

    return () => (
      <main class="mx-auto flex flex-col items-center justify-center font-sans leading-loose">
        {/* <pre class="m-3 rounded-md border p-3 font-mono">{JSON.stringify(data.value, null, 2)}</pre> */}

        <Table class="shadow-sm" columns={columns.value} data={data.value} />
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
