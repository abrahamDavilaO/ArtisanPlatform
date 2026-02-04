"use server";

import { prisma } from "@/lib/prisma";

// ===================================
// Newsletter Actions
// ===================================

export async function subscribeToNewsletter(email: string) {
    try {
        // Check if email already exists
        const existing = await prisma.newsletterSubscription.findUnique({
            where: { email },
        });

        if (existing) {
            if (existing.active) {
                return { success: false, message: "Este correo ya está suscrito" };
            } else {
                // Reactivate subscription
                await prisma.newsletterSubscription.update({
                    where: { email },
                    data: { active: true },
                });
                return { success: true, message: "¡Suscripción reactivada!" };
            }
        }

        // Create new subscription
        await prisma.newsletterSubscription.create({
            data: { email },
        });

        return { success: true, message: "¡Gracias por suscribirte!" };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return { success: false, message: "Error al procesar la suscripción" };
    }
}

// ===================================
// Contact Form Actions
// ===================================

export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
}) {
    try {
        await prisma.contactForm.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
            },
        });

        return { success: true, message: "Mensaje enviado correctamente" };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, message: "Error al enviar el mensaje" };
    }
}

// ===================================
// Product Actions
// ===================================

export async function getFeaturedProducts() {
    try {
        const products = await prisma.product.findMany({
            where: { featured: true, inStock: true },
            include: {
                category: true,
                collection: true,
            },
            take: 8,
            orderBy: { createdAt: "desc" },
        });

        return products;
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
}

export async function getProductsByCategory(categorySlug: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: { slug: categorySlug },
                inStock: true,
            },
            include: {
                category: true,
                collection: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return products;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                collection: true,
            },
        });

        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

// ===================================
// Collection Actions
// ===================================

export async function getFeaturedCollections() {
    try {
        const collections = await prisma.collection.findMany({
            where: { featured: true },
            include: {
                products: {
                    take: 4,
                    where: { inStock: true },
                },
            },
            take: 6,
        });

        return collections;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
}

// ===================================
// Art Actions
// ===================================

export async function getFeaturedArtPieces() {
    try {
        const artPieces = await prisma.artPiece.findMany({
            where: { featured: true, available: true },
            include: {
                artist: true,
            },
            take: 8,
            orderBy: { createdAt: "desc" },
        });

        return artPieces;
    } catch (error) {
        console.error("Error fetching art pieces:", error);
        return [];
    }
}

export async function getArtistBySlug(slug: string) {
    try {
        const artist = await prisma.artist.findUnique({
            where: { slug },
            include: {
                artPieces: {
                    where: { available: true },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        return artist;
    } catch (error) {
        console.error("Error fetching artist:", error);
        return null;
    }
}

// ===================================
// Category Actions
// ===================================

export async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { name: "asc" },
        });

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
