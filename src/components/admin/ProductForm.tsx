"use client";

import * as React from "react";

interface CategoryOption {
    id: string;
    name: string;
}

interface ProductFormValue {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
    featured: boolean;
    inStock: boolean;
    stock: number;
    dimensions: string | null;
    material: string | null;
    color: string | null;
}

interface ProductFormResult {
    success: boolean;
    message: string;
}

interface ProductFormProps {
    categories: CategoryOption[];
    product?: ProductFormValue;
    submitLabel: string;
    action: (formData: FormData) => Promise<ProductFormResult>;
}

export function ProductForm({ categories, product, submitLabel, action }: ProductFormProps) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [message, setMessage] = React.useState<ProductFormResult | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const files = formData.getAll("files").filter((file) => file instanceof File && file.size > 0);

        if (files.length > 0) {
            const uploadData = new FormData();
            files.forEach((file) => uploadData.append("files", file));

            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            if (!response.ok) {
                const error = await response.json().catch(() => null);
                setMessage({
                    success: false,
                    message: error?.message || "No se pudieron subir las imágenes.",
                });
                setIsSubmitting(false);
                return;
            }

            const result = (await response.json()) as { urls: string[] };
            const existingUrls = String(formData.get("imageUrls") || "").trim();
            formData.set("imageUrls", [existingUrls, ...result.urls].filter(Boolean).join("\n"));
        }

        formData.delete("files");

        const result = await action(formData);
        setMessage(result);
        setIsSubmitting(false);

        if (result.success && !product) {
            formRef.current?.reset();
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-md">
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        defaultValue={product?.name}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div>
                    <label htmlFor="categoryId" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Categoría
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        defaultValue={product?.categoryId || categories[0]?.id}
                        required
                        disabled={categories.length === 0}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500 disabled:cursor-not-allowed disabled:bg-neutral-100"
                    >
                        {categories.length === 0 ? (
                            <option value="">Sin categorías — ejecuta el seed en la base de datos</option>
                        ) : (
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        )}
                    </select>
                    {categories.length === 0 && (
                        <p className="mt-2 text-sm text-amber-700">
                            No hay categorías en la base de datos. Ejecuta{" "}
                            <code className="rounded bg-amber-50 px-1">npx ts-node scripts/seed-categories.ts</code>{" "}
                            contra tu base de producción.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={product?.description}
                    required
                    rows={5}
                    className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <div>
                    <label htmlFor="price" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Precio
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={product?.price}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div>
                    <label htmlFor="stock" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Stock
                    </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        defaultValue={product?.stock ?? 0}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div className="flex items-end gap-4 pb-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input name="inStock" type="checkbox" defaultChecked={product?.inStock ?? true} />
                        Disponible
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input name="featured" type="checkbox" defaultChecked={product?.featured ?? false} />
                        Destacado
                    </label>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <div>
                    <label htmlFor="dimensions" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Dimensiones
                    </label>
                    <input
                        id="dimensions"
                        name="dimensions"
                        defaultValue={product?.dimensions || ""}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>
                <div>
                    <label htmlFor="material" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Material
                    </label>
                    <input
                        id="material"
                        name="material"
                        defaultValue={product?.material || ""}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>
                <div>
                    <label htmlFor="color" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Color
                    </label>
                    <input
                        id="color"
                        name="color"
                        defaultValue={product?.color || ""}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="files" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                    Subir fotos
                </label>
                <input
                    id="files"
                    name="files"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full rounded-lg border-2 border-dashed border-neutral-200 px-4 py-4 text-sm text-neutral-700"
                />
            </div>

            <div>
                <label htmlFor="imageUrls" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                    URLs de imágenes
                </label>
                <textarea
                    id="imageUrls"
                    name="imageUrls"
                    defaultValue={product?.images.join("\n")}
                    rows={4}
                    placeholder="Las fotos subidas aparecerán aquí automáticamente."
                    className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                />
            </div>

            {message && (
                <p className={`rounded-lg px-4 py-3 text-sm font-medium ${message.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {message.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting || categories.length === 0}
                className="rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "Guardando..." : submitLabel}
            </button>
        </form>
    );
}
