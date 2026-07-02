# MathStack Panel de Administrador

Panel de control para gestionar el contenido y los usuarios de **MathStack**. Provee una interfaz gráfica avanzada para que los administradores puedan subir materiales académicos, crear retos sociales, administrar la tienda de avatares, y visualizar estadísticas generales de la plataforma.

Construido como una Single Page Application (SPA) con **React**, **Vite** y **Tailwind CSS**.

---

## 📦 Stack técnico

| Componente | Tecnología |
|---|---|
| Framework UI | React |
| Bundler & Dev Server | Vite |
| Estilos & Diseño | Tailwind CSS |
| Iconografía | Lucide React |
| Comunicación API | Fetch API (`src/admin/api/apiClient.ts`) |

---

### Módulos (Vistas) Disponibles

- **Dashboard:** Estadísticas generales, usuarios activos y métricas de retención.
- **Usuarios:** Gestión de cuentas, modificación de roles, y moderación.
- **Tienda (Avatares):** Catálogo de ítems virtuales. Soporta la conversión de imágenes locales a Base64 para subirlas al servidor.
- **Materiales:** Gestión de lecciones, PDFs, videos y ejercicios con recompensas XP.
- **Retos:** Creación y seguimiento de desafíos sociales (fecha límite, premios en coins).

---


## 🔗 Integración

Este panel interactúa directamente con los endpoints restringidos para administradores en el backend de MathStack (ej. `/api/v1/admin/*`, `/api/v1/store/items`, etc.), usando el token JWT proporcionado al iniciar sesión. Todas las peticiones están centralizadas en los archivos dentro de `src/admin/api/` y `src/admin/services/`.
