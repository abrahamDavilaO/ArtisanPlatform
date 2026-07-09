"use client";

import { formatPrice } from "@/lib/utils";

interface ProductStickyBarProps {
    name: string;
    price: number;
}

export function ProductStickyBar({ name, price }: ProductStickyBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-800 bg-neutral-900 px-4 py-4 text-white shadow-2xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-neutral-300">Producto seleccionado</p>
                    <p className="font-serif text-lg font-semibold">{name}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="hidden text-xl font-semibold sm:block">{formatPrice(price)}</p>
                    <button
                        type="button"
                        className="rounded-lg bg-amber-600 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-amber-500"
                    >
                        Añadir a la cesta
                    </button>
                </div>
            </div>
        </div>
    );
}
