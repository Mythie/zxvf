import { TBaseOrder, TOrder } from '../../models';

export interface CreateOrderRequest extends TBaseOrder {
  id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateOrderResponse extends TOrder {}
