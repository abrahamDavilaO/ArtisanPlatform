"use client";

import * as React from "react";

interface ArtFormValue {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    images: string[];
    medium: string;
    dimensions: string;
    year: number | null;
    featured: boolean;
    available: boolean;
    artist: {
        name: string;
    };
}

interface ArtFormResult {
    success: boolean;
    message: string;
}

interface ArtPieceFormProps {
    artPiece?: ArtFormValue;
    submitLabel: string;
    action: (formData: FormData) => Promise<ArtFormResult>;
}

export function ArtPieceForm({ artPiece, submitLabel, action }: ArtPieceFormProps) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [message, setMessage] = React.useState<ArtFormResult | null>(null);
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

        if (result.success && !artPiece) {
            formRef.current?.reset();
        }
    };

    const defaultImageUrls = artPiece
        ? [artPiece.image, ...artPiece.images.filter((url) => url !== artPiece.image)].filter(Boolean).join("\n")
        : "";

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-md">
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Título de la obra
                    </label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={artPiece?.title}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div>
                    <label htmlFor="artistName" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Artista
                    </label>
                    <input
                        id="artistName"
                        name="artistName"
                        defaultValue={artPiece?.artist.name}
                        placeholder="Ej. María Rodríguez"
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={artPiece?.description}
                    required
                    rows={4}
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
                        defaultValue={artPiece?.price}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div>
                    <label htmlFor="medium" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Técnica
                    </label>
                    <input
                        id="medium"
                        name="medium"
                        defaultValue={artPiece?.medium || "Acrílico"}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div>
                    <label htmlFor="dimensions" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Dimensiones
                    </label>
                    <input
                        id="dimensions"
                        name="dimensions"
                        defaultValue={artPiece?.dimensions || "100x80 cm"}
                        required
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="year" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                        Año
                    </label>
                    <input
                        id="year"
                        name="year"
                        type="number"
                        defaultValue={artPiece?.year ?? new Date().getFullYear()}
                        className="w-full rounded-lg border-2 border-neutral-200 px-4 py-2.5 text-neutral-900 outline-none transition-colors focus:border-amber-500"
                    />
                </div>

                <div className="flex items-end gap-4 pb-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input name="available" type="checkbox" defaultChecked={artPiece?.available ?? true} />
                        Disponible
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <input name="featured" type="checkbox" defaultChecked={artPiece?.featured ?? true} />
                        Mostrar en galería
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="files" className="mb-1.5 block text-sm font-semibold text-neutral-700">
                    Subir foto
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
                    defaultValue={defaultImageUrls}
                    rows={3}
                    placeholder="La primera imagen será la principal en la galería."
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
                disabled={isSubmitting}
                className="rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "Guardando..." : submitLabel}
            </button>
        </form>
    );
}
