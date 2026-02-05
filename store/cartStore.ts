import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem extends Product {
    quantity: number;
    finalPrice: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, finalPrice: number) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product: Product, finalPrice?: number) =>
                set((state) => {
                    const price = finalPrice || product.price;
                    const existingItem = state.items.find((item) => item.id === product.id);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        state.items.push({
                            ...product,
                            finalPrice: price,
                            quantity: 1,
                        });
                    }
                    return state;
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === productId ? { ...item, quantity } : item
                        )
                        .filter((item) => item.quantity > 0),
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);