"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { formatPrice } from "@/lib/utils";

const furnitureItems = [
    {
        id: 1,
        category: "Sofás",
        title: "Confort Sublime",
        price: 2499,
        image: "/images/furniture/sofa.jpg",
        large: true,
    },
    {
        id: 2,
        category: "Mesas",
        title: "Elegancia Funcional",
        price: 899,
        image: "/images/furniture/table.jpg",
    },
    {
        id: 3,
        category: "Sillas",
        title: "Diseño Icónico",
        price: 449,
        image: "/images/furniture/chair.jpg",
    },
    {
        id: 4,
        category: "Iluminación",
        title: "Luz Escultural",
        price: 329,
        image: "/images/furniture/lamp.jpg",
    },
];

export function Furniture() {
    const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        furnitureItems.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, index * 100);
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
            id="furniture"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-4 block">
                        Muebles
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-neutral-900">
                        Diseño Excepcional
                    </h2>
                </div>

                {/* Furniture Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {furnitureItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`
                ${item.large ? "lg:col-span-12" : "lg:col-span-6"}
                transition-all duration-700
                ${visibleItems.includes(index)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                                }
              `}
                        >
                            <div className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                {/* Image */}
                                <div className={`${item.large ? "aspect-[21/9]" : "aspect-[16/10]"} overflow-hidden`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2 block">
                                        {item.category}
                                    </span>
                                    <h3 className="font-serif text-2xl font-semibold text-neutral-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg text-neutral-600 mb-4">
                                        Desde {formatPrice(item.price)}
                                    </p>
                                    <Button variant="link" className="p-0">
                                        Ver más →
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
