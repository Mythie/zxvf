import { User } from '@firebase/auth';
import { reactive } from 'vue';

import { useAuth } from './firebase';

export interface IsAuthenticatedState {
  loading: boolean;
  authenticated: boolean;
  user: User | null;
}

const state = reactive<IsAuthenticatedState>({
  loading: true,
  authenticated: false,
  user: null,
});

export const useIsAuthenticated = (): Readonly<IsAuthenticatedState> => {
  const auth = useAuth();

  if (auth.currentUser) {
    state.user = auth.currentUser;
    state.authenticated = true;
    state.loading = false;
  }

  auth.onAuthStateChanged((user) => {
    state.user = user;
    state.authenticated = !!user;
    state.loading = false;

    console.log('auth.onAuthStateChanged', { user, state: { ...state } });
  });

  return state;
};
