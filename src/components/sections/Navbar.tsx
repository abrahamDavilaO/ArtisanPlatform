"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { RegisterModal } from "./RegisterModal";

const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#collections", label: "Colecciones" },
    { href: "#furniture", label: "Muebles" },
    { href: "#art", label: "Arte" },
    { href: "#about", label: "Nosotros" },
    { href: "#contact", label: "Contacto" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-lg shadow-sm"
                        : "bg-white/80 backdrop-blur-md"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-serif text-2xl font-semibold text-neutral-900 tracking-wider hover:text-amber-600 transition-colors"
                        >
                            ARTISAN
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-neutral-700 hover:text-amber-600 transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Cart Button */}
                            <button
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative"
                                aria-label="Carrito"
                            >
                                <svg
                                    className="w-5 h-5 text-neutral-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="9" cy="21" r="1" strokeWidth="2" />
                                    <circle cx="20" cy="21" r="1" strokeWidth="2" />
                                    <path
                                        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                                        strokeWidth="2"
                                    />
                                </svg>
                                <span className="absolute top-0 right-0 w-4 h-4 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">
                                    0
                                </span>
                            </button>

                            {/* User/Sign In Button with Text */}
                            <button
                                onClick={() => setIsRegisterModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 rounded-full transition-colors group"
                                aria-label="Iniciar Sesión"
                                title="Iniciar Sesión / Registrarse"
                            >
                                <svg
                                    className="w-5 h-5 text-neutral-700 group-hover:text-amber-600 transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-medium text-neutral-700 group-hover:text-amber-600 transition-colors">
                                    Iniciar Sesión
                                </span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menú"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span
                                    className={cn(
                                        "w-full h-0.5 bg-neutral-900 transition-all duration-300",
                                        isMobileMenuOpen && "rotate-45 translate-y-2"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "w-full h-0.5 bg-neutral-900 transition-all duration-300",
                                        isMobileMenuOpen && "opacity-0"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "w-full h-0.5 bg-neutral-900 transition-all duration-300",
                                        isMobileMenuOpen && "-rotate-45 -translate-y-2"
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "md:hidden bg-white border-t border-neutral-200 transition-all duration-300 overflow-hidden",
                        isMobileMenuOpen ? "max-h-96" : "max-h-0"
                    )}
                >
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block text-base font-medium text-neutral-700 hover:text-amber-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Mobile Sign In Button */}
                        <button
                            onClick={() => {
                                setIsRegisterModalOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-900 transition-colors"
                        >
                            Iniciar Sesión / Registrarse
                        </button>
                    </div>
                </div>
            </nav>

            {/* Register Modal */}
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />
        </>
    );
}
