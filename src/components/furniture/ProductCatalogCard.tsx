import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface ProductCatalogItem {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category: {
        slug: string;
        name: string;
    };
}

interface ProductCatalogCardProps {
    product: ProductCatalogItem;
}

export function ProductCatalogCard({ product }: ProductCatalogCardProps) {
    const image = product.images[0];

    return (
        <Link
            href={`/furniture/${product.category.slug}/${product.slug}`}
            className="group block"
        >
            <article className="overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                    {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <ProductImagePlaceholder />
                    )}
                </div>

                <div className="px-1 py-4">
                    <h2 className="font-serif text-lg font-semibold text-neutral-900 transition-colors group-hover:text-amber-700">
                        {product.name}
                    </h2>
                    <p className="mt-2 text-base font-semibold text-neutral-900">
                        {formatPrice(product.price)}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">
                        {product.description}
                    </p>
                    <span className="mt-3 inline-flex text-xs font-semibold uppercase tracking-wider text-amber-600">
                        Ver especificaciones
                    </span>
                </div>
            </article>
        </Link>
    );
}
