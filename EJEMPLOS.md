# 📖 Ejemplos de Uso - Server Actions

Este archivo contiene ejemplos de cómo usar las Server Actions de Prisma en tus componentes.

## 1. Newsletter (Ya implementado)

```tsx
// src/components/sections/Newsletter.tsx
import { subscribeToNewsletter } from "@/app/actions/database";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await subscribeToNewsletter(email);
  
  if (result.success) {
    // Mostrar mensaje de éxito
  } else {
    // Mostrar error
  }
};
```

## 2. Mostrar productos destacados

```tsx
// Ejemplo: src/app/productos/page.tsx
import { getFeaturedProducts } from "@/app/actions/database";

export default async function ProductosPage() {
  const products = await getFeaturedProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <p className="category">{product.category.name}</p>
        </div>
      ))}
    </div>
  );
}
```

## 3. Página de producto individual

```tsx
// src/app/productos/[slug]/page.tsx
import { getProductBySlug } from "@/app/actions/database";
import { notFound } from "next/navigation";

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      
      {/* Imágenes */}
      <div className="images">
        {product.images.map((img, i) => (
          <img key={i} src={img} alt={product.name} />
        ))}
      </div>

      {/* Especificaciones */}
      <div className="specs">
        <p>Dimensiones: {product.dimensions}</p>
        <p>Material: {product.material}</p>
        <p>Color: {product.color}</p>
      </div>
    </div>
  );
}
```

## 4. Filtrar por categoría

```tsx
// src/app/categorias/[slug]/page.tsx
import { getProductsByCategory } from "@/app/actions/database";

export default async function CategoryPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const products = await getProductsByCategory(params.slug);

  return (
    <div>
      <h1>Productos de la categoría</h1>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

## 5. Mostrar colecciones

```tsx
// src/components/sections/Collections.tsx (actualizado)
import { getFeaturedCollections } from "@/app/actions/database";

export async function Collections() {
  const collections = await getFeaturedCollections();

  return (
    <section>
      <h2>Colecciones Destacadas</h2>
      <div className="grid">
        {collections.map((collection) => (
          <div key={collection.id}>
            <h3>{collection.name}</h3>
            <p>{collection.description}</p>
            <p>{collection.products.length} productos</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## 6. Galería de arte

```tsx
// src/app/arte/page.tsx
import { getFeaturedArtPieces } from "@/app/actions/database";

export default async function ArtePage() {
  const artPieces = await getFeaturedArtPieces();

  return (
    <div className="art-gallery">
      {artPieces.map((piece) => (
        <div key={piece.id} className="art-card">
          <img src={piece.image} alt={piece.title} />
          <h3>{piece.title}</h3>
          <p className="artist">{piece.artist.name}</p>
          <p className="medium">{piece.medium}</p>
          <p className="dimensions">{piece.dimensions}</p>
          <p className="price">${piece.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## 7. Formulario de contacto

```tsx
// src/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/database";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      alert("Mensaje enviado correctamente");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono (opcional)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <textarea
        placeholder="Mensaje"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## 8. Página de artista

```tsx
// src/app/artistas/[slug]/page.tsx
import { getArtistBySlug } from "@/app/actions/database";
import { notFound } from "next/navigation";

export default async function ArtistPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const artist = await getArtistBySlug(params.slug);

  if (!artist) {
    notFound();
  }

  return (
    <div>
      <div className="artist-header">
        {artist.photo && <img src={artist.photo} alt={artist.name} />}
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>
        
        {artist.website && (
          <a href={artist.website} target="_blank">
            Sitio web
          </a>
        )}
        
        {artist.instagram && (
          <a href={`https://instagram.com/${artist.instagram}`} target="_blank">
            Instagram
          </a>
        )}
      </div>

      <div className="artist-works">
        <h2>Obras</h2>
        <div className="grid">
          {artist.artPieces.map((piece) => (
            <div key={piece.id}>
              <img src={piece.image} alt={piece.title} />
              <h3>{piece.title}</h3>
              <p>{piece.medium}</p>
              <p>${piece.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 9. Navegación de categorías

```tsx
// src/components/CategoryNav.tsx
import { getAllCategories } from "@/app/actions/database";
import Link from "next/link";

export async function CategoryNav() {
  const categories = await getAllCategories();

  return (
    <nav className="category-nav">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/categorias/${category.slug}`}
        >
          {category.name} ({category._count.products})
        </Link>
      ))}
    </nav>
  );
}
```

## 10. Búsqueda de productos (Server Action personalizada)

```tsx
// src/app/actions/database.ts (agregar)
export async function searchProducts(query: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        inStock: true,
      },
      include: {
        category: true,
      },
      take: 20,
    });

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}
```

```tsx
// src/components/SearchBar.tsx
"use client";

import { useState } from "react";
import { searchProducts } from "@/app/actions/database";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const products = await searchProducts(query);
    setResults(products);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
      />
      <button onClick={handleSearch}>Buscar</button>

      <div className="results">
        {results.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 💡 Tips importantes

### 1. Server Components vs Client Components

- **Server Components** (por defecto): Pueden usar Server Actions directamente
- **Client Components** ("use client"): Deben llamar Server Actions con `async/await`

### 2. Revalidación de caché

```tsx
import { revalidatePath } from "next/cache";

// Después de crear/actualizar datos
await prisma.product.create({ ... });
revalidatePath("/productos"); // Revalida la página
```

### 3. Manejo de errores

```tsx
try {
  const result = await someServerAction();
  // Manejar éxito
} catch (error) {
  // Manejar error
  console.error(error);
}
```

### 4. Loading states

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await serverAction();
  } finally {
    setIsLoading(false);
  }
};
```

---

¡Estos ejemplos te ayudarán a integrar la base de datos en toda tu aplicación! 🚀
