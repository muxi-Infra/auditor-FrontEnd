import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string | null;
  updateUser: (updates: User) => void;
  getToken: () => string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      updateUser: (updates: User) =>
        set((state) => ({
          user: {
           
            ...state.user,
             ...updates,
          },
        })),
      getToken: () => get().token,
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
