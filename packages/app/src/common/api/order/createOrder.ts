import { httpsCallable } from '@firebase/functions';
import { uuidv4 } from '@firebase/util';
import { CreateOrderRequest, CreateOrderResponse, TBaseOrder, MaybePromise, ORDERS_COLLECTION } from '@orderdi/types';
import { useMutation, useQueryClient } from 'vue-query';

import { useFunctions } from '~/composables/firebase';

const createOrder = async (payload: TBaseOrder & { id?: string }) => {
  const { id, ...order } = payload;

  const orderId = id || uuidv4();

  const functions = useFunctions();

  const result = await httpsCallable<CreateOrderRequest, CreateOrderResponse>(
    functions,
    'createOrder',
  )({
    id: orderId,
    ...order,
  });

  return result.data;
};

export const useCreateOrderMutation = (
  onSuccess?: (_data: CreateOrderResponse) => MaybePromise<void>,
  onError?: (_err: unknown) => MaybePromise<void>,
) => {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(ORDERS_COLLECTION);

      onSuccess && onSuccess(data);
    },

    onError: (error) => {
      onError && onError(error);
    },
  });
};
