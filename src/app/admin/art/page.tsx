import Link from "next/link";
import { ArtPieceForm } from "@/components/admin/ArtPieceForm";
import { createArtPiece, deleteArtPiece, getAdminArtPieces } from "@/app/actions/admin/art";
import { formatPrice } from "@/lib/utils";

export default async function AdminArtPage() {
    const artPieces = await getAdminArtPieces();

    return (
        <div className="space-y-10">
            <section>
                <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-amber-600">
                    Admin
                </span>
                <h1 className="font-serif text-4xl font-semibold text-neutral-900">
                    Galería de arte
                </h1>
                <p className="mt-3 max-w-2xl text-neutral-600">
                    Sube fotos, precio, artista y descripción. Las obras marcadas como destacadas aparecerán en la sección Arte de la home.
                </p>
            </section>

            <section>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-neutral-900">
                    Nueva obra
                </h2>
                <ArtPieceForm
                    submitLabel="Crear obra"
                    action={createArtPiece}
                />
            </section>

            <section>
                <h2 className="mb-4 font-serif text-2xl font-semibold text-neutral-900">
                    Obras existentes
                </h2>

                {artPieces.length > 0 ? (
                    <div className="grid gap-5">
                        {artPieces.map((piece) => (
                            <article
                                key={piece.id}
                                className="grid gap-5 rounded-2xl bg-white p-5 shadow-md md:grid-cols-[120px_1fr_auto]"
                            >
                                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-amber-50">
                                    {piece.image && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={piece.image}
                                            alt={piece.title}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                                        {piece.artist.name}
                                    </p>
                                    <h3 className="mt-1 font-serif text-2xl font-semibold text-neutral-900">
                                        {piece.title}
                                    </h3>
                                    <p className="mt-2 font-semibold text-neutral-700">
                                        {formatPrice(piece.price)}
                                    </p>
                                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                                        {piece.description}
                                    </p>
                                    <p className="mt-2 text-xs text-neutral-500">
                                        {piece.featured ? "Visible en galería" : "No destacada"}
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 md:flex-col">
                                    <Link
                                        href={`/admin/art/${piece.id}/edit`}
                                        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                                    >
                                        Editar
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteArtPiece(piece.id);
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
                        Todavía no hay obras de arte.
                    </div>
                )}
            </section>
        </div>
    );
}
