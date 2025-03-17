import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string;
  updateUser: (updates: Partial<User>) => void;
  getToken: () => string;
  setToken: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: {
            ...updates,
            ...state.user,
          },
        })),
      getToken: () => get().token,
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: '' }),
      isLoggedIn: () => Boolean(get().token && get().user),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
