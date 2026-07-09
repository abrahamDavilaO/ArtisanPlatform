"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Correo o contraseña incorrectos.");
            setIsSubmitting(false);
            return;
        }

        setEmail("");
        setPassword("");
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-scale-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                    aria-label="Cerrar"
                >
                    <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                            Acceso Administrativo
                        </h2>
                        <p className="text-neutral-600">
                            Ingresa con tu usuario autorizado para gestionar muebles.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                Correo Electrónico *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-neutral-200 transition-all duration-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 focus:outline-none text-neutral-900 placeholder-neutral-400"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-neutral-200 transition-all duration-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 focus:outline-none text-neutral-900 placeholder-neutral-400"
                                placeholder="Contraseña"
                                required
                            />
                        </div>

                        {error && (
                            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative group overflow-hidden bg-gradient-to-r from-neutral-800 to-neutral-900 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
