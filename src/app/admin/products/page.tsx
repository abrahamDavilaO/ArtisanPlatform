import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategories } from "@/app/actions/database";
import { createProduct, deleteProduct, getAdminProducts } from "@/app/actions/admin/products";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
    const [categories, products] = await Promise.all([
        getAllCategories(),
        getAdminProducts(),
    ]);

    return (
        <div className="space-y-10">
            <section>
                <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                    Admin
                </span>
                <h1 className="font-serif text-4xl font-semibold text-neutral-900">
                    Muebles
                </h1>
                <p className="mt-3 max-w-2xl text-neutral-600">
                    Sube fotos, precio y descripción. Los productos se mostrarán automáticamente en su categoría pública.
                </p>
            </section>

            <section>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-neutral-900">
                    Nuevo producto
                </h2>
                <ProductForm
                    categories={categories}
                    submitLabel="Crear producto"
                    action={createProduct}
                />
            </section>

            <section>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-neutral-900">
                    Productos existentes
                </h2>

                {products.length > 0 ? (
                    <div className="grid gap-5">
                        {products.map((product) => (
                            <article
                                key={product.id}
                                className="grid gap-5 rounded-2xl bg-white p-5 shadow-md md:grid-cols-[120px_1fr_auto]"
                            >
                                <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-amber-50">
                                    {product.images[0] && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                                        {product.category.name}
                                    </p>
                                    <h3 className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                                        {product.name}
                                    </h3>
                                    <p className="mt-2 font-semibold text-neutral-700">
                                        {formatPrice(product.price)}
                                    </p>
                                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 md:flex-col">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                                    >
                                        Editar
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteProduct(product.id);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            Eliminar
                                        </button>
                                    </form>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-600">
                        Todavía no hay productos.
                    </div>
                )}
            </section>
        </div>
    );
}
