# ARTISAN - Plataforma de Muebles y Arte

Plataforma moderna de e-commerce para muebles de diseño y arte contemporáneo, construida con Next.js, TypeScript, Tailwind CSS y Prisma.

## 🚀 Tecnologías

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **Prisma 5.19** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tu conexión a PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/artisan_db?schema=public"
```

## 🗄️ Configuración de Base de Datos

### 1. Crear la base de datos PostgreSQL

```bash
# Conéctate a PostgreSQL
psql -U postgres

# Crea la base de datos
CREATE DATABASE artisan_db;
```

### 2. Ejecutar migraciones de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear y aplicar migraciones
npx prisma migrate dev --name init

# Ver la base de datos en Prisma Studio (opcional)
npx prisma studio
```

### 3. Seed de datos (opcional)

```bash
# Crear datos de prueba
npx prisma db seed
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en:
# http://localhost:3000
```

## 📊 Modelos de Base de Datos

### Productos y Categorías
- **Product** - Productos (muebles, accesorios, etc.)
- **Category** - Categorías de productos
- **Collection** - Colecciones curadas

### Arte
- **Artist** - Artistas
- **ArtPiece** - Obras de arte

### Engagement
- **NewsletterSubscription** - Suscripciones al newsletter
- **ContactForm** - Formularios de contacto

### E-commerce (futuro)
- **Order** - Órdenes de compra
- **OrderItem** - Items de órdenes

## 🎨 Características

- ✨ Animaciones fluidas inspiradas en Figma
- 📱 Diseño responsive
- 🎯 SEO optimizado
- ♿ Accesible
- 🚀 Rendimiento optimizado con Turbopack
- 🎨 Diseño premium con glassmorphism

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npx prisma studio    # Interfaz visual de base de datos
npx prisma migrate   # Gestión de migraciones
```

## 🔧 Comandos Útiles de Prisma

```bash
# Generar cliente después de cambios en schema
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (¡cuidado!)
npx prisma migrate reset

# Ver y editar datos
npx prisma studio
```

## 🌐 Estructura del Proyecto

```
artisan-platform/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── page.tsx          # Página principal
│   │   ├── layout.tsx        # Layout principal
│   │   └── globals.css       # Estilos globales
│   ├── components/
│   │   ├── ui/               # Componentes UI reutilizables
│   │   └── sections/         # Secciones de la página
│   ├── lib/
│   │   ├── prisma.ts         # Cliente de Prisma
│   │   └── utils.ts          # Utilidades
│   └── types/
│       └── index.ts          # Tipos TypeScript
├── public/                    # Archivos estáticos
└── package.json
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno (DATABASE_URL)
3. Despliega automáticamente

### Variables de Entorno en Producción

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://tu-dominio.com"
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ para ARTISAN
# ArtisanPlatform
