import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await Promise.all([
        prisma.category.upsert({
            where: { slug: "sofas" },
            update: {
                name: "Sofás",
                description: "Sofás y sillones de diseño contemporáneo",
                image: "sofas",
            },
            create: {
                name: "Sofás",
                slug: "sofas",
                description: "Sofás y sillones de diseño contemporáneo",
                image: "sofas",
            },
        }),
        prisma.category.upsert({
            where: { slug: "mesas" },
            update: {
                name: "Comedores",
                description: "Mesas de comedor y conjuntos para el hogar",
                image: "mesas",
            },
            create: {
                name: "Comedores",
                slug: "mesas",
                description: "Mesas de comedor y conjuntos para el hogar",
                image: "mesas",
            },
        }),
        prisma.category.upsert({
            where: { slug: "camas" },
            update: {
                name: "Camas",
                description: "Camas y colchones para descanso premium",
                image: "camas",
            },
            create: {
                name: "Camas",
                slug: "camas",
                description: "Camas y colchones para descanso premium",
                image: "camas",
            },
        }),
        prisma.category.upsert({
            where: { slug: "escritorio" },
            update: {
                name: "Escritorios y sillas",
                description: "Escritorios y sillas de trabajo para el hogar",
                image: "escritorio",
            },
            create: {
                name: "Escritorios y sillas",
                slug: "escritorio",
                description: "Escritorios y sillas de trabajo para el hogar",
                image: "escritorio",
            },
        }),
    ]);

    console.log("Categorías listas en la base de datos.");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
