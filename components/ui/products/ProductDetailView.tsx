'use client';

import { Product } from "@/types";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useAnimation } from "@/context/AppProviders";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProductsGrid from "./RelatedProductsGrid";

interface ProductDetailViewProps {
    product: Product;
    images: string[];
    finalPrice: number;
    relatedProducts: Product[];
}

export default function ProductDetailView({
    product,
    images,
    finalPrice,
    relatedProducts,
}: ProductDetailViewProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const mainImageRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const { triggerAnimation } = useAnimation();
    const addItem = useCartStore((state) => state.addItem);
    const user = useAuthStore((state) => state.user);

    const handleAddToCart = useCallback(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (mainImageRef.current) {
            const rect = mainImageRef.current.getBoundingClientRect();
            triggerAnimation({
                imageSrc: images[selectedImage],
                startRect: rect,
            });
        }

        addItem(product, finalPrice);
    }, [user, product, finalPrice, addItem, triggerAnimation, router, images, selectedImage]);

    const hasDiscount = product.discountPercentage > 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <ProductBreadcrumb category={product.category} title={product.title} />
                <div className="grid gap-8 lg:grid-cols-12 mb-10">
                    <div className="lg:col-span-7">
                        <ProductImageGallery
                            images={images}
                            title={product.title}
                            discount={product.discountPercentage}
                            selectedImage={selectedImage}
                            onSelectImage={setSelectedImage}
                            imageRef={mainImageRef}
                        />
                    </div>
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24">
                            <ProductInfo
                                product={product}
                                finalPrice={finalPrice}
                                hasDiscount={hasDiscount}
                                isWishlisted={isWishlisted}
                                onAddToCart={handleAddToCart}
                                onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-10">
                    <ProductTabs
                        description={product.description}
                        specs={[
                            { label: "Brand", value: product.brand },
                            { 
                                label: "Category", 
                                value: product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                            },
                            { label: "Rating", value: product.rating.toFixed(1) },
                            { label: "Stock", value: String(product.stock) },
                            { label: "Discount", value: `${product.discountPercentage.toFixed(0)}%` },
                        ]}
                    />
                </div>
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Product Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.sku && (
                            <InfoCard 
                                title="SKU" 
                                text={product.sku} 
                            />
                        )}
                        {product.weight && (
                            <InfoCard 
                                title="Weight" 
                                text={`${product.weight} kg`}
                            />
                        )}
                        {product.dimensions && (
                            <InfoCard 
                                title="Dimensions" 
                                text={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
                            />
                        )}
                        {product.warrantyInformation && (
                            <InfoCard 
                                title="Warranty" 
                                text={product.warrantyInformation}
                            />
                        )}
                        {product.shippingInformation && (
                            <InfoCard 
                                title="Shipping" 
                                text={product.shippingInformation}
                            />
                        )}
                        {product.returnPolicy && (
                            <InfoCard 
                                title="Return Policy" 
                                text={product.returnPolicy}
                            />
                        )}
                        {product.minimumOrderQuantity && product.minimumOrderQuantity > 1 && (
                            <InfoCard 
                                title="Minimum Order" 
                                text={`${product.minimumOrderQuantity} units`}
                            />
                        )}
                        {product.tags && product.tags.length > 0 && (
                            <InfoCard 
                                title="Tags" 
                                text={product.tags.join(", ")}
                            />
                        )}
                    </div>
                </div>
                {relatedProducts.length > 0 && <RelatedProductsGrid products={relatedProducts} />}
            </div>
        </div>
    );
}

function InfoCard({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 line-clamp-3">{text}</p>
        </div>
    );
}
