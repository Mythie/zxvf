import { doc, DocumentReference } from '@firebase/firestore';
import { PRODUCT_GROUPS_COLLECTION, TProduct } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeDocumentQuery } from '~/composables/vueQuery';

const getProductById = (id: string) => {
  const firestore = useFirestore();

  return doc(firestore, PRODUCT_GROUPS_COLLECTION, id) as DocumentReference<TProduct>;
};

export const useGetProductByIdQuery = (id: string) => {
  return useRealtimeDocumentQuery([PRODUCT_GROUPS_COLLECTION, id], getProductById(id));
};
