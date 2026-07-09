"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardImage, CardContent } from "../ui/Card";
import { formatPrice } from "@/lib/utils";
import { ProductImagePlaceholder } from "@/components/furniture/ProductImagePlaceholder";

interface ArtPieceItem {
    id: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    artist: {
        name: string;
    };
}

interface ArtGalleryProps {
    pieces: ArtPieceItem[];
}

const skeletonPieces = [
    { title: "Obra 01", artist: "Artista", price: "$ ---" },
    { title: "Obra 02", artist: "Artista", price: "$ ---" },
    { title: "Obra 03", artist: "Artista", price: "$ ---" },
    { title: "Obra 04", artist: "Artista", price: "$ ---" },
];

export function ArtGallery({ pieces }: ArtGalleryProps) {
    const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
    const sectionRef = React.useRef<HTMLElement>(null);
    const displayItems = pieces.length > 0 ? pieces : skeletonPieces;
    const isSkeleton = pieces.length === 0;

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        displayItems.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, index * 120);
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [displayItems]);

    return (
        <section
            id="art"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-4 block">
                        Arte
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-neutral-900 mb-6">
                        Galería Curada
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        Obras seleccionadas que transforman espacios en experiencias
                    </p>
                </div>

                {isSkeleton && (
                    <p className="mb-8 text-center text-sm text-neutral-500">
                        Sube obras desde Admin → Galería de arte para reemplazar estos espacios.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayItems.map((piece, index) => {
                        const artPiece = piece as ArtPieceItem;
                        const content = (
                            <Card hover={!isSkeleton}>
                                {isSkeleton ? (
                                    <div className="aspect-[4/5]">
                                        <ProductImagePlaceholder label="Espacio para obra" />
                                    </div>
                                ) : (
                                    <CardImage src={artPiece.image} alt={artPiece.title} />
                                )}
                                <CardContent>
                                    <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-1">
                                        {piece.title}
                                    </h4>
                                    <p className="text-sm text-neutral-600 mb-2">
                                        {isSkeleton
                                            ? (piece as (typeof skeletonPieces)[number]).artist
                                            : artPiece.artist.name}
                                    </p>
                                    <p className={`text-lg font-semibold ${isSkeleton ? "text-neutral-300" : "text-amber-600"}`}>
                                        {isSkeleton ? piece.price : formatPrice(artPiece.price)}
                                    </p>
                                    {!isSkeleton && (
                                        <span className="mt-3 inline-flex text-xs font-semibold uppercase tracking-wider text-neutral-500 group-hover:text-amber-600">
                                            Ver obra →
                                        </span>
                                    )}
                                </CardContent>
                            </Card>
                        );

                        return (
                            <div
                                key={isSkeleton ? `skeleton-${index}` : artPiece.id}
                                className={`transition-all duration-700 ${visibleItems.includes(index)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                                    }`}
                            >
                                {isSkeleton ? (
                                    content
                                ) : (
                                    <Link href={`/art/${artPiece.slug}`} className="group block">
                                        {content}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
