import { doc, DocumentReference } from '@firebase/firestore';
import { ORDERS_COLLECTION, TOrder } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeDocumentQuery } from '~/composables/vueQuery';

const getOrderById = (id: string) => {
  const firestore = useFirestore();

  return doc(firestore, ORDERS_COLLECTION, id) as DocumentReference<TOrder>;
};

export const useGetOrderByIdQuery = (id: string) => {
  return useRealtimeDocumentQuery([ORDERS_COLLECTION, id], getOrderById(id));
};
