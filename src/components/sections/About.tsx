"use client";

import * as React from "react";
import { Button } from "../ui/Button";

const stats = [
    { number: 500, label: "Piezas Únicas" },
    { number: 50, label: "Artistas" },
    { number: 1000, label: "Clientes Satisfechos" },
    { number: 15, label: "Años de Experiencia" },
];

export function About() {
    const [visibleStats, setVisibleStats] = React.useState<number[]>([]);
    const [animatedNumbers, setAnimatedNumbers] = React.useState<number[]>(
        new Array(stats.length).fill(0)
    );
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger stat animations
                        stats.forEach((stat, index) => {
                            setTimeout(() => {
                                setVisibleStats((prev) => [...prev, index]);
                                animateNumber(index, stat.number);
                            }, index * 150);
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const animateNumber = (index: number, target: number) => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;

            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }

            setAnimatedNumbers((prev) => {
                const newNumbers = [...prev];
                newNumbers[index] = Math.floor(current);
                return newNumbers;
            });
        }, duration / steps);
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <span className="text-sm font-semibold uppercase tracking-wider text-amber-600 block">
                            Nuestra Historia
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-neutral-900">
                            Artesanía y Pasión
                        </h2>
                        <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                            <p>
                                Desde 2010, ARTISAN ha sido sinónimo de excelencia en diseño de
                                interiores. Cada pieza en nuestra colección es cuidadosamente
                                seleccionada por su calidad, diseño y capacidad de transformar
                                espacios.
                            </p>
                            <p>
                                Trabajamos directamente con artesanos y diseñadores de todo el
                                mundo para ofrecerte piezas únicas que combinan tradición y
                                modernidad.
                            </p>
                        </div>
                        <Button variant="primary" size="lg">
                            Conoce Más
                        </Button>
                    </div>

                    {/* Animated Workshop Scene */}
                    <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5] group">
                        {/* Base Image */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="/images/about/workshop.jpg"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        >
                            <source src="/videos/carpentry-art.mp4" type="video/mp4" />
                        </video>


                        {/* Animated Overlay - Reduced opacity for clarity */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Animated Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="space-y-2 animate-fade-in-up">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                    <span className="text-white text-sm font-medium uppercase tracking-wider">
                                        En proceso
                                    </span>
                                </div>
                                <p className="text-white/90 text-lg font-light">
                                    Cada pieza es creada con dedicación y maestría
                                </p>
                            </div>
                        </div>

                        {/* Hover Effect - Subtle */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-amber-500/5 transition-colors duration-700" />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-neutral-200">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center transition-all duration-700 ${visibleStats.includes(index)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                        >
                            <div className="font-serif text-5xl sm:text-6xl font-semibold text-amber-600 mb-2">
                                {animatedNumbers[index].toLocaleString()}
                                {stat.number >= 1000 && "+"}
                            </div>
                            <p className="text-base text-neutral-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
