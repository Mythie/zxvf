import { httpsCallable } from '@firebase/functions';
import { uuidv4 } from '@firebase/util';
import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  TBaseDevice,
  MaybePromise,
  DEVICES_COLLECTION,
} from '@orderdi/types';
import { useMutation, useQueryClient } from 'vue-query';

import { useFunctions } from '~/composables/firebase';

const createDevice = async (payload: TBaseDevice & { id?: string }) => {
  const { id, ...device } = payload;

  const deviceId = id || uuidv4();

  const functions = useFunctions();

  const result = await httpsCallable<CreateDeviceRequest, CreateDeviceResponse>(
    functions,
    'createDevice',
  )({
    id: deviceId,
    ...device,
  });

  return result.data;
};

export const useCreateDeviceMutation = (
  onSuccess?: (_data: CreateDeviceResponse) => MaybePromise<void>,
  onError?: (_err: unknown) => MaybePromise<void>,
) => {
  const queryClient = useQueryClient();

  return useMutation(createDevice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(DEVICES_COLLECTION);

      onSuccess && onSuccess(data);
    },

    onError: (error) => {
      onError && onError(error);
    },
  });
};
