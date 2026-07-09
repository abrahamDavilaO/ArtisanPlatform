import { ProductCatalogCard } from "./ProductCatalogCard";

interface SimilarProduct {
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

interface SimilarProductsGridProps {
    products: SimilarProduct[];
    categoryName: string;
}

export function SimilarProductsGrid({ products, categoryName }: SimilarProductsGridProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-neutral-200 pt-16">
            <h2 className="font-serif text-3xl font-semibold text-neutral-900">
                Productos similares
            </h2>
            <p className="mt-2 text-neutral-600">
                Más piezas de {categoryName} que podrían interesarte.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCatalogCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
