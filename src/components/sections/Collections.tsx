"use client";

import * as React from "react";
import { Card, CardImage, CardContent, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";

const collections = [
    {
        id: 1,
        name: "Minimalismo Nórdico",
        description: "Diseño escandinavo atemporal",
        count: 24,
        image: "/images/collections/nordic.jpg",
    },
    {
        id: 2,
        name: "Arte Contemporáneo",
        description: "Obras de artistas emergentes",
        count: 18,
        image: "/images/collections/art.jpg",
    },
    {
        id: 3,
        name: "Lujo Moderno",
        description: "Elegancia y sofisticación",
        count: 32,
        image: "/images/collections/luxury.jpg",
    },
];

export function Collections() {
    const [visibleCards, setVisibleCards] = React.useState<number[]>([]);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        collections.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index]);
                            }, index * 150);
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
            id="collections"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-4 block">
                        Colecciones
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-neutral-900 mb-6">
                        Curadas con Pasión
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        Cada pieza cuenta una historia única de artesanía y diseño
                        excepcional
                    </p>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <div
                            key={collection.id}
                            className={`transition-all duration-700 ${visibleCards.includes(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                                }`}
                        >
                            <Card>
                                <CardImage src={collection.image} alt={collection.name}>
                                    <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <Button variant="primary" size="sm">
                                            Explorar
                                        </Button>
                                    </div>
                                </CardImage>
                                <CardContent>
                                    <CardTitle>{collection.name}</CardTitle>
                                    <CardDescription>{collection.description}</CardDescription>
                                    <span className="inline-block mt-3 text-sm font-medium text-amber-600">
                                        {collection.count} piezas
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
