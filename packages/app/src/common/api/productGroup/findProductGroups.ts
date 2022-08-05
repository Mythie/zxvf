import { collection, limit, orderBy, query } from '@firebase/firestore';
import { PRODUCT_GROUPS_COLLECTION, TProductGroup } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeCollectionQuery } from '~/composables/vueQuery';

const findProductGroups = (_page = 1, perPage = 25) => {
  const firestore = useFirestore();

  return query(collection(firestore, PRODUCT_GROUPS_COLLECTION), orderBy('createdAt', 'desc'), limit(perPage));
};

export const useFindProductGroupsQuery = (page = 1, perPage = 25) => {
  return useRealtimeCollectionQuery<TProductGroup[]>(
    [PRODUCT_GROUPS_COLLECTION, { page, perPage }],
    findProductGroups(page, perPage),
    {
      keepPreviousData: true,
    },
  );
};
