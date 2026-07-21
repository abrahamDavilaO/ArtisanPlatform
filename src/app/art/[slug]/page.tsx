import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProductImageGallery } from "@/components/furniture/ProductImageGallery";
import { ProductSpecsAccordion } from "@/components/furniture/ProductSpecsAccordion";
import { ProductStickyBar } from "@/components/furniture/ProductStickyBar";
import { SimilarArtGrid } from "@/components/art/SimilarArtGrid";
import { getArtPieceBySlug, getSimilarArtPieces } from "@/app/actions/database";
import { formatPrice } from "@/lib/utils";

interface ArtDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArtDetailPage({ params }: ArtDetailPageProps) {
    const { slug } = await params;
    const artPiece = await getArtPieceBySlug(slug);

    if (!artPiece || !artPiece.available) {
        notFound();
    }

    const similarPieces = await getSimilarArtPieces(artPiece.id);
    const galleryImages = [artPiece.image, ...artPiece.images];

    const specItems = [
        {
            title: "Dimensiones",
            content: artPiece.dimensions,
        },
        {
            title: "Detalles",
            content: artPiece.description,
        },
        {
            title: "Técnica y acabados",
            content: (
                <div className="space-y-2">
                    <p><strong>Técnica:</strong> {artPiece.medium}</p>
                    {artPiece.year && <p><strong>Año:</strong> {artPiece.year}</p>}
                    {artPiece.edition && <p><strong>Edición:</strong> {artPiece.edition}</p>}
                </div>
            ),
        },
        {
            title: "Artista",
            content: (
                <div className="space-y-2">
                    <p><strong>Nombre:</strong> {artPiece.artist.name}</p>
                    {artPiece.artist.bio && <p>{artPiece.artist.bio}</p>}
                </div>
            ),
        },
        {
            title: "Disponibilidad",
            content: artPiece.available
                ? "Obra disponible para adquisición."
                : "Obra no disponible por el momento.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#faf8f3] pb-28">
            <Navbar />
            <main className="px-4 pt-28 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                        <Link href="/#art" className="hover:text-amber-600">Arte</Link>
                        <span>/</span>
                        <Link href="/#art" className="hover:text-amber-600">Galería Curada</Link>
                        <span>/</span>
                        <span className="text-neutral-900">{artPiece.title}</span>
                    </nav>

                    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <ProductImageGallery
                            images={galleryImages}
                            alt={artPiece.title}
                            placeholderLabel="Imagen de la obra"
                            imageFit="contain"
                            mainFrameClassName="aspect-[4/5] lg:min-h-[620px]"
                        />

                        <div className="lg:sticky lg:top-28">
                            {artPiece.featured && (
                                <span className="mb-4 inline-block rounded bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                                    Destacada
                                </span>
                            )}
                            <h1 className="font-serif text-4xl font-semibold text-neutral-900 sm:text-5xl">
                                {artPiece.title}
                            </h1>
                            <p className="mt-3 text-lg text-neutral-600">
                                por {artPiece.artist.name}
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-neutral-900">
                                {formatPrice(artPiece.price)}
                            </p>
                            <p className="mt-6 text-base leading-8 text-neutral-600">
                                {artPiece.description}
                            </p>

                            <div className="mt-8 space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
                                <p><strong>Artista:</strong> {artPiece.artist.name}</p>
                                <p><strong>Técnica:</strong> {artPiece.medium}</p>
                                <p><strong>Dimensiones:</strong> {artPiece.dimensions}</p>
                                {artPiece.year && <p><strong>Año:</strong> {artPiece.year}</p>}
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
                                    Sobre el artista
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-neutral-600">
                                    {artPiece.artist.bio || `${artPiece.artist.name} forma parte de nuestra selección de arte contemporáneo.`}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                                <h3 className="font-serif text-xl font-semibold text-neutral-900">
                                    Envío y cuidado
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-neutral-600">
                                    Las obras de arte se embalan con cuidado especial. El envío se cotiza según destino y dimensiones.
                                </p>
                            </div>
                        </aside>
                    </section>

                    <SimilarArtGrid pieces={similarPieces} />
                </div>
            </main>
            <Footer />
            <ProductStickyBar name={artPiece.title} price={artPiece.price} />
        </div>
    );
}
