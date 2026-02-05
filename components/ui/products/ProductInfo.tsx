'use client';

import { Product } from "@/types";
import { LuShoppingCart, LuHeart } from "react-icons/lu";

interface ProductInfoProps {
    product: Product;
    finalPrice: number;
    hasDiscount: boolean;
    isWishlisted: boolean;
    onAddToCart: () => void;
    onToggleWishlist: () => void;
}

export default function ProductInfo({
    product,
    finalPrice,
    hasDiscount,
    isWishlisted,
    onAddToCart,
    onToggleWishlist,
}: ProductInfoProps) {
    const savings = product.price - finalPrice;
    const savingsPercent = product.discountPercentage || 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full capitalize border border-blue-200 bg-blue-50 px-3 py-1 font-medium text-blue-700">
                    {product.brand}
                </span>
                <span className="rounded-full capitalize border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
                    {product.category}
                </span>
                <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-yellow-700 font-medium">
                    ⭐ {product.rating.toFixed(1)}
                </span>
            </div>
            <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                {product.title}
            </h1>
            <div className="text-sm">
                {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">✓ In stock</span>
                ) : (
                    <span className="text-red-600 font-semibold">✗ Out of stock</span>
                )}
                <span className="text-slate-400"> • </span>
                <span className="text-slate-500">{product.stock} available</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <p className="text-3xl font-bold text-gray-900">
                    ${finalPrice.toFixed(2)}
                </p>
                {hasDiscount && (
                    <>
                        <p className="text-lg text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                        </p>
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            Save ${savings.toFixed(2)} ({savingsPercent.toFixed(0)}%)
                        </span>
                    </>
                )}
            </div>
            <p className="mt-4 line-clamp-4 leading-relaxed text-slate-600">
                {product.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                    onClick={onAddToCart}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gray-800 px-5 py-3 font-bold text-white hover:bg-gray-900 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    disabled={product.stock <= 0}
                    aria-label="Add to cart"
                >
                    <LuShoppingCart size={20} />
                    {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
                </button>
                <button
                    onClick={onToggleWishlist}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3 font-medium transition-colors ${isWishlisted
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <LuHeart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    Wishlist
                </button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                <MiniStat label="Secure" value="Checkout" />
                <MiniStat label="Fast" value="Delivery" />
                <MiniStat label="Easy" value="Returns" />
            </div>
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
            <div className="text-slate-600 font-medium">{label}</div>
            <div className="font-bold text-slate-900">{value}</div>
        </div>
    );
}
