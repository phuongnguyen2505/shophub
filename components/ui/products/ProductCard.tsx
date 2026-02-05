'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import { useCartStore } from '@/store/cartStore';
import { useAnimation } from '@/context/AppProviders';
import { useCallback, useRef, memo, useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { createProductSlug, calculateFinalPrice } from '@/utils/product';

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const { triggerAnimation } = useAnimation();
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const user = useAuthStore((state) => state.user);

    // Memoize calculated values
    const finalPrice = useMemo(() => 
        calculateFinalPrice(product.price, product.discountPercentage), 
        [product.price, product.discountPercentage]
    );
    
    const hasDiscount = useMemo(() => product.discountPercentage > 0, [product.discountPercentage]);
    const productUrl = useMemo(() => `/products/${createProductSlug(product)}`, [product]);

    const handleAddToCart = useCallback(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            triggerAnimation({
                imageSrc: product.thumbnail,
                startRect: rect,
            });
        }

        addItem(product, finalPrice);
    }, [user, product, finalPrice, addItem, triggerAnimation, router]);

    return (
        <article
            className="group relative flex flex-col gap-2 border border-gray-200 p-4 rounded-lg hover:shadow-lg transition-shadow bg-white"
            aria-labelledby={`product-${product.id}`}
        >
            {hasDiscount && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200">
                    -{product.discountPercentage.toFixed(0)}%
                </div>
            )}
            <Link href={productUrl} className="block" aria-label={`View ${product.title}`}>
                <div ref={imageRef} className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
            </Link>
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                        {product.brand}
                    </span>
                    <span className="text-xs text-gray-500">{product.category}</span>
                </div>
                <h3 id={`product-${product.id}`} className="text-base font-semibold text-gray-900 line-clamp-2">
                    <Link href={productUrl} className="hover:text-blue-600 transition-colors">
                        {product.title}
                    </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                    {product.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" size={14} aria-hidden="true" />
                        <span className="font-medium text-gray-900">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                    <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-gray-900">
                        ${finalPrice.toFixed(2)}
                    </p>
                    {hasDiscount && (
                        <p className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                        </p>
                    )}
                </div>
                <AddToCartButton
                    onAddToCart={handleAddToCart}
                    disabled={product.stock <= 0}
                />
            </div>
        </article>
    );
}

export default memo(ProductCard, (prevProps, nextProps) => {
    return prevProps.product.id === nextProps.product.id;
});
