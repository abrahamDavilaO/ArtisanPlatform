"use client";

import * as React from "react";
import Link from "next/link";
import { getCategoryImage } from "@/lib/category-images";

interface FurnitureCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    _count?: {
        products: number;
    };
}

interface FurnitureProps {
    categories: FurnitureCategory[];
}

export function Furniture({ categories }: FurnitureProps) {
    const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        categories.forEach((_, index) => {
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
    }, [categories]);

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

                {categories.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
                        {categories.map((category, index) => {
                            const imageSrc = getCategoryImage(category.slug, category.image);

                            return (
                            <Link
                                key={category.id}
                                href={`/furniture/${category.slug}`}
                                className={`
                                    group min-w-[170px] rounded-xl bg-white shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-xl
                                    ${visibleItems.includes(index)
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                    }
                                `}
                            >
                                <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-neutral-100 to-amber-50">
                                    {imageSrc && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={imageSrc}
                                            alt={category.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>

                                <div className="p-4 text-center">
                                    <h3 className="font-serif text-xl font-semibold text-neutral-900">
                                        {category.name}
                                    </h3>
                                    <span className="mt-2 block text-xs font-semibold uppercase tracking-wider text-amber-600">
                                        {category._count?.products ?? 0} productos
                                    </span>
                                </div>
                            </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
                        <p className="text-neutral-600">
                            Aún no hay categorías de muebles publicadas.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
