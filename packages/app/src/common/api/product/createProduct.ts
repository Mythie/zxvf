import { httpsCallable } from '@firebase/functions';
import { uuidv4 } from '@firebase/util';
import {
  CreateProductRequest,
  CreateProductResponse,
  TBaseProduct,
  MaybePromise,
  PRODUCTS_COLLECTION,
} from '@orderdi/types';
import { useMutation, useQueryClient } from 'vue-query';

import { useFunctions } from '~/composables/firebase';

const createProduct = async (payload: TBaseProduct & { id?: string }) => {
  const { id, ...product } = payload;

  const productId = id || uuidv4();

  const functions = useFunctions();

  const result = await httpsCallable<CreateProductRequest, CreateProductResponse>(
    functions,
    'createProduct',
  )({
    id: productId,
    ...product,
  });

  return result.data;
};

export const useCreateProductMutation = (
  onSuccess?: (_data: CreateProductResponse) => MaybePromise<void>,
  onError?: (_err: unknown) => MaybePromise<void>,
) => {
  const queryClient = useQueryClient();

  return useMutation(createProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(PRODUCTS_COLLECTION);

      onSuccess && onSuccess(data);
    },

    onError: (error) => {
      onError && onError(error);
    },
  });
};
