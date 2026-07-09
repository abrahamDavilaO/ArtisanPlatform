import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.log("Faltan ADMIN_EMAIL o ADMIN_PASSWORD en .env");
        return;
    }

    await prisma.user.upsert({
        where: { email },
        update: {
            name: "Administrador",
            role: "ADMIN",
            passwordHash: await hash(password, 12),
        },
        create: {
            email,
            name: "Administrador",
            role: "ADMIN",
            passwordHash: await hash(password, 12),
        },
    });

    console.log("Admin listo:", email);
    console.log("Contraseña sincronizada desde .env");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
