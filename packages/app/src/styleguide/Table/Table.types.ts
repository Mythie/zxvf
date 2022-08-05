/* eslint-disable @typescript-eslint/no-explicit-any */

import { VNode } from 'vue';

export type TableColumnType = 'id' | 'string' | 'number' | 'currency';

export type TableColumnHeadingFormatter = (_label: string, _prop: string) => VNode | string;

export type TableColumnCellFormatter = (_value: any, _row: Record<string, unknown>) => VNode | string;

export type TableColumn =
  | string
  | {
      label: string;
      prop: string;
      type?: TableColumnType;
      headingFormatter?: TableColumnHeadingFormatter;
      cellFormatter?: TableColumnCellFormatter;
    };

export type NormalizedTableColumn = {
  label: string;
  prop: string;
  headingFormatter: TableColumnHeadingFormatter;
  cellFormatter: TableColumnCellFormatter;
};
