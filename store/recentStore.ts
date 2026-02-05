import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface RecentState {
    viewedItems: Product[];
    addViewedItem: (product: Product) => void;
}

export const useRecentStore = create<RecentState>()(
    persist(
        (set) => ({
            viewedItems: [],
            addViewedItem: (product) => set((state) => {
                const filtered = state.viewedItems.filter(item => item.id !== product.id);
                return { viewedItems: [product, ...filtered].slice(0, 5) };
            }),
        }),
        { name: 'recent-viewed', storage: createJSONStorage(() => localStorage) }
    )
);