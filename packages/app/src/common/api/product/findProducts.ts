import { collection, limit, orderBy, query } from '@firebase/firestore';
import { PRODUCTS_COLLECTION, TProduct } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeCollectionQuery } from '~/composables/vueQuery';

const findProducts = (_page = 1, perPage = 25) => {
  const firestore = useFirestore();

  return query(collection(firestore, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'), limit(perPage));
};

export const useFindProductsQuery = (page = 1, perPage = 25) => {
  return useRealtimeCollectionQuery<TProduct[]>([PRODUCTS_COLLECTION, { page, perPage }], findProducts(page, perPage), {
    keepPreviousData: true,
  });
};
