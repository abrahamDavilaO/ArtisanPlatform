import sillon from "@/images/sillon.jpg";
import comederos from "@/images/comedores.jpg";
import cama from "@/images/cama.jpg";
import escritorio from "@/images/escritorio.jpg";

const categoryImages: Record<string, string> = {
    sofas: sillon.src,
    mesas: comederos.src,
    camas: cama.src,
    escritorio: escritorio.src,
    // Compatibilidad con slugs anteriores del seed
    sillas: cama.src,
    iluminacion: escritorio.src,
};

export function getCategoryImage(slug: string, fallback?: string | null) {
    return categoryImages[slug] ?? fallback ?? null;
}
