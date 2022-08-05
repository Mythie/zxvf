import { uuidv4 } from '@firebase/util';
import {
  CreateProductRequest,
  CreateProductResponse,
  ZBaseProduct,
  TProduct,
  PRODUCTS_COLLECTION,
} from '@orderdi/types';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

export const createProductHandler = async (data: CreateProductRequest): Promise<CreateProductResponse> => {
  const firestore = getFirestore();

  const id = data.id || uuidv4();
  const parsed = ZBaseProduct.safeParse(data);

  if (!parsed.success) {
    throw new functions.https.HttpsError('invalid-argument', parsed.error.message);
  }

  const productRef = firestore.collection(PRODUCTS_COLLECTION).doc(id);

  const { exists } = await productRef.get();

  if (exists) {
    throw new functions.https.HttpsError('invalid-argument', 'Product already exists');
  }

  // We do this to avoid imprecision between createdAt and updatedAt
  const now = Date.now();

  const product: TProduct = {
    id,
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  await productRef.create(product);

  return product;
};

export const createProduct = functions.https.onCall(createProductHandler);
