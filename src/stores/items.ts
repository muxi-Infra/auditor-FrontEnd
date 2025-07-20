import { Item } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ItemStore {
  items: Item[];
  originalItems:Item[];
  setOriginalItems: (items: Item[]) => void;
  setItems: (items: Item[]) => void;
  clearItems: () => void;
}

const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      originalItems:[],
      setOriginalItems: (items: Item[]) => set({ originalItems: items }),
      setItems: (items: Item[]) => set({ items }),
      clearItems: () => set({ items: [] ,originalItems:[] }),
    }),
    {
      name: 'item-storage',
    }
  )
);

export default useItemStore;