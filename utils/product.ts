import { Product } from "@/types";

export function createProductSlug(product: Product): string {
    const slug = product.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    return `${slug}-${product.id}`;
}

export function extractIdFromSlug(slug: string): string {
    const parts = slug.split("-");
    return parts[parts.length - 1];
}

export function calculateFinalPrice(price: number, discount: number): number {
    if (discount <= 0) return price;
    return Math.round(price * (1 - discount / 100) * 100) / 100;
}

export function formatMoney(n: number): string {
    return `$${n.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}
