import Link from "next/link";

interface ProductBreadcrumbProps {
    category: string;
    title: string;
}

export default function ProductBreadcrumb({ category, title }: ProductBreadcrumbProps) {
    return (
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
            <Link className="hover:text-blue-600 font-medium transition-colors" href="/">
                Home
            </Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <Link
                className="hover:text-blue-600 capitalize font-medium transition-colors"
                href={`/category/${encodeURIComponent(category)}`}
            >
                {category}
            </Link>
            <span className="opacity-40" aria-hidden="true">/</span>
            <span className="text-slate-900 font-semibold line-clamp-1">{title}</span>
        </nav>
    );
}
