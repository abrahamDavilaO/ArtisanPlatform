# 🎯 Guía Rápida - ARTISAN Platform

## ✅ Lo que hemos creado

### 1. **Plataforma completa Next.js + TypeScript + Prisma**
- ✨ Diseño premium inspirado en Apple y Figma
- 🎨 Animaciones fluidas y micro-interacciones
- 📱 Completamente responsive
- 🗄️ Base de datos PostgreSQL con Prisma ORM

### 2. **Componentes implementados**
- Navbar con glassmorphism
- Hero con animaciones staggered
- Collections con scroll animations
- Furniture showcase
- Art Gallery
- About con contadores animados
- Newsletter (conectado a base de datos)
- Footer completo

### 3. **Base de datos configurada**
- 8 modelos de Prisma
- Server Actions para interactuar con la BD
- Script de seed con datos de ejemplo

---

## 🚀 Cómo empezar

### Paso 1: Configurar PostgreSQL

Necesitas tener PostgreSQL instalado. Si no lo tienes:

**Windows:**
```bash
# Descarga desde: https://www.postgresql.org/download/windows/
# O usa Chocolatey:
choco install postgresql
```

**Crear la base de datos:**
```bash
# Abre psql
psql -U postgres

# Crea la base de datos
CREATE DATABASE artisan_db;

# Sal de psql
\q
```

### Paso 2: Configurar variables de entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/artisan_db?schema=public"
```

**Reemplaza:**
- `postgres` con tu usuario de PostgreSQL
- `tu_password` con tu contraseña de PostgreSQL

### Paso 3: Ejecutar migraciones

```bash
# Genera el cliente de Prisma
npx prisma generate

# Crea las tablas en la base de datos
npx prisma migrate dev --name init

# Pobla la base de datos con datos de ejemplo
npx prisma db seed
```

### Paso 4: Iniciar el servidor

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador

---

## 🎨 Ver y editar la base de datos

```bash
# Abre Prisma Studio (interfaz visual)
npx prisma studio
```

Esto abrirá http://localhost:5555 donde podrás:
- Ver todos los datos
- Agregar/editar/eliminar registros
- Probar el newsletter

---

## 📊 Estructura de la base de datos

### Productos
- **Product** - Muebles y productos
- **Category** - Categorías (Sofás, Mesas, Sillas, Iluminación)
- **Collection** - Colecciones curadas

### Arte
- **Artist** - Artistas
- **ArtPiece** - Obras de arte

### Marketing
- **NewsletterSubscription** - Suscripciones (¡ya funciona!)
- **ContactForm** - Formularios de contacto

### E-commerce (para futuro)
- **Order** - Órdenes
- **OrderItem** - Items de órdenes

---

## 🔧 Comandos útiles

```bash
# Desarrollo
npm run dev                    # Inicia servidor de desarrollo

# Prisma
npx prisma studio             # Interfaz visual de BD
npx prisma generate           # Regenera el cliente
npx prisma migrate dev        # Crea nueva migración
npx prisma db seed            # Pobla con datos de ejemplo
npx prisma migrate reset      # Resetea BD (¡cuidado!)

# Build
npm run build                 # Build de producción
npm run start                 # Servidor de producción
```

---

## 📝 Próximos pasos sugeridos

### 1. **Conectar productos reales**
Edita `src/components/sections/Collections.tsx` y usa:
```typescript
import { getFeaturedCollections } from "@/app/actions/database";
```

### 2. **Agregar más páginas**
```bash
# Crear página de producto individual
src/app/products/[slug]/page.tsx

# Crear página de colección
src/app/collections/[slug]/page.tsx
```

### 3. **Agregar autenticación**
```bash
npm install next-auth
```

### 4. **Agregar carrito de compras**
Implementar con React Context o Zustand

### 5. **Agregar pagos**
Integrar Stripe o MercadoPago

---

## 🐛 Solución de problemas

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- Revisa tu `DATABASE_URL` en `.env`
- Asegúrate de que la base de datos existe

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### El newsletter no guarda datos
- Verifica que las migraciones estén aplicadas
- Revisa Prisma Studio para ver los datos

### Animaciones no funcionan
- Limpia el caché: `rm -rf .next`
- Reinicia el servidor

---

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 🎉 ¡Listo!

Tu plataforma ARTISAN está completamente configurada y lista para usar.

**Características principales:**
- ✅ Diseño premium con animaciones
- ✅ Base de datos PostgreSQL
- ✅ Newsletter funcional
- ✅ Server Actions
- ✅ TypeScript
- ✅ Responsive
- ✅ SEO optimizado

**Para empezar a desarrollar:**
1. Configura PostgreSQL
2. Ejecuta las migraciones
3. Corre `npm run dev`
4. ¡Empieza a crear!

---

💡 **Tip:** Usa `npx prisma studio` para ver y editar tus datos fácilmente.
