import { doc, DocumentReference } from '@firebase/firestore';
import { DEVICES_COLLECTION, TDevice } from '@orderdi/types';

import { useFirestore } from '~/composables/firebase';
import { useRealtimeDocumentQuery } from '~/composables/vueQuery';

const getDeviceById = (id: string) => {
  const firestore = useFirestore();

  return doc(firestore, DEVICES_COLLECTION, id) as DocumentReference<TDevice>;
};

export const useGetDeviceByIdQuery = (id: string) => {
  return useRealtimeDocumentQuery([DEVICES_COLLECTION, id], getDeviceById(id));
};
