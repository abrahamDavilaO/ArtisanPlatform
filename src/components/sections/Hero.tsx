"use client";

import * as React from "react";
import { Button } from "../ui/Button";

export function Hero() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-neutral-50 to-amber-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.15),transparent_50%)] animate-pulse-slow" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8">
                    {/* Title */}
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-neutral-900 leading-tight">
                        <span
                            className={`block transition-all duration-1000 ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                        >
                            Elegancia
                        </span>
                        <span
                            className={`block transition-all duration-1000 delay-200 ${isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }`}
                        >
                            Atemporal
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={`text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                            }`}
                    >
                        Descubre nuestra colección exclusiva de muebles de diseño y arte
                        contemporáneo
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                            }`}
                    >
                        <Button size="lg" variant="primary">
                            Explorar Colección
                        </Button>
                        <Button size="lg" variant="secondary">
                            Ver Catálogo
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber-600 to-transparent animate-scroll-line" />
                <span className="text-xs uppercase tracking-widest text-neutral-500">
                    Scroll
                </span>
            </div>
        </section>
    );
}
