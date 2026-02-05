'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ui/products/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    const category = slug.replace(/-/g, ' ').toUpperCase();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/products/category/${slug}?limit=100`
                );
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    const sortedProducts = useCallback(() => {
        const sorted = [...products];
        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
            default:
                return sorted;
        }
    }, [products, sortBy])();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-slate-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2 capitalize">
                        {category}
                    </h1>
                    <p className="text-slate-600">
                        Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Sort Controls */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-lg text-slate-600 mb-4">No products found in this category</p>
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}