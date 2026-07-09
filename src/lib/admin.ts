import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
        redirect("/");
    }

    return session;
}

export async function assertAdmin() {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
        throw new Error("No autorizado");
    }

    return session;
}
