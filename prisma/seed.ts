import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...')

    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (adminEmail && adminPassword) {
        await prisma.user.upsert({
            where: { email: adminEmail },
            update: {
                role: 'ADMIN',
                passwordHash: await hash(adminPassword, 12),
            },
            create: {
                email: adminEmail,
                name: 'Administrador',
                role: 'ADMIN',
                passwordHash: await hash(adminPassword, 12),
            },
        })

        console.log('✅ Usuario administrador creado')
    } else {
        console.log('ℹ️ Define ADMIN_EMAIL y ADMIN_PASSWORD para crear el admin inicial')
    }

    // Migrar slugs antiguos si ya existían en la base
    const legacyCategoryUpdates = [
        { from: 'sillas', to: 'camas' },
        { from: 'iluminacion', to: 'escritorio' },
    ] as const

    for (const legacy of legacyCategoryUpdates) {
        const oldCategory = await prisma.category.findUnique({ where: { slug: legacy.from } })
        const newCategory = await prisma.category.findUnique({ where: { slug: legacy.to } })

        if (oldCategory && !newCategory) {
            await prisma.category.update({
                where: { id: oldCategory.id },
                data: { slug: legacy.to },
            })
        }
    }

    // Crear categorías
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'sofas' },
            update: {
                name: 'Sofás',
                description: 'Sofás y sillones de diseño contemporáneo',
                image: 'sofas',
            },
            create: {
                name: 'Sofás',
                slug: 'sofas',
                description: 'Sofás y sillones de diseño contemporáneo',
                image: 'sofas',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'mesas' },
            update: {
                name: 'Comedores',
                description: 'Mesas de comedor y conjuntos para el hogar',
                image: 'mesas',
            },
            create: {
                name: 'Comedores',
                slug: 'mesas',
                description: 'Mesas de comedor y conjuntos para el hogar',
                image: 'mesas',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'camas' },
            update: {
                name: 'Camas',
                description: 'Camas y colchones para descanso premium',
                image: 'camas',
            },
            create: {
                name: 'Camas',
                slug: 'camas',
                description: 'Camas y colchones para descanso premium',
                image: 'camas',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'escritorio' },
            update: {
                name: 'Escritorios y sillas',
                description: 'Escritorios y sillas de trabajo para el hogar',
                image: 'escritorio',
            },
            create: {
                name: 'Escritorios y sillas',
                slug: 'escritorio',
                description: 'Escritorios y sillas de trabajo para el hogar',
                image: 'escritorio',
            },
        }),
    ])

    const refreshedCategories = categories

    console.log('✅ Categorías creadas')

    // Crear colecciones
    const collections = await Promise.all([
        prisma.collection.upsert({
            where: { slug: 'minimalismo-nordico' },
            update: {},
            create: {
                name: 'Minimalismo Nórdico',
                slug: 'minimalismo-nordico',
                description: 'Diseño escandinavo atemporal con líneas limpias y materiales naturales',
                image: '/images/collections/nordic.jpg',
                featured: true,
            },
        }),
        prisma.collection.upsert({
            where: { slug: 'lujo-moderno' },
            update: {},
            create: {
                name: 'Lujo Moderno',
                slug: 'lujo-moderno',
                description: 'Elegancia y sofisticación para espacios contemporáneos',
                image: '/images/collections/luxury.jpg',
                featured: true,
            },
        }),
    ])

    console.log('✅ Colecciones creadas')

    // Crear productos
    await prisma.product.createMany({
        data: [
            {
                name: 'Sofá Oslo',
                slug: 'sofa-oslo',
                description: 'Sofá de tres plazas con diseño escandinavo. Tapizado en tela de alta calidad con patas de madera de roble.',
                price: 2499,
                categoryId: refreshedCategories[0].id,
                collectionId: collections[0].id,
                images: ['/images/products/sofa-oslo-1.jpg', '/images/products/sofa-oslo-2.jpg'],
                featured: true,
                inStock: true,
                stock: 5,
                dimensions: '220x90x85 cm',
                material: 'Tela y madera de roble',
                color: 'Beige',
                metaTitle: 'Sofá Oslo - Diseño Escandinavo | ARTISAN',
                metaDescription: 'Sofá de tres plazas con diseño escandinavo minimalista',
            },
            {
                name: 'Mesa Copenhague',
                slug: 'mesa-copenhague',
                description: 'Mesa de comedor extensible con acabado en roble natural. Capacidad para 6-8 personas.',
                price: 1299,
                categoryId: refreshedCategories[1].id,
                collectionId: collections[0].id,
                images: ['/images/products/mesa-copenhague.jpg'],
                featured: true,
                inStock: true,
                stock: 3,
                dimensions: '180-240x90x75 cm',
                material: 'Madera de roble',
                color: 'Natural',
            },
            {
                name: 'Silla Wishbone',
                slug: 'silla-wishbone',
                description: 'Silla icónica de diseño danés con respaldo en forma de Y. Asiento de cuerda trenzada.',
                price: 449,
                categoryId: refreshedCategories[2].id,
                collectionId: collections[0].id,
                images: ['/images/products/silla-wishbone.jpg'],
                featured: false,
                inStock: true,
                stock: 12,
                dimensions: '55x51x76 cm',
                material: 'Madera y cuerda',
                color: 'Natural',
            },
            {
                name: 'Lámpara Arc',
                slug: 'lampara-arc',
                description: 'Lámpara de pie con arco en metal dorado. Pantalla de mármol blanco.',
                price: 899,
                categoryId: refreshedCategories[3].id,
                collectionId: collections[1].id,
                images: ['/images/products/lampara-arc.jpg'],
                featured: true,
                inStock: true,
                stock: 7,
                dimensions: '200x40 cm',
                material: 'Metal y mármol',
                color: 'Dorado y blanco',
            },
        ],
    })

    console.log('✅ Productos creados')

    // Crear artistas
    const artists = await Promise.all([
        prisma.artist.upsert({
            where: { slug: 'maria-rodriguez' },
            update: {},
            create: {
                name: 'María Rodríguez',
                slug: 'maria-rodriguez',
                bio: 'Artista contemporánea especializada en abstracción geométrica. Sus obras exploran la relación entre color, forma y espacio.',
                photo: '/images/artists/maria-rodriguez.jpg',
                instagram: '@mariarodriguez.art',
            },
        }),
        prisma.artist.upsert({
            where: { slug: 'carlos-mendoza' },
            update: {},
            create: {
                name: 'Carlos Mendoza',
                slug: 'carlos-mendoza',
                bio: 'Pintor mexicano conocido por sus paisajes abstractos que capturan la esencia de la naturaleza.',
                photo: '/images/artists/carlos-mendoza.jpg',
                website: 'https://carlosmendoza.art',
            },
        }),
    ])

    console.log('✅ Artistas creados')

    // Crear obras de arte
    await prisma.artPiece.createMany({
        data: [
            {
                title: 'Abstracción Dorada',
                slug: 'abstraccion-dorada',
                description: 'Composición abstracta en tonos dorados y ocres. Técnica mixta sobre lienzo.',
                price: 1899,
                image: '/images/art/abstraccion-dorada.jpg',
                images: ['/images/art/abstraccion-dorada-1.jpg', '/images/art/abstraccion-dorada-2.jpg'],
                medium: 'Técnica mixta',
                dimensions: '100x80 cm',
                year: 2024,
                available: true,
                featured: true,
                artistId: artists[0].id,
            },
            {
                title: 'Serenidad Azul',
                slug: 'serenidad-azul',
                description: 'Paisaje abstracto que evoca la calma del océano. Acrílico sobre lienzo.',
                price: 2299,
                image: '/images/art/serenidad-azul.jpg',
                images: ['/images/art/serenidad-azul.jpg'],
                medium: 'Acrílico',
                dimensions: '120x90 cm',
                year: 2024,
                available: true,
                featured: true,
                artistId: artists[1].id,
            },
        ],
    })

    console.log('✅ Obras de arte creadas')

    console.log('🎉 Seed completado exitosamente!')
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
