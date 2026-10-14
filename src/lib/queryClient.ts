import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 menit
      gcTime: 1000 * 60 * 60 * 24, // 24 jam (harus >= maxAge persister)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'CODAP_REACT_QUERY_OFFLINE_CACHE',
});
