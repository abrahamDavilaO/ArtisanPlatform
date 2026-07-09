import Link from "next/link";
import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const session = await requireAdminSession();

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="border-b border-neutral-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <div>
                        <Link href="/" className="font-serif text-2xl font-semibold text-neutral-900">
                            ARTISAN
                        </Link>
                        <p className="mt-1 text-sm text-neutral-500">
                            Panel de contenido
                        </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex gap-4">
                            <Link href="/admin/products" className="font-semibold text-neutral-700 hover:text-amber-600">
                                Muebles
                            </Link>
                            <Link href="/admin/art" className="font-semibold text-neutral-700 hover:text-amber-600">
                                Arte
                            </Link>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-neutral-900">
                                {session.user.name || session.user.email}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
