import { collection, limit, orderBy, query } from '@firebase/firestore';
import { DEVICES_COLLECTION, TProductGroup } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeCollectionQuery } from '~/composables/vueQuery';

const findDevices = (_page = 1, perPage = 25) => {
  const firestore = useFirestore();

  return query(collection(firestore, DEVICES_COLLECTION), orderBy('createdAt', 'desc'), limit(perPage));
};

export const useFindDevicesQuery = (page = 1, perPage = 25) => {
  return useRealtimeCollectionQuery<TProductGroup[]>(
    [DEVICES_COLLECTION, { page, perPage }],
    findDevices(page, perPage),
    {
      keepPreviousData: true,
    },
  );
};
