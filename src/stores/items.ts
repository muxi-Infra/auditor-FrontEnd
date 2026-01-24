import { Item } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ItemStore {
  items: Item[];
  originalItems: Item[];
  currentPage: number;
  pageSize: number;
  setOriginalItems: (items: Item[]) => void;
  setItems: (items: Item[]) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  clearItems: () => void;
}

const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      originalItems: [],
      currentPage: 1,
      pageSize: 10,
      setOriginalItems: (items: Item[]) => set({ originalItems: items }),
      setItems: (items: Item[]) => set({ items }),
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setPageSize: (size: number) => set({ pageSize: size }),
      clearItems: () => set({ items: [], originalItems: [] }),
    }),
    {
      name: 'item-storage',
    }
  )
);

export default useItemStore;
