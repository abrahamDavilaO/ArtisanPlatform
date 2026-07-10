import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { assertAdmin } from "@/lib/admin";
import { slugify } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function getExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase() || "jpg";
}

function buildFileName(fileName: string, folder: string) {
    const extension = getExtension(fileName);
    const baseName = slugify(fileName.replace(/\.[^/.]+$/, "")) || "archivo";
    return `${folder}/${baseName}-${crypto.randomUUID()}.${extension}`;
}

async function uploadLocally(file: File, folder: string) {
    const relativePath = buildFileName(file.name, folder);
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    const fullPath = path.join(process.cwd(), "public", "uploads", relativePath);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(fullPath, Buffer.from(await file.arrayBuffer()));

    return `/uploads/${relativePath.replace(/\\/g, "/")}`;
}

function getBlobToken() {
    const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

    if (!token) {
        return undefined;
    }

    return token.replace(/^["']|["']$/g, "");
}

async function uploadToBlob(file: File, folder: string) {
    const pathname = buildFileName(file.name, folder);

    // On Vercel, prefer OIDC auth when Blob is connected to the project.
    // Passing a bad manual token overrides OIDC and causes "Access denied".
    if (process.env.VERCEL) {
        const blob = await put(pathname, file, {
            access: "public",
        });

        return blob.url;
    }

    const token = getBlobToken();

    if (!token) {
        throw new Error(
            "Falta BLOB_READ_WRITE_TOKEN. En local copia el token desde Vercel Blob → .env.local."
        );
    }

    const blob = await put(pathname, file, {
        access: "public",
        token,
    });

    return blob.url;
}

async function uploadFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`Tipo de archivo no permitido: ${file.name}`);
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`La imagen ${file.name} supera el límite de 5MB.`);
    }

    const folder = "media";

    if (process.env.VERCEL || getBlobToken()) {
        return uploadToBlob(file, folder);
    }

    return uploadLocally(file, folder);
}

export async function POST(request: Request) {
    try {
        await assertAdmin();

        const formData = await request.formData();
        const files = formData
            .getAll("files")
            .filter((file): file is File => file instanceof File && file.size > 0);

        if (files.length === 0) {
            return NextResponse.json({ message: "No se recibieron imágenes." }, { status: 400 });
        }

        const urls = await Promise.all(files.map((file) => uploadFile(file)));

        return NextResponse.json({ urls });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "No se pudieron subir las imágenes.",
            },
            { status: 400 }
        );
    }
}
