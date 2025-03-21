import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string | null;
  updateUser: (updates: Partial<User>) => void;
  getToken: () => string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: {
            ...updates,
            ...state.user,
          },
        })),
      getToken: () => get().token,
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
      isLoggedIn: () => Boolean(get().token && get().user),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
