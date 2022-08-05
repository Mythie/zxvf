import { uuidv4 } from '@firebase/util';
import {
  CreateProductGroupRequest,
  CreateProductGroupResponse,
  ZBaseProductGroup,
  TProductGroup,
  PRODUCT_GROUPS_COLLECTION,
} from '@orderdi/types';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

export const createProductGroupHandler = async (
  data: CreateProductGroupRequest,
): Promise<CreateProductGroupResponse> => {
  const firestore = getFirestore();

  const id = data.id || uuidv4();
  const parsed = ZBaseProductGroup.safeParse(data);

  if (!parsed.success) {
    throw new functions.https.HttpsError('invalid-argument', parsed.error.message);
  }

  const productGroupRef = firestore.collection(PRODUCT_GROUPS_COLLECTION).doc(id);

  const { exists } = await productGroupRef.get();

  if (exists) {
    throw new functions.https.HttpsError('invalid-argument', 'Product Group already exists');
  }

  // We do this to avoid imprecision between createdAt and updatedAt
  const now = Date.now();

  const product: TProductGroup = {
    id,
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  await productGroupRef.create(product);

  return product;
};

export const createProductGroup = functions.https.onCall(createProductGroupHandler);
