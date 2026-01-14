import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...')

    // Crear categorías
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'sofas' },
            update: {},
            create: {
                name: 'Sofás',
                slug: 'sofas',
                description: 'Sofás de diseño contemporáneo y clásico',
                image: '/images/categories/sofas.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'mesas' },
            update: {},
            create: {
                name: 'Mesas',
                slug: 'mesas',
                description: 'Mesas de comedor, centro y auxiliares',
                image: '/images/categories/mesas.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'sillas' },
            update: {},
            create: {
                name: 'Sillas',
                slug: 'sillas',
                description: 'Sillas de diseño para comedor y oficina',
                image: '/images/categories/sillas.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'iluminacion' },
            update: {},
            create: {
                name: 'Iluminación',
                slug: 'iluminacion',
                description: 'Lámparas y sistemas de iluminación',
                image: '/images/categories/iluminacion.jpg',
            },
        }),
    ])

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
                categoryId: categories[0].id,
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
                categoryId: categories[1].id,
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
                categoryId: categories[2].id,
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
                categoryId: categories[3].id,
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
