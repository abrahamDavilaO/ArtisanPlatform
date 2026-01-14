"use client";

import * as React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const validateField = (name: keyof FormData, value: string): string | undefined => {
        switch (name) {
            case "firstName":
            case "lastName":
                if (!value.trim()) return "Este campo es requerido";
                if (value.trim().length < 2) return "Debe tener al menos 2 caracteres";
                break;
            case "email":
                if (!value.trim()) return "El correo electrónico es requerido";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Ingresa un correo electrónico válido";
                }
                break;
            case "password":
                if (!value) return "La contraseña es requerida";
                if (value.length < 8) return "Debe tener al menos 8 caracteres";
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return "Debe incluir mayúsculas, minúsculas y números";
                }
                break;
            case "confirmPassword":
                if (!value) return "Confirma tu contraseña";
                if (value !== formData.password) return "Las contraseñas no coinciden";
                break;
            case "phone":
                if (value && !/^\d{10}$/.test(value.replace(/\D/g, ""))) {
                    return "Ingresa un número de teléfono válido (10 dígitos)";
                }
                break;
        }
        return undefined;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            const error = validateField(name as keyof FormData, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name as keyof FormData, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        setFocusedField(null);
    };

    const handleFocus = (name: string) => {
        setFocusedField(name);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {};
        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsSubmitting(false);
            setSubmitSuccess(true);

            // Reset and close after 2 seconds
            setTimeout(() => {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                });
                setSubmitSuccess(false);
                onClose();
            }, 2000);
        }
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

                {/* Success overlay */}
                {submitSuccess && (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center z-50 animate-fade-in">
                        <div className="text-center text-white p-8">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">¡Registro Exitoso!</h3>
                            <p className="text-lg opacity-90">Bienvenido a Artisan</p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                            Crear Cuenta
                        </h2>
                        <p className="text-neutral-600">
                            Únete a nuestra exclusiva comunidad
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        {/* Google */}
                        <button
                            type="button"
                            onClick={() => {
                                signIn("google", { callbackUrl: "/" });
                            }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="text-neutral-700 font-medium group-hover:text-neutral-900">
                                Continuar con Google
                            </span>
                        </button>

                        {/* Facebook */}
                        <button
                            type="button"
                            onClick={() => {
                                signIn("facebook", { callbackUrl: "/" });
                            }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-neutral-700 font-medium group-hover:text-neutral-900">
                                Continuar con Facebook
                            </span>
                        </button>

                        {/* Apple */}
                        <button
                            type="button"
                            onClick={() => {
                                alert("🔐 Autenticación con Apple\n\nEsta funcionalidad estará disponible próximamente.\n\nPor ahora, puedes registrarte con tu email abajo. 👇");
                            }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="text-neutral-700 font-medium group-hover:text-neutral-900">
                                Continuar con Apple
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-neutral-500 font-medium">O regístrate con email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("firstName")}
                                    className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                        ${errors.firstName
                                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                            : focusedField === "firstName"
                                                ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                                : "border-neutral-200 hover:border-amber-300"
                                        }
                                        focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                    placeholder="Juan"
                                />
                                {errors.firstName && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("lastName")}
                                    className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                        ${errors.lastName
                                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                            : focusedField === "lastName"
                                                ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                                : "border-neutral-200 hover:border-amber-300"
                                        }
                                        focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                    placeholder="Pérez"
                                />
                                {errors.lastName && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                Correo Electrónico *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={() => handleFocus("email")}
                                className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                    ${errors.email
                                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                        : focusedField === "email"
                                            ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            : "border-neutral-200 hover:border-amber-300"
                                    }
                                    focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                placeholder="tu@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone (optional) */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                Teléfono <span className="text-neutral-400 font-normal">(opcional)</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={() => handleFocus("phone")}
                                className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                    ${errors.phone
                                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                        : focusedField === "phone"
                                            ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                            : "border-neutral-200 hover:border-amber-300"
                                    }
                                    focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                placeholder="(555) 123-4567"
                            />
                            {errors.phone && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Contraseña *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("password")}
                                    className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                        ${errors.password
                                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                            : focusedField === "password"
                                                ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                                : "border-neutral-200 hover:border-amber-300"
                                        }
                                        focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Confirmar *
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("confirmPassword")}
                                    className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 bg-white
                                        ${errors.confirmPassword
                                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                            : focusedField === "confirmPassword"
                                                ? "border-amber-500 focus:ring-2 focus:ring-amber-100"
                                                : "border-neutral-200 hover:border-amber-300"
                                        }
                                        focus:outline-none text-neutral-900 placeholder-neutral-400`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                        "Crear Cuenta"
                                    )}
                                </span>
                            </button>
                        </div>

                        {/* Terms */}
                        <p className="text-center text-xs text-neutral-500">
                            Al registrarte, aceptas nuestros{" "}
                            <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                                Términos
                            </a>{" "}
                            y{" "}
                            <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                                Privacidad
                            </a>
                        </p>

                        {/* Login link */}
                        <div className="text-center pt-3 border-t border-neutral-200">
                            <p className="text-sm text-neutral-600">
                                ¿Ya tienes cuenta?{" "}
                                <button
                                    type="button"
                                    className="text-amber-600 hover:text-amber-700 font-bold underline"
                                >
                                    Inicia Sesión
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
