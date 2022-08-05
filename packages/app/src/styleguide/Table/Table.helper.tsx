import { NormalizedTableColumn, TableColumn } from './Table.types';

const idFormatter = (value: any) => {
  return (
    <div class="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap font-mono" title={String(value)}>
      {String(value)}
    </div>
  );
};

const stringFormatter = (value: any) => {
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
};

const numberFormatter = (value: any) => {
  return Number(value).toLocaleString();
};

const currencyFormatter = (value: any) => {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const formatters = {
  id: idFormatter,
  string: stringFormatter,
  number: numberFormatter,
  currency: currencyFormatter,
};

export const toNormalizedColumns = (columns: TableColumn[]): NormalizedTableColumn[] => {
  return columns.map((c) => {
    if (typeof c === 'string') {
      return {
        label: c,
        prop: c,
        headingFormatter: stringFormatter,
        cellFormatter: stringFormatter,
      };
    }

    return {
      label: c.label,
      prop: c.prop,
      headingFormatter: c.headingFormatter || stringFormatter,
      cellFormatter: c.cellFormatter || formatters[c.type || 'string'],
    };
  });
};
