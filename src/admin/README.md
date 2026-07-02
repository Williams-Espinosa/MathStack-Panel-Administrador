# MathStack Admin Panel

Panel de administración para MathStack con autenticación Google OAuth, gestión de usuarios, tienda de canjes y generación de avatares.

## 🔗 API Endpoints

### Autenticación
- `POST /api/admin/auth/login`
- `POST /api/admin/auth/google`
- `POST /api/admin/auth/reset-password`
- `GET /api/admin/auth/verify`

### Dashboard
- `GET /api/admin/dashboard/stats`
- `GET /api/admin/dashboard/active-users`
- `GET /api/admin/dashboard/difficulty-stats`

### Usuarios
- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id/coins`
- `GET /api/admin/users/:id/activity`

### Tienda
- `GET /api/admin/store/items`
- `POST /api/admin/store/items`
- `PUT /api/admin/store/items/:id`
- `DELETE /api/admin/store/items/:id`

### Avatares
- `POST /api/admin/avatars/generate`
- `GET /api/admin/avatars`
- `GET /api/admin/avatars/:id`
- `DELETE /api/admin/avatars/:id`

### Retos
- `GET /api/admin/challenges`
- `GET /api/admin/challenges/:id`
- `POST /api/admin/challenges`
- `PUT /api/admin/challenges/:id`
- `DELETE /api/admin/challenges/:id`
- `GET /api/admin/challenges/:id/participants`

### Lecciones
- `GET /api/admin/lessons`
- `GET /api/admin/lessons/:id`
- `POST /api/admin/lessons`
- `PUT /api/admin/lessons/:id`
- `DELETE /api/admin/lessons/:id`

### Ejercicios
- `GET /api/admin/exercises`
- `GET /api/admin/exercises/:id`
- `POST /api/admin/exercises`
- `PUT /api/admin/exercises/:id`
- `DELETE /api/admin/exercises/:id`
- `GET /api/admin/lessons/:lessonId/exercises`

### Materias
- `GET /api/admin/subjects`
- `GET /api/admin/subjects/:id`
- `POST /api/admin/subjects`
- `PUT /api/admin/subjects/:id`
- `DELETE /api/admin/subjects/:id`

### Diagnósticos
- `GET /api/admin/diagnostics`
- `GET /api/admin/users/:userId/diagnostics`
- `POST /api/admin/diagnostics`

### Sesiones de Práctica
- `GET /api/admin/practice-sessions`
- `GET /api/admin/users/:userId/practice-sessions`
### Estadísticas
- `GET /api/admin/stats/overview`
- `GET /api/admin/stats/users`
- `GET /api/admin/stats/challenges`
- `GET /api/admin/stats/revenue`
- `GET /api/admin/stats/engagement`

## 🌐 DiceBear API

El generador de avatares usa [DiceBear API](https://www.dicebear.com/) con 28+ estilos:

- Bottts (robots)
- Avataaars
- Pixel Art
- Fun Emoji
- Y muchos más...

URL base: `https://api.dicebear.com/9.x/{style}/svg?seed={seed}`
