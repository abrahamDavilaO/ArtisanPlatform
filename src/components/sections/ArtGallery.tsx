"use client";

import * as React from "react";
import { Card, CardImage, CardContent } from "../ui/Card";
import { formatPrice } from "@/lib/utils";

const artPieces = [
    {
        id: 1,
        title: "Abstracción Dorada",
        artist: "María Rodríguez",
        price: 1899,
        image: "/images/art/golden.jpg",
    },
    {
        id: 2,
        title: "Serenidad Azul",
        artist: "Carlos Mendoza",
        price: 2299,
        image: "/images/art/blue.jpg",
    },
    {
        id: 3,
        title: "Texturas Urbanas",
        artist: "Ana Silva",
        price: 1599,
        image: "/images/art/urban.jpg",
    },
    {
        id: 4,
        title: "Naturaleza Viva",
        artist: "Diego Torres",
        price: 2799,
        image: "/images/art/nature.jpg",
    },
];

export function ArtGallery() {
    const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        artPieces.forEach((_, index) => {
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
    }, []);

    return (
        <section
            id="art"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
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

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {artPieces.map((piece, index) => (
                        <div
                            key={piece.id}
                            className={`transition-all duration-700 ${visibleItems.includes(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                                }`}
                        >
                            <Card>
                                <CardImage src={piece.image} alt={piece.title} />
                                <CardContent>
                                    <h4 className="font-serif text-lg font-semibold text-neutral-900 mb-1">
                                        {piece.title}
                                    </h4>
                                    <p className="text-sm text-neutral-600 mb-2">{piece.artist}</p>
                                    <p className="text-lg font-semibold text-amber-600">
                                        {formatPrice(piece.price)}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
