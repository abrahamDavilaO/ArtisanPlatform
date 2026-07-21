"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProductImagePlaceholder } from "@/components/furniture/ProductImagePlaceholder";

interface ProductImageGalleryProps {
    images: string[];
    alt: string;
    placeholderLabel?: string;
    imageFit?: "cover" | "contain";
    mainFrameClassName?: string;
    enableHoverZoom?: boolean;
}

const HOVER_ZOOM_LEVEL = 2.5;
const LENS_SIZE = 140;
const LIGHTBOX_ZOOM_MIN = 1;
const LIGHTBOX_ZOOM_MAX = 3;
const LIGHTBOX_ZOOM_STEP = 0.5;

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function ProductImageGallery({
    images,
    alt,
    placeholderLabel = "Foto del producto",
    imageFit = "cover",
    mainFrameClassName = "aspect-[4/5] lg:aspect-square",
    enableHoverZoom = true,
}: ProductImageGalleryProps) {
    const uniqueImages = React.useMemo(
        () => [...new Set(images.filter(Boolean))],
        [images]
    );

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isHovering, setIsHovering] = React.useState(false);
    const [canZoom, setCanZoom] = React.useState(false);
    const [cursor, setCursor] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
    const [lightboxZoom, setLightboxZoom] = React.useState(1);

    const safeIndex = Math.min(selectedIndex, Math.max(uniqueImages.length - 1, 0));
    const selectedImage = uniqueImages[safeIndex];

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine)");

        const updateCanZoom = () => {
            setCanZoom(enableHoverZoom && mediaQuery.matches && !isLightboxOpen);
        };

        updateCanZoom();
        mediaQuery.addEventListener("change", updateCanZoom);

        return () => mediaQuery.removeEventListener("change", updateCanZoom);
    }, [enableHoverZoom, isLightboxOpen]);

    React.useEffect(() => {
        setIsHovering(false);
    }, [safeIndex]);

    React.useEffect(() => {
        if (!isLightboxOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsLightboxOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isLightboxOpen]);

    const openLightbox = () => {
        setLightboxZoom(1);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setLightboxZoom(1);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!canZoom) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        setCursor({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            width: rect.width,
            height: rect.height,
        });
    };

    const lensLeft = clamp(cursor.x - LENS_SIZE / 2, 0, Math.max(cursor.width - LENS_SIZE, 0));
    const lensTop = clamp(cursor.y - LENS_SIZE / 2, 0, Math.max(cursor.height - LENS_SIZE, 0));
    const showHoverZoom = canZoom && isHovering && cursor.width > 0;

    if (uniqueImages.length === 0) {
        return (
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className={mainFrameClassName}>
                    <ProductImagePlaceholder label={placeholderLabel} />
                </div>
            </div>
        );
    }

    const mainImageClassName = cn(
        "h-full w-full select-none",
        imageFit === "contain" ? "object-contain bg-neutral-50" : "object-cover"
    );

    const thumbnailButton = (
        url: string,
        index: number,
        className?: string,
        onSelect?: () => void
    ) => (
        <button
            key={url}
            type="button"
            onClick={() => {
                setSelectedIndex(index);
                setLightboxZoom(1);
                onSelect?.();
            }}
            aria-label={`Ver imagen ${index + 1} de ${uniqueImages.length}`}
            aria-current={safeIndex === index ? "true" : undefined}
            className={cn(
                "overflow-hidden rounded-lg border-2 bg-white transition-all",
                safeIndex === index
                    ? "border-amber-600 ring-2 ring-amber-100"
                    : "border-neutral-200 hover:border-neutral-300",
                className
            )}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={url}
                alt={`${alt} - vista ${index + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
            />
        </button>
    );

    return (
        <>
            <div className="space-y-3">
                {uniqueImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                        {uniqueImages.map((url, index) =>
                            thumbnailButton(url, index, "h-16 w-16 shrink-0")
                        )}
                    </div>
                )}

                <div className="flex gap-3 lg:gap-4">
                    {uniqueImages.length > 1 && (
                        <div className="hidden shrink-0 flex-col gap-3 lg:flex">
                            {uniqueImages.map((url, index) =>
                                thumbnailButton(url, index, "h-20 w-20")
                            )}
                        </div>
                    )}

                    <div className="relative min-w-0 flex-1">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <button
                                type="button"
                                className={cn(
                                    "relative block w-full text-left",
                                    mainFrameClassName,
                                    canZoom ? "cursor-crosshair" : "cursor-zoom-in"
                                )}
                                onClick={openLightbox}
                                onMouseEnter={() => canZoom && setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onMouseMove={handleMouseMove}
                                aria-label="Ampliar imagen"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedImage}
                                    alt={alt}
                                    className={mainImageClassName}
                                    draggable={false}
                                />

                                {showHoverZoom && (
                                    <div
                                        className="pointer-events-none absolute border-2 border-amber-500/90 bg-amber-400/15"
                                        style={{
                                            width: LENS_SIZE,
                                            height: LENS_SIZE,
                                            left: lensLeft,
                                            top: lensTop,
                                        }}
                                    />
                                )}
                            </button>
                        </div>

                        {showHoverZoom && (
                            <div
                                className="pointer-events-none absolute left-full top-0 z-30 ml-4 hidden overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl lg:block"
                                style={{
                                    width: Math.min(420, cursor.width),
                                    height: Math.min(420, cursor.height),
                                }}
                                aria-hidden
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedImage}
                                    alt=""
                                    className={cn(mainImageClassName, "absolute left-0 top-0 max-w-none")}
                                    style={{
                                        width: cursor.width * HOVER_ZOOM_LEVEL,
                                        height: cursor.height * HOVER_ZOOM_LEVEL,
                                        transform: `translate(${-lensLeft * HOVER_ZOOM_LEVEL}px, ${-lensTop * HOVER_ZOOM_LEVEL}px)`,
                                    }}
                                    draggable={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galería de imágenes: ${alt}`}
                >
                    <div
                        className="relative flex h-[min(90vh,820px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:flex-row"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition-colors hover:bg-neutral-100"
                            aria-label="Cerrar galería"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex min-h-0 flex-1 flex-col">
                            <div className="border-b border-neutral-200 px-6 py-4">
                                <span className="border-b-2 border-amber-600 pb-2 text-sm font-bold uppercase tracking-wider text-neutral-900">
                                    Imágenes
                                </span>
                            </div>

                            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-neutral-50 p-6">
                                <div className="absolute right-6 top-6 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxZoom((zoom) =>
                                                clamp(zoom - LIGHTBOX_ZOOM_STEP, LIGHTBOX_ZOOM_MIN, LIGHTBOX_ZOOM_MAX)
                                            )
                                        }
                                        disabled={lightboxZoom <= LIGHTBOX_ZOOM_MIN}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Alejar imagen"
                                    >
                                        −
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLightboxZoom((zoom) =>
                                                clamp(zoom + LIGHTBOX_ZOOM_STEP, LIGHTBOX_ZOOM_MIN, LIGHTBOX_ZOOM_MAX)
                                            )
                                        }
                                        disabled={lightboxZoom >= LIGHTBOX_ZOOM_MAX}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Acercar imagen"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex h-full w-full items-center justify-center overflow-auto">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImage}
                                        alt={alt}
                                        className={cn(
                                            "max-h-full max-w-full transition-transform duration-200",
                                            imageFit === "contain" ? "object-contain" : "object-contain"
                                        )}
                                        style={{ transform: `scale(${lightboxZoom})` }}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>

                        <aside className="flex max-h-[40vh] w-full flex-col border-t border-neutral-200 lg:max-h-none lg:w-80 lg:border-l lg:border-t-0">
                            <div className="border-b border-neutral-200 px-5 py-4">
                                <h3 className="line-clamp-3 font-serif text-lg font-semibold text-neutral-900">
                                    {alt}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-500">
                                    {safeIndex + 1} de {uniqueImages.length}
                                </p>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto p-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {uniqueImages.map((url, index) =>
                                        thumbnailButton(url, index, "aspect-square")
                                    )}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            )}
        </>
    );
}
