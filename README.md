# Sitio web — Lic. Fernanda Dei Castelli (Nutricionista, Posadas)

Sitio de una sola página con:
- **Frontend**: React + Vite (`/frontend`)
- **Backend**: Node.js + Express + Nodemailer (`/backend`), que recibe el
  formulario de contacto y envía un email a `fersii@hotmail.com`.

## Estructura

```
nutri-site/
├── frontend/   → sitio React (lo que ve el visitante)
└── backend/    → servidor Node que envía el mail del formulario
```

## 1) Poner en marcha el backend (envío de mails)

```bash
cd backend
cp .env.example .env
```

Editá `.env` y completá los datos SMTP. La forma más simple y gratuita es usar
una cuenta de **Gmail** con "contraseña de aplicación":

1. Andá a tu Cuenta de Google → Seguridad → Verificación en 2 pasos (activarla si no lo está).
2. Buscá "Contraseñas de aplicaciones", generá una para "Correo".
3. Usá esa contraseña de 16 dígitos en `SMTP_PASS` (no tu contraseña normal).
4. `SMTP_USER` es la dirección de Gmail que envía los correos.
5. `CONTACT_EMAIL` ya está seteado en `fersii@hotmail.com` — ahí llegan las consultas
   (podés recibir en Hotmail aunque el envío salga desde una cuenta de Gmail).

Otras opciones válidas de SMTP: Zoho Mail, Outlook/Office365, SendGrid, Brevo, etc.
Solo hay que cambiar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` y `SMTP_PASS`.

Instalar dependencias y correr:

```bash
npm install
npm run dev      # con reinicio automático, para desarrollo
# o
npm start        # para producción
```

El backend queda escuchando en `http://localhost:4000`.
Podés probar que está vivo entrando a `http://localhost:4000/api/health`.

## 2) Poner en marcha el frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Se abre en `http://localhost:5173`. El formulario de contacto ya apunta a
`http://localhost:4000` (definido en `VITE_API_URL` dentro de `.env`).

## 3) Build para producción

```bash
cd frontend
npm run build
```

Esto genera la carpeta `frontend/dist` con el sitio ya optimizado, listo para
subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages, un
hosting compartido, etc.).

**Importante:** antes de hacer el build para el sitio en vivo, editá
`frontend/.env` con la URL pública real del backend, por ejemplo:

```
VITE_API_URL=https://api.tudominio.com
```

## 4) Dónde alojar cada parte

- **Frontend** (`frontend/dist`): cualquier hosting estático. Opciones simples
  y gratuitas: Vercel, Netlify, Cloudflare Pages.
- **Backend** (`/backend`): necesita un servidor Node corriendo, no hostings
  estáticos. Opciones simples: Render, Railway, Fly.io (todas tienen plan
  gratuito o muy económico). También puede ir en el mismo servidor si ya
  tenés un VPS.

Recordá configurar en el backend la variable `CORS_ORIGIN` con el dominio
real del frontend una vez esté publicado, para que el formulario funcione.

## Personalización rápida

- **Fotos**: reemplazá `frontend/src/assets/fernanda.jpg` por otra foto con
  el mismo nombre de archivo, o cambiá la ruta en `Hero.jsx` y `About.jsx`.
- **Textos**: todo el contenido está directamente en los componentes dentro
  de `frontend/src/components/` (son legibles, en español).
- **Colores**: se definen todos en `frontend/src/index.css`, al principio del
  archivo (variables `--bg`, `--ink`, `--clay`, `--gold`, `--sage`).
- **Redes sociales / ubicación / email**: aparecen en `Header.jsx`,
  `Footer.jsx` y `Contact.jsx`.

## Notas sobre las imágenes del sitio

El diseño no usa fotos de stock de terceros para evitar problemas de derechos
de autor: el sitio usa la foto que enviaste y un motivo gráfico circular
propio (diseñado especialmente, sin depender de bancos de imágenes) que
combina el concepto de "plato equilibrado" con el de "mapa de puntos"
(en referencia a la auriculoterapia). Si más adelante querés sumar fotos
del consultorio o de platos de comida, se pueden incorporar fácilmente en
`frontend/src/assets/`.
