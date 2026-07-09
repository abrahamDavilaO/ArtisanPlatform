interface ProductCatalogSkeletonProps {
    title: string;
    price: string;
    description: string;
}

export function ProductCatalogSkeleton({
    title,
    price,
    description,
}: ProductCatalogSkeletonProps) {
    return (
        <article className="overflow-hidden rounded-xl bg-white">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                <div className="flex h-full w-full animate-pulse flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-amber-50">
                    <div className="mb-3 h-16 w-16 rounded-2xl bg-neutral-200" />
                    <div className="h-3 w-24 rounded-full bg-neutral-200" />
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Espacio para foto
                    </p>
                </div>
            </div>

            <div className="px-1 py-4">
                <div className="h-5 w-3/4 rounded bg-neutral-200" />
                <p className="mt-3 font-serif text-lg font-semibold text-neutral-400">{title}</p>
                <p className="mt-2 text-base font-semibold text-neutral-300">{price}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{description}</p>
            </div>
        </article>
    );
}

export const catalogSkeletonItems = [
    {
        title: "Producto 01",
        price: "$ ---",
        description: "Aquí aparecerá la descripción breve del mueble cuando lo subas desde el panel admin.",
    },
    {
        title: "Producto 02",
        price: "$ ---",
        description: "Espacio reservado para foto, precio y texto del catálogo.",
    },
    {
        title: "Producto 03",
        price: "$ ---",
        description: "Puedes crear este producto en Admin y reemplazará este esqueleto.",
    },
    {
        title: "Producto 04",
        price: "$ ---",
        description: "Ideal para mostrar materiales, medidas y detalles del mueble.",
    },
];
