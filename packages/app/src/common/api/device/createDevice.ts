import { httpsCallable } from '@firebase/functions';
import { uuidv4 } from '@firebase/util';
import {
  CreateProductGroupRequest,
  CreateProductGroupResponse,
  TBaseProductGroup,
  MaybePromise,
  PRODUCT_GROUPS_COLLECTION,
} from '@orderdi/types';
import { useMutation, useQueryClient } from 'vue-query';

import { useFunctions } from '~/composables/firebase';

const createProductGroup = async (payload: TBaseProductGroup & { id?: string }) => {
  const { id, ...productGroup } = payload;

  const productGroupId = id || uuidv4();

  const functions = useFunctions();

  const result = await httpsCallable<CreateProductGroupRequest, CreateProductGroupResponse>(
    functions,
    'createProductGroup',
  )({
    id: productGroupId,
    ...productGroup,
  });

  return result.data;
};

export const useCreateProductGroupMutation = (
  onSuccess?: (_data: CreateProductGroupResponse) => MaybePromise<void>,
  onError?: (_err: unknown) => MaybePromise<void>,
) => {
  const queryClient = useQueryClient();

  return useMutation(createProductGroup, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(PRODUCT_GROUPS_COLLECTION);

      onSuccess && onSuccess(data);
    },

    onError: (error) => {
      onError && onError(error);
    },
  });
};
