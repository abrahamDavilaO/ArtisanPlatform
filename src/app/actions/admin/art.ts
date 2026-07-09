"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";
import { slugify } from "@/lib/utils";

interface ArtFormResult {
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

async function getUniqueSlug(title: string, artPieceId?: string) {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 2;

    while (
        await prisma.artPiece.findFirst({
            where: {
                slug,
                ...(artPieceId ? { NOT: { id: artPieceId } } : {}),
            },
            select: { id: true },
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
    }

    return slug;
}

async function getUniqueArtistSlug(name: string) {
    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 2;

    while (await prisma.artist.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
    }

    return slug;
}

async function resolveArtistId(artistName: string) {
    const name = artistName.trim();
    const existing = await prisma.artist.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
        },
    });

    if (existing) {
        return existing.id;
    }

    const artist = await prisma.artist.create({
        data: {
            name,
            slug: await getUniqueArtistSlug(name),
            bio: `Artista: ${name}`,
        },
    });

    return artist.id;
}

async function parseArtForm(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const artistName = String(formData.get("artistName") || "").trim();
    const price = Number(formData.get("price"));
    const medium = String(formData.get("medium") || "").trim();
    const dimensions = String(formData.get("dimensions") || "").trim();
    const yearValue = String(formData.get("year") || "").trim();
    const year = yearValue ? Number(yearValue) : null;
    const imageUrls = parseImageUrls(formData.get("imageUrls"));

    if (!title || !description || !artistName || Number.isNaN(price) || !medium || !dimensions) {
        throw new Error("Completa título, descripción, artista, precio, técnica y dimensiones.");
    }

    if (price < 0) {
        throw new Error("El precio no puede ser negativo.");
    }

    if (year !== null && Number.isNaN(year)) {
        throw new Error("El año no es válido.");
    }

    const artistId = await resolveArtistId(artistName);

    return {
        title,
        description,
        artistId,
        price,
        medium,
        dimensions,
        year,
        image: imageUrls[0] || "",
        images: imageUrls,
        featured: parseBoolean(formData.get("featured")),
        available: parseBoolean(formData.get("available")),
    };
}

function revalidateArtPaths() {
    revalidatePath("/");
    revalidatePath("/admin/art");
}

export async function getAdminArtPieces() {
    await assertAdmin();

    return prisma.artPiece.findMany({
        include: { artist: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getAdminArtPiece(artPieceId: string) {
    await assertAdmin();

    return prisma.artPiece.findUnique({
        where: { id: artPieceId },
        include: { artist: true },
    });
}

export async function createArtPiece(formData: FormData): Promise<ArtFormResult> {
    try {
        await assertAdmin();
        const data = await parseArtForm(formData);

        if (!data.image) {
            throw new Error("Sube al menos una imagen para la obra.");
        }

        await prisma.artPiece.create({
            data: {
                ...data,
                slug: await getUniqueSlug(data.title),
            },
        });

        revalidateArtPaths();
        return { success: true, message: "Obra creada correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo crear la obra.",
        };
    }
}

export async function updateArtPiece(artPieceId: string, formData: FormData): Promise<ArtFormResult> {
    try {
        await assertAdmin();
        const data = await parseArtForm(formData);

        if (!data.image) {
            throw new Error("La obra debe tener al menos una imagen.");
        }

        await prisma.artPiece.update({
            where: { id: artPieceId },
            data: {
                ...data,
                slug: await getUniqueSlug(data.title, artPieceId),
            },
        });

        revalidateArtPaths();
        revalidatePath(`/admin/art/${artPieceId}/edit`);
        return { success: true, message: "Obra actualizada correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo actualizar la obra.",
        };
    }
}

export async function deleteArtPiece(artPieceId: string): Promise<ArtFormResult> {
    try {
        await assertAdmin();
        await prisma.artPiece.delete({ where: { id: artPieceId } });
        revalidateArtPaths();
        return { success: true, message: "Obra eliminada correctamente." };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "No se pudo eliminar la obra.",
        };
    }
}
