# Música de Fondo para Hero

Para agregar música de fondo a la experiencia del hero:

1. **Agrega tu archivo de música** a la carpeta `public/` con el nombre `hero-music.mp3` (o cualquier formato de audio compatible con navegadores: .mp3, .ogg, .wav)

2. **Formatos recomendados:**
   - MP3 (mejor compatibilidad)
   - OGG (buena calidad y compresión)
   - WAV (alta calidad, archivo más grande)

3. **Recomendaciones:**
   - Música ambiental o instrumental
   - Volumen moderado (el componente ya está configurado al 30%)
   - Duración: 30 segundos a 2 minutos (se reproduce en loop)
   - Tamaño de archivo: menos de 5MB para mejor rendimiento

4. **Sitios para encontrar música libre de derechos:**
   - [Pixabay Music](https://pixabay.com/music/)
   - [Free Music Archive](https://freemusicarchive.org/)
   - [Incompetech](https://incompetech.com/)
   - [YouTube Audio Library](https://www.youtube.com/audiolibrary)

5. **Ejemplo de nombres de archivo:**
   - `hero-music.mp3`
   - `background-music.mp3`
   - `ambient-sound.mp3`

Una vez agregado el archivo, actualiza la línea en `AnimatedHero.tsx`:
```typescript
audioRef.current.src = "/hero-music.mp3"; // Cambia el nombre si usas otro
```
