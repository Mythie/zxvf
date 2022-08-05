import { doc, DocumentReference } from '@firebase/firestore';
import { PRODUCT_GROUPS_COLLECTION, TProductGroup } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeDocumentQuery } from '~/composables/vueQuery';

const getProductGroupById = (id: string) => {
  const firestore = useFirestore();

  return doc(firestore, PRODUCT_GROUPS_COLLECTION, id) as DocumentReference<TProductGroup>;
};

export const useGetProductGroupByIdQuery = (id: string) => {
  return useRealtimeDocumentQuery([PRODUCT_GROUPS_COLLECTION, id], getProductGroupById(id));
};
