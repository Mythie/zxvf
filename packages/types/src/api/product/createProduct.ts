import { TBaseProduct, TProduct } from '../../models';

export interface CreateProductRequest extends TBaseProduct {
  id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateProductResponse extends TProduct {}
