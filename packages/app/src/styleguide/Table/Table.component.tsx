import { computed, defineComponent, PropType, toRefs } from 'vue';

import { toNormalizedColumns } from './Table.helper';
import { TableColumn } from './Table.types';

export interface TableComponentProps {
  columns: TableColumn[];
  data: Array<Record<string, unknown>>;
  getRowKey: (_row: Record<string, unknown>) => string;
}

export const TableComponent = defineComponent({
  name: 'TableComponent',

  props: {
    columns: {
      type: Array as PropType<TableComponentProps['columns']>,
      default: [] as TableComponentProps['columns'],
    },

    data: {
      type: Array as PropType<TableComponentProps['data']>,
      default: [] as TableComponentProps['data'],
    },

    getRowKey: {
      type: Function as PropType<TableComponentProps['getRowKey']>,
      default: (row: Record<string, unknown>) => row.id,
    },
  },

  setup: (props, { slots }) => {
    const { columns, data, getRowKey } = toRefs(props);

    const normalizedColumns = computed(() => toNormalizedColumns(columns.value));

    return () => (
      <div class="w-full overflow-hidden rounded border md:rounded-lg">
        <div class="min-w-full overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {normalizedColumns.value.map((column) => (
                  <th class="py-3 px-5 text-left" key={column.prop}>
                    {column.headingFormatter(column.label, column.prop)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 bg-white">
              {data.value.map((row) => (
                <tr key={getRowKey.value(row)}>
                  {normalizedColumns.value.map((column) => (
                    <td class="px-5 py-5" key={column.prop}>
                      {column.cellFormatter(row[column.prop], row)}
                    </td>
                  ))}
                </tr>
              ))}

              {data.value.length === 0 &&
                (slots.noData?.() ?? (
                  <td colspan={columns.value.length} class="w-full p-5">
                    <div class="flex w-full items-center justify-center text-gray-600">asd</div>
                  </td>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
