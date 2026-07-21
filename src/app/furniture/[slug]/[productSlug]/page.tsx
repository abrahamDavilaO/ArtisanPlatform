import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProductImageGallery } from "@/components/furniture/ProductImageGallery";
import { ProductSpecsAccordion } from "@/components/furniture/ProductSpecsAccordion";
import { SimilarProductsGrid } from "@/components/furniture/SimilarProductsGrid";
import { ProductStickyBar } from "@/components/furniture/ProductStickyBar";
import { getProductBySlug, getSimilarProducts } from "@/app/actions/database";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
    params: Promise<{
        slug: string;
        productSlug: string;
    }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { slug, productSlug } = await params;
    const product = await getProductBySlug(productSlug);

    if (!product || product.category.slug !== slug) {
        notFound();
    }

    const similarProducts = await getSimilarProducts(product.categoryId, product.id);

    const specItems = [
        {
            title: "Dimensiones",
            content: product.dimensions || "Las dimensiones se publicarán pronto desde el panel admin.",
        },
        {
            title: "Detalles",
            content: product.description,
        },
        {
            title: "Material y acabados",
            content: (
                <div className="space-y-2">
                    <p><strong>Material:</strong> {product.material || "Por definir"}</p>
                    <p><strong>Color:</strong> {product.color || "Por definir"}</p>
                    {product.weight && <p><strong>Peso:</strong> {product.weight} kg</p>}
                </div>
            ),
        },
        {
            title: "Entrega y disponibilidad",
            content: product.inStock
                ? `Disponible. Stock actual: ${product.stock} unidades.`
                : "Producto temporalmente agotado.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#faf8f3] pb-28">
            <Navbar />
            <main className="px-4 pt-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                        <Link href="/#furniture" className="hover:text-amber-600">Muebles</Link>
                        <span>/</span>
                        <Link href={`/furniture/${product.category.slug}`} className="hover:text-amber-600">
                            {product.category.name}
                        </Link>
                        <span>/</span>
                        <span className="text-neutral-900">{product.name}</span>
                    </nav>

                    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <ProductImageGallery
                            images={product.images}
                            alt={product.name}
                            placeholderLabel="Sube la foto desde Admin"
                        />

                        <div className="lg:sticky lg:top-28">
                            {product.featured && (
                                <span className="mb-4 inline-block rounded bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                                    Destacado
                                </span>
                            )}
                            <h1 className="font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-3xl font-semibold text-neutral-900">
                                {formatPrice(product.price)}
                            </p>
                            <p className="mt-6 text-base leading-8 text-neutral-600">
                                {product.description}
                            </p>

                            <div className="mt-8 space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
                                <p><strong>Categoría:</strong> {product.category.name}</p>
                                {product.material && <p><strong>Material:</strong> {product.material}</p>}
                                {product.dimensions && <p><strong>Medidas:</strong> {product.dimensions}</p>}
                                {product.color && <p><strong>Color:</strong> {product.color}</p>}
                            </div>

                            <button
                                type="button"
                                className="mt-8 w-full rounded-lg bg-neutral-900 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-amber-600"
                            >
                                Añadir a la cesta
                            </button>
                        </div>
                    </section>

                    <section className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <ProductSpecsAccordion items={specItems} />

                        <aside className="space-y-4">
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <h3 className="font-serif text-2xl font-semibold text-neutral-900">
                                    Información adicional
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-neutral-600">
                                    Este producto forma parte del catálogo de {product.category.name}.
                                    Puedes actualizar fotos, precio y descripción desde el panel admin.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                                    Envío
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-neutral-600">
                                    El costo de envío se calculará según la ubicación del cliente.
                                </p>
                            </div>
                        </aside>
                    </section>

                    <SimilarProductsGrid
                        products={similarProducts}
                        categoryName={product.category.name}
                    />
                </div>
            </main>
            <Footer />
            <ProductStickyBar name={product.name} price={product.price} />
        </div>
    );
}
