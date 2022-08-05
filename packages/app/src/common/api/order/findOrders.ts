import { collection, limit, orderBy, query } from '@firebase/firestore';
import { ORDERS_COLLECTION, TProductGroup } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeCollectionQuery } from '~/composables/vueQuery';

const findOrders = (_page = 1, perPage = 25) => {
  const firestore = useFirestore();

  return query(collection(firestore, ORDERS_COLLECTION), orderBy('createdAt', 'desc'), limit(perPage));
};

export const useFindOrdersQuery = (page = 1, perPage = 25) => {
  return useRealtimeCollectionQuery<TProductGroup[]>(
    [ORDERS_COLLECTION, { page, perPage }],
    findOrders(page, perPage),
    {
      keepPreviousData: true,
    },
  );
};
