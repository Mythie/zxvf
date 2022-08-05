import { DocumentData, DocumentReference, onSnapshot, Query } from 'firebase/firestore';
import { watchEffect } from 'vue';
import { useQuery, useQueryClient, UseQueryOptions } from 'vue-query';

const noop = <T>() =>
  new Promise<T>(() => {
    // noop
  });

export const useRealtimeCollectionQuery = <T, U = DocumentData>(
  key: string | unknown[],
  query: Query<U>,
  options: UseQueryOptions<T> = {},
) => {
  const client = useQueryClient();

  watchEffect(() => {
    const unsubscribe = onSnapshot(query, (q) => {
      client.setQueryData(
        key,
        q.docs.map((d) => ({ id: d.id, ...d.data() })),
      );

      q.docs.forEach((d) => {
        client.setQueryData(`${key}/${d.id}`, { id: d.id, ...d.data() });
      });
    });

    return () => {
      unsubscribe();
    };
  });

  return useQuery<T>(key, () => noop<T>(), {
    retry: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useRealtimeDocumentQuery = <T, U = DocumentData>(
  key: string | unknown[],
  document: DocumentReference<U>,
  options: UseQueryOptions<T> = {},
) => {
  const client = useQueryClient();

  watchEffect(() => {
    const unsubscribe = onSnapshot(document, (d) => {
      client.setQueryData(key, { id: d.id, ...d.data() });
    });

    return () => {
      unsubscribe();
    };
  });

  return useQuery<T>(key, () => noop<T>(), {
    retry: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
