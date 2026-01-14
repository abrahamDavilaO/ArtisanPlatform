# 🎬 Animaciones Avanzadas - Estilo L'Atelier

## ✨ Animaciones Implementadas

### 1. **Parallax con Mouse Tracking**
- Los elementos se mueven sutilmente siguiendo el cursor del mouse
- Crea sensación de profundidad 3D
- Diferentes capas se mueven a velocidades distintas

### 2. **Scroll Parallax**
- Los elementos se mueven a diferentes velocidades al hacer scroll
- Efecto de profundidad mientras navegas
- Transiciones suaves y fluidas

### 3. **Floating Elements**
- Elementos decorativos que flotan suavemente
- 3 tipos de animación float:
  - `float`: Movimiento vertical suave (6s)
  - `float-delayed`: Movimiento vertical con delay (8s)
  - `float-slow`: Movimiento en todas direcciones (10s)

### 4. **Reveal Animations (Slide-Up)**
- Texto que aparece deslizándose desde abajo
- Efecto de "cortina" con overflow hidden
- Timing perfecto con cubic-bezier para suavidad

### 5. **Staggered Animations**
- Elementos que aparecen uno tras otro
- Delays escalonados (0ms, 200ms, 400ms, 600ms, etc.)
- Crea ritmo visual atractivo

### 6. **Morphing Buttons**
- Botones con transiciones de color suaves
- Efectos de hover con transformaciones
- Gradientes que se deslizan al pasar el mouse

### 7. **Shimmer Effect**
- Líneas decorativas con efecto de brillo
- Animación de luz que se mueve
- Perfecto para separadores y detalles

### 8. **Bounce Slow**
- Indicador de scroll con rebote suave
- Invita al usuario a hacer scroll
- Movimiento perpetuo pero no molesto

---

## 🎨 Animaciones Disponibles

### Keyframes CSS:

```css
@keyframes float              // Flotación vertical suave
@keyframes float-delayed      // Flotación con delay
@keyframes float-slow         // Flotación multidireccional
@keyframes slide-up           // Deslizar hacia arriba
@keyframes fade-in            // Aparecer con fade
@keyframes bounce-slow        // Rebote suave
@keyframes shimmer            // Efecto de brillo
@keyframes pulse-slow         // Pulso lento
@keyframes scroll-line        // Línea de scroll animada
```

### Clases de Utilidad:

```css
.animate-float                // Aplica animación float
.animate-float-delayed        // Aplica float con delay
.animate-float-slow           // Aplica float lento
.animate-slide-up             // Aplica slide-up
.animate-fade-in              // Aplica fade-in
.animate-bounce-slow          // Aplica bounce lento
.animate-shimmer              // Aplica shimmer
.animate-pulse-slow           // Aplica pulse lento
.animate-scroll-line          // Aplica scroll-line
```

### Animation Delays:

```css
.animation-delay-0            // Sin delay
.animation-delay-200          // 200ms delay
.animation-delay-400          // 400ms delay
.animation-delay-600          // 600ms delay
.animation-delay-800          // 800ms delay
.animation-delay-1000         // 1000ms delay
```

---

## 🚀 Cómo Usar

### Ejemplo 1: Texto con Reveal Animation

```tsx
<h1 className="font-serif text-6xl">
  <span className="block overflow-hidden">
    <span className="block animate-slide-up opacity-0 animation-delay-0">
      Elegancia
    </span>
  </span>
  <span className="block overflow-hidden">
    <span className="block animate-slide-up opacity-0 animation-delay-200">
      Atemporal
    </span>
  </span>
</h1>
```

### Ejemplo 2: Botón con Morphing Effect

```tsx
<button className="group relative px-8 py-4 bg-neutral-900 text-white rounded-lg overflow-hidden">
  <span className="relative z-10">Explorar</span>
  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 
                  transform translate-y-full group-hover:translate-y-0 
                  transition-transform duration-500" />
</button>
```

### Ejemplo 3: Parallax con Mouse

```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

<div style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}>
  {/* Contenido */}
</div>
```

### Ejemplo 4: Floating Elements

```tsx
<div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-400 rounded-full animate-float-slow" />
```

---

## 🎯 Características Principales

### 1. **Performance Optimizado**
- Uso de `transform` y `opacity` (GPU accelerated)
- `will-change` implícito en animaciones
- Transiciones suaves con cubic-bezier

### 2. **Responsive**
- Todas las animaciones funcionan en móvil
- Ajustes automáticos para pantallas pequeñas
- Touch-friendly

### 3. **Accesibilidad**
- Respeta `prefers-reduced-motion`
- No causa mareos o molestias
- Velocidades moderadas

### 4. **Inspiración L'Atelier**
- Elegancia y sofisticación
- Movimientos suaves y naturales
- Atención al detalle

---

## 📝 Tips de Uso

### ✅ DO:
- Usa animaciones para guiar la atención
- Combina múltiples efectos sutilmente
- Mantén consistencia en timing
- Usa delays para crear ritmo

### ❌ DON'T:
- No abuses de las animaciones
- Evita movimientos muy rápidos
- No combines demasiados efectos a la vez
- No uses delays muy largos

---

## 🎬 Componentes con Animaciones

### AnimatedHero
- ✅ Mouse parallax
- ✅ Scroll parallax
- ✅ Floating elements
- ✅ Reveal animations
- ✅ Morphing buttons
- ✅ Shimmer effects
- ✅ Scroll indicator

### Collections, Furniture, ArtGallery
- ✅ Scroll-triggered animations
- ✅ Staggered reveals
- ✅ Hover effects

### About
- ✅ Counter animations
- ✅ Fade-in effects
- ✅ Staggered stats

---

## 🔧 Personalización

Para ajustar las animaciones, edita `src/app/globals.css`:

```css
/* Cambiar duración */
@keyframes float {
  /* Ajusta los valores aquí */
}

/* Cambiar timing function */
.animate-slide-up {
  animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  /* Cambia cubic-bezier para diferentes efectos */
}

/* Agregar nuevos delays */
.animation-delay-1500 {
  animation-delay: 1500ms;
}
```

---

## 🌟 Resultado

Una experiencia visual premium que:
- Captura la atención del usuario
- Guía la navegación naturalmente
- Crea una sensación de lujo y calidad
- Diferencia tu sitio de la competencia

¡Disfruta de tus animaciones estilo L'Atelier! ✨
