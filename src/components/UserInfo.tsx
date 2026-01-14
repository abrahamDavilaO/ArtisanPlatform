"use client";

import { useSession, signOut } from "next-auth/react";

export function UserInfo() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="text-sm text-neutral-600">Cargando...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <div className="flex items-center gap-3">
            {session.user?.image && (
                <img
                    src={session.user.image}
                    alt={session.user.name || "Usuario"}
                    className="w-8 h-8 rounded-full"
                />
            )}
            <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900">
                    {session.user?.name}
                </span>
                <button
                    onClick={() => signOut()}
                    className="text-xs text-neutral-600 hover:text-amber-600 transition-colors text-left"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
