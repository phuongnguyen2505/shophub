import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { createProductSlug, calculateFinalPrice, formatMoney } from "@/utils/product";

interface RelatedProductsGridProps {
    products: Product[];
}

export default function RelatedProductsGrid({ products }: RelatedProductsGridProps) {
    return (
        <section className="mt-14" aria-labelledby="related-products-heading">
            <div className="mb-4 flex items-end justify-between gap-3">
                <h2 id="related-products-heading" className="text-lg font-bold text-slate-900">
                    Related products
                </h2>
                {products.length > 0 && (
                    <Link
                        className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                        href={`/category/${products[0].category}`}
                    >
                        View all
                    </Link>
                )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => {
                    const href = `/products/${createProductSlug(product)}`;
                    const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);
                    return (
                        <Link
                            key={product.id}
                            href={href}
                            className="group rounded-3xl border border-slate-200 bg-white p-3 hover:shadow-lg transition-shadow"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                {product.discountPercentage > 0 && (
                                    <div className="absolute left-3 top-3 z-10 rounded-full border border-red-200 bg-red-500 px-2.5 py-1 text-[11px] text-white font-bold">
                                        -{product.discountPercentage.toFixed(0)}%
                                    </div>
                                )}
                                <div className="aspect-square relative">
                                    <Image
                                        alt={product.title}
                                        src={product.thumbnail}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <p className="line-clamp-1 font-semibold text-slate-900">{product.title}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-blue-600">{formatMoney(finalPrice)}</p>
                                    <p className="text-xs text-slate-500">⭐ {product.rating.toFixed(1)}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
