import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string;
  updateUser: (updates: Partial<User>) => void;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  getToken: () => string;
  setToken: (token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      isLoggedIn: false,
      setLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
      getToken: () => get().token,
      setToken: (token: string) => set({ token: token }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
