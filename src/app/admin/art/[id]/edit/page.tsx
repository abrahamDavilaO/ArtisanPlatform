import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtPieceForm } from "@/components/admin/ArtPieceForm";
import { getAdminArtPiece, updateArtPiece } from "@/app/actions/admin/art";

interface EditArtPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArtPage({ params }: EditArtPageProps) {
    const { id } = await params;
    const artPiece = await getAdminArtPiece(id);

    if (!artPiece) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <Link
                    href="/admin/art"
                    className="mb-6 inline-flex text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                >
                    Volver a galería
                </Link>
                <h1 className="font-serif text-4xl font-semibold text-neutral-900">
                    Editar {artPiece.title}
                </h1>
            </div>

            <ArtPieceForm
                artPiece={artPiece}
                submitLabel="Guardar cambios"
                action={updateArtPiece.bind(null, artPiece.id)}
            />
        </div>
    );
}
