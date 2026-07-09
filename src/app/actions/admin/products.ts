"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";
import { slugify } from "@/lib/utils";

interface ProductFormResult {
    success: boolean;
    message: string;
}

function parseBoolean(value: FormDataEntryValue | null) {
    return value === "on" || value === "true";
}

function parseImageUrls(value: FormDataEntryValue | null) {
    return String(value || "")
        .split(/\r?\n|,/)
        .map((url) => url.trim())
        .filter(Boolean);
}

async function getUniqueSlug(name: string, productId?: string) {
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 2;

    while (
        await prisma.product.findFirst({
            where: {
                slug,
                ...(productId ? { NOT: { id: productId } } : {}),
            },
            select: { id: true },
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
    }

    return slug;
}

function parseProductForm(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock") || 0);

    if (!name || !description || !categoryId || Number.isNaN(price)) {
        throw new Error("Completa nombre, descripción, precio y categoría.");
    }

    if (price < 0 || stock < 0) {
        throw new Error("Precio y stock no pueden ser negativos.");
    }

    return {
        name,
        description,
        categoryId,
        price,
        stock,
        images: parseImageUrls(formData.get("imageUrls")),
        featured: parseBoolean(formData.get("featured")),
        inStock: parseBoolean(formData.get("inStock")),
        dimensions: String(formData.get("dimensions") || "").trim() || null,
        material: String(formData.get("material") || "").trim() || null,
        color: String(formData.get("color") || "").trim() || null,
    };
}

function revalidateProductPaths(categorySlug?: string) {
    revalidatePath("/");
    revalidatePath("/admin/products");

    if (categorySlug) {
        revalidatePath(`/furniture/${categorySlug}`);
    }
}

export async function getAdminProducts() {
    await assertAdmin();

    return prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getAdminProduct(productId: string) {
    await assertAdmin();

    return prisma.product.findUnique({
        where: { id: productId },
        include: {
            category: true,
        },
    });
}

export async function createProduct(formData: FormData): Promise<ProductFormResult> {
    try {
        await assertAdmin();
        const data = parseProductForm(formData);
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
            select: { slug: true },
        });

        if (!category) {
            throw new Error("La categoría seleccionada no existe.");
        }

        await prisma.product.create({
            data: {
                ...data,
                slug: await getUniqueSlug(data.name),
            },
        });

        revalidateProductPaths(category.slug);
        return { success: true, message: "Producto creado correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo crear el producto.",
        };
    }
}

export async function updateProduct(productId: string, formData: FormData): Promise<ProductFormResult> {
    try {
        await assertAdmin();
        const data = parseProductForm(formData);
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
            select: { slug: true },
        });

        if (!category) {
            throw new Error("La categoría seleccionada no existe.");
        }

        await prisma.product.update({
            where: { id: productId },
            data: {
                ...data,
                slug: await getUniqueSlug(data.name, productId),
            },
        });

        revalidateProductPaths(category.slug);
        revalidatePath(`/admin/products/${productId}/edit`);
        return { success: true, message: "Producto actualizado correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo actualizar el producto.",
        };
    }
}

export async function deleteProduct(productId: string): Promise<ProductFormResult> {
    try {
        await assertAdmin();
        const product = await prisma.product.delete({
            where: { id: productId },
            include: { category: true },
        });

        revalidateProductPaths(product.category.slug);
        return { success: true, message: "Producto eliminado correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo eliminar el producto.",
        };
    }
}
