import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategories } from "@/app/actions/database";
import { getAdminProduct, updateProduct } from "@/app/actions/admin/products";

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const [categories, product] = await Promise.all([
        getAllCategories(),
        getAdminProduct(id),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <Link
                    href="/admin/products"
                    className="mb-6 inline-flex text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                >
                    Volver a productos
                </Link>
                <h1 className="font-serif text-4xl font-semibold text-neutral-900">
                    Editar {product.name}
                </h1>
            </div>

            <ProductForm
                categories={categories}
                product={product}
                submitLabel="Guardar cambios"
                action={updateProduct.bind(null, product.id)}
            />
        </div>
    );
}
