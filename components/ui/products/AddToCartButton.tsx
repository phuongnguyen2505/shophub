'use client';

import { LuShoppingCart } from "react-icons/lu";

interface AddToCartButtonProps {
    onAddToCart: () => void;
    disabled?: boolean;
}

export default function AddToCartButton({ onAddToCart, disabled = false }: AddToCartButtonProps) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onAddToCart();
            }}
            disabled={disabled}
            className="flex justify-center gap-2 items-center mt-4 w-full bg-[#272e3f] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            <LuShoppingCart />Add to Cart
        </button>
    );
}