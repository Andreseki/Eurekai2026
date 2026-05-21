# EurekAI — sitio web (Next.js)

Proyecto Next.js 16 en esta carpeta (`b_TrbjEp1UcFI`). Desde la carpeta padre `bootcamp` puedes usar `npm run dev` (delega aquí).

## Cómo está organizado (vista rápida)

```
app/                    → Rutas (URLs)
  layout.tsx            → Envuelve todo: modales + WhatsApp
  page.tsx              → Inicio (/)
  experiencias/         → /experiencias
  bootcamp/             → /bootcamp
  nosotros/             → importa componente en components/

components/             → UI reutilizable
  Navbar.tsx            → Banner naranja + menú gris
  Footer.tsx
  eurekai-home-page.tsx → Secciones del Home
  testimonials-carousel.tsx
  site-modals-provider.tsx

lib/                    → Datos y config (sin JSX)
styles/home-page.css    → Estilos por sección del Home (QA diseño)

public/                 → Imágenes y SVG
```

## Flujo de una página

1. El usuario entra a una URL → Next carga `app/.../page.tsx`.
2. `page.tsx` renderiza un componente grande (ej. `EurekAiHomePage`).
3. Ese componente monta `Navbar`, secciones y `Footer`.
4. `layout.tsx` ya envolvió la app con `SiteModalsProvider` (contacto, agenda, WhatsApp).

## Navbar (banner + menú)

En páginas con hero:

1. `<Navbar />` sticky arriba (sigue visible al hacer scroll).
2. `<section className="eurekai-hero-section">` con la foto `absolute inset-0`.
3. La clase `eurekai-hero-section` sube el bloque con `margin-top` negativo para que la imagen quede **detrás del menú**, sin franja blanca del `body`.

| Bloque | Rol |
|--------|-----|
| Banner `#F97316` | Opaco, pegado al borde superior |
| Menú `bg-white/95` + blur | Sobre la foto; los márgenes laterales muestran la imagen, no blanco |

## Home — secciones y CSS de QA

Archivo principal: `components/eurekai-home-page.tsx`  
Estilos por bloque: `styles/home-page.css`

| Clase CSS | Sección |
|-----------|---------|
| `.home-section-inner` | Ancho máximo 1280px |
| `.home-porque` | Por qué / habilidades |
| `.home-camino` | Experiencias formativas + próximas fechas |
| `.home-ventajas` | Ventajas |
| `.home-testimonios` | Testimonios (3 columnas) |
| `.home-facilitadores` | Facilitadores |
| `.home-faq` | Preguntas frecuentes |

Testimonios en inicio: `TestimonialsCarousel` con `desktopColumns={3}`, `controlsPosition="bottom"`, `cardSize="home"` (cajas 374×380, flechas y puntos abajo).

## Comandos

Desde la carpeta del proyecto (`b_TrbjEp1UcFI`):

```bash
npm run dev         # http://localhost:3000
npm run dev:clean   # borra .next y arranca (si ves 404)
npm run build
npm run lint
```

Desde la carpeta padre `bootcamp`:

```bash
npm run dev         # delega a b_TrbjEp1UcFI
npm run dev:clean
```

### Si ves error 404 en el navegador

1. Cierra servidores viejos (otra pestaña de terminal con `next dev`).
2. Usa **http://localhost:3000** (si el puerto está ocupado, la terminal dirá 3001).
3. Limpia caché y reinicia:

```bash
cd b_TrbjEp1UcFI
npm run dev:clean
```

El build (`npm run build`) debe listar la ruta `/` — si compila bien, el 404 suele ser caché `.next` corrupta o un proceso Node antiguo en el puerto 3000.

## Variables de entorno (opcional)

- `RESEND_API_KEY` — envío de correo en `/api/contact`
- Sin clave, el formulario puede usar FormSubmit (ver `app/api/contact/route.ts`)

## Repositorio

Remoto principal del cliente: `eurekai2026` → `https://github.com/Andreseki/Eurekai2026.git`
