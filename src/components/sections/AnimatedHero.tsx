"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

// Phrases related to furniture and art
const ANIMATED_PHRASES = [
    { main: "ARTESANÍA", sub: "Hecha a mano" },
    { main: "DISEÑO", sub: "Contemporáneo" },
    { main: "ELEGANCIA", sub: "Atemporal" },
    { main: "CALIDAD", sub: "Premium" },
    { main: "ARTE", sub: "Exclusivo" },
    { main: "LUJO", sub: "Accesible" },
    { main: "ESTILO", sub: "Único" },
    { main: "BELLEZA", sub: "Funcional" },
];

export function AnimatedHero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    const heroRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio
    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio();
        audioRef.current.src = "/music/Andrea Bocelli, Edith Piaf - La Vie En Rose (Official Live Performance).mp3";
        audioRef.current.loop = false; // We'll handle looping manually
        audioRef.current.volume = 0.3;

        // When audio ends, restart from 20 seconds
        const handleAudioEnd = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 20;
                audioRef.current.play().catch(() => {
                    console.log("Audio replay failed");
                });
            }
        };

        audioRef.current.addEventListener('ended', handleAudioEnd);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleAudioEnd);
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            setIsAnimating(true);
            setShowPlayButton(false);
            if (audioRef.current) {
                audioRef.current.currentTime = 20;
                audioRef.current.play().catch(() => {
                    console.log("Audio playback not available");
                });
            }
        } else {
            // Only pause music, keep animations running
            setIsPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    };

    // Resume music playback
    const resumeMusic = () => {
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                console.log("Audio playback not available");
            });
        }
    };

    // Cycle through phrases when animating (independent of music)
    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentPhraseIndex((prev) => (prev + 1) % ANIMATED_PHRASES.length);
                setIsVisible(true);
            }, 500);
        }, 2500);

        return () => clearInterval(interval);
    }, [isAnimating]);

    useEffect(() => {
        // Initialize window dimensions
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Parallax calculations (safe for SSR)
    const parallaxX = windowDimensions.width ? (mousePosition.x - windowDimensions.width / 2) * 0.01 : 0;
    const parallaxY = windowDimensions.height ? (mousePosition.y - windowDimensions.height / 2) * 0.01 : 0;
    const scrollParallax = scrollY * 0.3;

    const currentPhrase = ANIMATED_PHRASES[currentPhraseIndex];

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Animated background with vignette */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />

            {/* Floating particles */}
            <div
                className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-float-slow"
                style={{
                    transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px)`,
                }}
            />
            <div
                className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full opacity-40 animate-float-slow"
                style={{
                    transform: `translate(${-parallaxX * 1.5}px, ${-parallaxY * 1.5}px)`,
                    animationDelay: "1s",
                }}
            />
            <div
                className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-amber-500 rounded-full opacity-70 animate-float-slow"
                style={{
                    transform: `translate(${parallaxX * 3}px, ${parallaxY * 3}px)`,
                    animationDelay: "2s",
                }}
            />

            {/* Play Button Overlay */}
            {showPlayButton && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <button
                        onClick={togglePlay}
                        className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white bg-opacity-10 border-2 border-white border-opacity-30 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-opacity-20"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <svg
                            className="w-10 h-10 md:w-12 md:h-12 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                    <p className="absolute bottom-1/3 text-white text-sm md:text-base uppercase tracking-widest opacity-70">
                        Presiona para comenzar la experiencia
                    </p>
                </div>
            )}

            {/* Main animated text */}
            <div
                className="relative z-10 w-full px-4"
                style={{
                    transform: `translate(${parallaxX}px, ${parallaxY - scrollParallax}px)`,
                    transition: "transform 0.3s ease-out",
                }}
            >
                <div className="max-w-7xl mx-auto text-center">
                    {/* Main phrase */}
                    <div className="relative overflow-hidden mb-4">
                        <h1
                            className={`
                                font-black text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] 
                                leading-none tracking-tighter text-white
                                transition-all duration-700 ease-in-out
                                ${isVisible && isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}
                            style={{
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {currentPhrase.main}
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <div className="relative overflow-hidden">
                        <p
                            className={`
                                text-2xl md:text-3xl lg:text-4xl text-amber-400 font-light tracking-wide
                                transition-all duration-700 ease-in-out
                                ${isVisible && isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
                            `}
                            style={{
                                transitionDelay: "200ms",
                            }}
                        >
                            {currentPhrase.sub}
                        </p>
                    </div>

                    {/* Description - only show when not started */}
                    {!isAnimating && (
                        <div className="mt-12 max-w-2xl mx-auto">
                            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed animate-fade-in">
                                Descubre nuestra colección exclusiva de muebles de diseño y arte contemporáneo
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Control bar - bottom */}
            {isAnimating && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 bg-black bg-opacity-60 backdrop-blur-md rounded-full border-2 border-amber-400 border-opacity-40 shadow-2xl animate-fade-in">
                    <button
                        onClick={isPlaying ? togglePlay : resumeMusic}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                        title={isPlaying ? "Pausar música" : "Reproducir música"}
                    >
                        <svg
                            className="w-5 h-5 text-black"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isPlaying ? (
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            ) : (
                                <path d="M8 5v14l11-7z" />
                            )}
                        </svg>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        <span className="text-white text-xs md:text-sm uppercase tracking-wider font-medium">
                            {isPlaying ? "En reproducción" : "Pausado"}
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                        <div className="w-16 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: '30%' }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white border-opacity-20" />
            <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white border-opacity-20" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white border-opacity-20" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white border-opacity-20" />

            {/* Brand watermark */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white text-opacity-40 text-xs uppercase tracking-widest">
                ARTISAN
            </div>
        </div>
    );
}
