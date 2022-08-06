import { uuidv4 } from '@firebase/util';
import { CreateDeviceRequest, CreateDeviceResponse, ZBaseDevice, TDevice, DEVICES_COLLECTION } from '@orderdi/types';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

export const createDeviceHandler = async (data: CreateDeviceRequest): Promise<CreateDeviceResponse> => {
  const firestore = getFirestore();

  const id = data.id || uuidv4();
  const parsed = ZBaseDevice.safeParse(data);

  if (!parsed.success) {
    throw new functions.https.HttpsError('invalid-argument', parsed.error.message);
  }

  const productRef = firestore.collection(DEVICES_COLLECTION).doc(id);

  const { exists } = await productRef.get();

  if (exists) {
    throw new functions.https.HttpsError('invalid-argument', 'Device already exists');
  }

  // We do this to avoid imprecision between createdAt and updatedAt
  const now = Date.now();

  const product: TDevice = {
    id,
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  await productRef.create(product);

  return product;
};

export const createDevice = functions.https.onCall(createDeviceHandler);
