import { doc, DocumentReference } from '@firebase/firestore';
import { PRODUCTS_COLLECTION, TProduct } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeDocumentQuery } from '~/composables/vueQuery';

const getProductById = (id: string) => {
  const firestore = useFirestore();

  return doc(firestore, PRODUCTS_COLLECTION, id) as DocumentReference<TProduct>;
};

export const useGetProductByIdQuery = (id: string) => {
  return useRealtimeDocumentQuery([PRODUCTS_COLLECTION, id], getProductById(id));
};
