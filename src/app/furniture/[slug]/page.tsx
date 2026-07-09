import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProductCatalogCard } from "@/components/furniture/ProductCatalogCard";
import { ProductCatalogSkeleton, catalogSkeletonItems } from "@/components/furniture/ProductCatalogSkeleton";
import { getCategoryBySlug, getProductsByCategory } from "@/app/actions/database";
import { getCategoryImage } from "@/lib/category-images";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function FurnitureCategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const [category, products] = await Promise.all([
        getCategoryBySlug(slug),
        getProductsByCategory(slug),
    ]);

    if (!category) {
        notFound();
    }

    const categoryImage = getCategoryImage(category.slug, category.image);

    return (
        <div className="min-h-screen bg-[#faf8f3]">
            <Navbar />
            <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/#furniture"
                        className="mb-8 inline-flex text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                    >
                        Volver a muebles
                    </Link>

                    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                                Catálogo
                            </span>
                            <h1 className="font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="mt-4 text-lg leading-8 text-neutral-600">
                                    {category.description}
                                </p>
                            )}
                        </div>

                        {categoryImage && (
                            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={categoryImage}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-8 flex flex-wrap gap-3 border-b border-neutral-200 pb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                        <span className="border-b-2 border-neutral-900 pb-2 text-neutral-900">
                            Catálogo
                        </span>
                        <span className="pb-2">Novedades</span>
                        <span className="pb-2">Selección</span>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCatalogCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/70 p-6 text-center">
                                <p className="text-neutral-600">
                                    Aún no hay productos publicados. Mientras tanto, estos esqueletos muestran cómo se verá el catálogo cuando subas fotos, precio y descripción desde Admin.
                                </p>
                            </div>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {catalogSkeletonItems.map((item) => (
                                    <ProductCatalogSkeleton key={item.title} {...item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
