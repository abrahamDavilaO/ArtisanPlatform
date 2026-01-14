# 🔐 Configuración de Autenticación OAuth

Este proyecto usa **NextAuth.js** para autenticación con Google, Facebook y Apple.

## 📋 Configuración de Google OAuth

### Paso 1: Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **APIs & Services** > **Credentials**

### Paso 2: Configurar OAuth Consent Screen

1. Click en **OAuth consent screen**
2. Selecciona **External** (para testing) o **Internal** (si tienes Google Workspace)
3. Completa la información requerida:
   - **App name**: Artisan Platform
   - **User support email**: tu email
   - **Developer contact**: tu email
4. Click **Save and Continue**
5. En **Scopes**, agrega:
   - `userinfo.email`
   - `userinfo.profile`
6. Click **Save and Continue**
7. Agrega usuarios de prueba (tu email) si es External
8. Click **Save and Continue**

### Paso 3: Crear Credenciales OAuth 2.0

1. Ve a **Credentials** > **Create Credentials** > **OAuth client ID**
2. Selecciona **Web application**
3. Nombre: `Artisan Web Client`
4. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   ```
5. **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click **Create**
7. **¡IMPORTANTE!** Copia el **Client ID** y **Client Secret**

### Paso 4: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los valores:
   ```env
   GOOGLE_CLIENT_ID=tu-client-id-aqui
   GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
   ```
3. Genera un secret para NextAuth:
   ```bash
   # En PowerShell:
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
   ```
4. Reemplaza `NEXTAUTH_SECRET` con el valor generado

### Paso 5: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo
npm run dev
```

## 🎉 ¡Listo!

Ahora cuando hagas click en "Continuar con Google", se abrirá la ventana de autenticación de Google.

---

## 📱 Configuración de Facebook OAuth (Opcional)

### Paso 1: Crear una App en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Click en **My Apps** > **Create App**
3. Selecciona **Consumer** > **Next**
4. Nombre de la app: `Artisan Platform`
5. Click **Create App**

### Paso 2: Configurar Facebook Login

1. En el dashboard, busca **Facebook Login** > **Set Up**
2. Selecciona **Web**
3. Site URL: `http://localhost:3000`
4. Click **Save**

### Paso 3: Obtener Credenciales

1. Ve a **Settings** > **Basic**
2. Copia el **App ID** y **App Secret**
3. Agrega a `.env.local`:
   ```env
   FACEBOOK_CLIENT_ID=tu-app-id
   FACEBOOK_CLIENT_SECRET=tu-app-secret
   ```

### Paso 4: Configurar Valid OAuth Redirect URIs

1. Ve a **Facebook Login** > **Settings**
2. En **Valid OAuth Redirect URIs**, agrega:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
3. Click **Save Changes**

---

## 🍎 Apple Sign In (Avanzado)

Apple Sign In requiere:
- Una cuenta de Apple Developer ($99/año)
- Configuración de App ID y Service ID
- Certificados y keys

Por ahora, puedes dejar el botón de Apple deshabilitado o mostrar un mensaje de "Próximamente".

---

## 🔒 Producción

Cuando despliegues a producción (ej: Vercel):

1. Actualiza las URLs autorizadas en Google Cloud Console:
   ```
   https://tu-dominio.com
   https://tu-dominio.com/api/auth/callback/google
   ```

2. Actualiza `.env.local` en Vercel con:
   ```env
   NEXTAUTH_URL=https://tu-dominio.com
   NEXTAUTH_SECRET=nuevo-secret-super-seguro
   ```

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
- Verifica que la URL de callback en Google Console coincida exactamente con:
  `http://localhost:3000/api/auth/callback/google`

### Error: "invalid_client"
- Verifica que el Client ID y Secret estén correctos en `.env.local`
- Reinicia el servidor después de cambiar `.env.local`

### No pasa nada al hacer click
- Abre la consola del navegador (F12) para ver errores
- Verifica que NextAuth esté instalado: `npm list next-auth`

---

## 📚 Recursos

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Guide](https://developers.facebook.com/docs/facebook-login/web)
