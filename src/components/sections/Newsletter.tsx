"use client";

import * as React from "react";
import { Button } from "../ui/Button";
import { subscribeToNewsletter } from "@/app/actions/database";

export function Newsletter() {
    const [email, setEmail] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await subscribeToNewsletter(email);

        setMessage(result.message);
        setIsError(!result.success);
        setIsSubmitted(true);

        if (result.success) {
            setEmail("");
        }

        setTimeout(() => {
            setIsSubmitted(false);
            setMessage("");
        }, 4000);
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-100 to-orange-100">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4">
                    Mantente Inspirado
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                    Recibe las últimas tendencias, colecciones exclusivas y ofertas
                    especiales
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu correo electrónico"
                        required
                        disabled={isSubmitted}
                        className="flex-1 px-6 py-3 rounded-lg border-2 border-neutral-300 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20 transition-all disabled:opacity-50"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitted}
                        className={isSubmitted && !isError ? "bg-green-600 hover:bg-green-600" : isError ? "bg-red-600 hover:bg-red-600" : ""}
                    >
                        {isSubmitted ? (isError ? "✗ Error" : "✓ Suscrito") : "Suscribirse"}
                    </Button>
                </form>

                {message && (
                    <p className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}
