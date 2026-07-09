import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ProductImagePlaceholder } from "@/components/furniture/ProductImagePlaceholder";

interface SimilarArtPiece {
    id: string;
    title: string;
    slug: string;
    price: number;
    image: string;
    artist: {
        name: string;
    };
}

interface SimilarArtGridProps {
    pieces: SimilarArtPiece[];
}

export function SimilarArtGrid({ pieces }: SimilarArtGridProps) {
    if (pieces.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-neutral-200 pt-16">
            <h2 className="font-serif text-3xl font-semibold text-neutral-900">
                Obras similares
            </h2>
            <p className="mt-2 text-neutral-600">
                Más piezas de la galería que podrían interesarte.
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {pieces.map((piece) => (
                    <Link key={piece.id} href={`/art/${piece.slug}`} className="group block">
                        <article className="overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:-translate-y-1">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                                {piece.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={piece.image}
                                        alt={piece.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <ProductImagePlaceholder label="Obra de arte" />
                                )}
                            </div>
                            <div className="px-1 py-4">
                                <h3 className="font-serif text-lg font-semibold text-neutral-900 group-hover:text-amber-700">
                                    {piece.title}
                                </h3>
                                <p className="mt-1 text-sm text-neutral-600">{piece.artist.name}</p>
                                <p className="mt-2 font-semibold text-amber-600">{formatPrice(piece.price)}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
