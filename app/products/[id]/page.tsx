import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Product } from "@/types";
import ProductDetailView from "@/components/ui/products/ProductDetailView";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
const REVALIDATE_PRODUCT = 3600; // 1 hour
const REVALIDATE_CATEGORY = 7200; // 2 hours
const RELATED_PRODUCTS_LIMIT = 8;

function titleToSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function extractIdFromSlug(slug: string): string {
    const parts = slug.split("-");
    return parts[parts.length - 1];
}

export function createProductSlug(product: Product): string {
    return `${titleToSlug(product.title)}-${product.id}`;
}

function calculateFinalPrice(price: number, discountPercentage: number): number {
    if (discountPercentage <= 0) return price;
    return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API}/products/${id}`, {
        next: { revalidate: REVALIDATE_PRODUCT },
    });

    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        throw new Error(`Failed to fetch product: ${res.status}`);
    }

    return res.json();
}

async function getRelatedProducts(category: string, currentId: number): Promise<Product[]> {
    try {
        const res = await fetch(`${API}/products/category/${encodeURIComponent(category)}`, {
            next: { revalidate: REVALIDATE_CATEGORY },
        });

        if (!res.ok) return [];

        const data = (await res.json()) as { products: Product[] };
        return (data.products || [])
            .filter((p) => p.id !== currentId)
            .slice(0, RELATED_PRODUCTS_LIMIT);
    } catch (error) {
        console.error('Failed to fetch related products:', error);
        return [];
    }
}

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    try {
        const { id: slug } = await params;
        const id = extractIdFromSlug(slug);
        const product = await getProduct(id);
        const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);

        return {
            title: `${product.title} | BurningBros`,
            description: product.description,
            openGraph: {
                title: product.title,
                description: product.description,
                images: product.images?.length ? product.images : [product.thumbnail],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.title,
                description: product.description,
                images: [product.thumbnail],
            },
        };
    } catch {
        return {
            title: "Product Not Found | BurningBros",
            description: "The product you're looking for could not be found.",
        };
    }
}

export async function generateStaticParams() {
    try {
        const res = await fetch(`${API}/products?limit=100`);
        if (!res.ok) return [];

        const data = await res.json();
        return data.products.map((product: Product) => ({
            id: createProductSlug(product),
        }));
    } catch {
        return [];
    }
}

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id: slug } = await params;
    const id = extractIdFromSlug(slug);

    let product: Product;
    try {
        product = await getProduct(id);
    } catch (error) {
        console.error('Product fetch error:', error);
        notFound();
    }

    const relatedProductsPromise = getRelatedProducts(product.category, product.id);

    const images = product.images?.length ? product.images : [product.thumbnail];
    const finalPrice = calculateFinalPrice(product.price, product.discountPercentage);
    const related = await relatedProductsPromise;

    return (
        <ProductDetailView
            product={product}
            images={images}
            finalPrice={finalPrice}
            relatedProducts={related}
        />
    );
}
