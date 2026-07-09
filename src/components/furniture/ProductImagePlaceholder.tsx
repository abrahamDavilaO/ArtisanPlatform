interface ProductImagePlaceholderProps {
    label?: string;
    className?: string;
}

export function ProductImagePlaceholder({
    label = "Foto del producto",
    className = "",
}: ProductImagePlaceholderProps) {
    return (
        <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-amber-50 ${className}`}
        >
            <div className="mb-3 h-16 w-16 rounded-2xl bg-white/80 shadow-inner" />
            <div className="h-3 w-24 rounded-full bg-neutral-200" />
            <p className="mt-3 px-4 text-center text-xs font-medium uppercase tracking-wider text-neutral-400">
                {label}
            </p>
        </div>
    );
}
