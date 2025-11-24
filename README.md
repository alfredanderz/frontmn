# MNPRAEIS - Frontend

Sistema de Marketing Multinivel - Interfaz Web

## Instalación

```bash
npm install
```

## 🏃 Ejecutar en desarrollo

## 🏗️ Compilar para producción

```bash
npm run build
```

## 📁 Estructura del Proyecto

- `/src/api` - Configuración de Axios
- `/src/components` - Componentes reutilizables
- `/src/pages` - Páginas de la aplicación
- `/src/context` - Context API para estado global
- `/src/hooks` - Custom hooks
- `/src/utils` - Funciones utilitarias

## 🎨 Tecnologías

- React 18
- React Router v6
- Tailwind CSS
- Axios

## 👤 Usuarios de Prueba

**Admin:**

- Usuario: `admin`
- Contraseña: `admin123`

## 🌐 Variables de Entorno

Crea un archivo `.env` en la raíz:

```
REACT_APP_API_URL=http://localhost:8081/api
```

## 📝 Páginas Disponibles

### Público:

- `/` - Catálogo de productos
- `/login` - Iniciar sesión
- `/register` - Registrarse

### Socio:

- `/dashboard` - Dashboard del socio
- `/mi-red` - Ver red de referidos
- `/crear-pedido` - Crear nuevo pedido
- `/mis-pedidos` - Ver mis pedidos
- `/mi-perfil` - Mi perfil

### Admin:

- `/admin/dashboard` - Dashboard administrativo
- `/admin/socios` - Gestión de socios
- `/admin/productos` - Gestión de productos
- `/admin/pedidos` - Gestión de pedidos
- `/admin/reportes` - Reportes y estadísticas
