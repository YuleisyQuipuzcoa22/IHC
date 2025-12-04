# 🧁 Dulcinelly - Experiencia UI/UX & E-commerce

![React](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.3-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.1-cyan) ![Zustand](https://img.shields.io/badge/State-Zustand-bear)

Plataforma web interactiva desarrollada para la pastelería **Dulcinelly** (Trujillo, Perú). Este proyecto es una implementación académica centrada en la **Interacción Humano-Computador (IHC)**, priorizando la experiencia de usuario, flujos de navegación intuitivos y simulación de procesos reales de E-commerce sin dependencia de backend.

> ⚠️ **Nota Técnica:** La persistencia de datos (usuarios, carrito, sesiones) se maneja localmente mediante **LocalStorage** y archivos JSON simulados. Si borras la caché del navegador, el estado se reiniciará.


## 🔑 Credenciales de Acceso (Demo)

Para explorar todas las funcionalidades, incluyendo el **Dashboard Administrativo** con métricas, utiliza las siguientes credenciales precargadas:

| Rol | Correo | Contraseña | Acceso a |
| :--- | :--- | :--- | :--- |
| **Administrador** 👮 | `admin@dulcinelly.com` | `admin123` | Dashboard, Métricas, Gestión de Productos |
| **Cliente** 👤 | *(Registro libre)* | *(Cualquiera)* | Catálogo, Carrito, Compra |

## ✨ Funcionalidades Clave

### 🛒 Experiencia de Cliente (Frontend)
- **Catálogo Interactivo:** Filtrado dinámico por categorías (Pasteles, Postres, Bocaditos) consumiendo `productos.json`.
- **Carrito de Compras:** Gestión de estado global con **Zustand** (agregar, eliminar, calcular total).
- **Checkout Simulado:** Flujo de pago visual con integración UI de **Yape** (QR) y Tarjeta de Crédito BCP.
- **Validaciones UX:** Formularios robustos con feedback inmediato usando `Formik` + `Yup`.

### 📊 Experiencia Administrativa (Dashboard)
- **Visualización de Datos:** Gráficos estadísticos implementados con **Recharts** para:
    - Productos más vendidos.
    - Distribución de ventas por categoría.
- **Gestión de Inventario:** Interfaz para visualización de stock y productos (CRUD simulado).

## 🛠️ Stack Tecnológico

| Área | Tecnología | Uso en el proyecto |
|------|------------|--------------------|
| **Core** | React 18 + Vite (JS) | SPA rápida y optimizada |
| **Estilos** | Tailwind CSS v4 | Diseño responsivo y moderno |
| **Estado** | Zustand | Manejo de carrito y sesión de usuario |
| **UI Components** | Ant Design + React Icons | Elementos de interfaz y navegación |
| **Formularios** | Formik + Yup | Manejo de inputs y validación de esquemas |
| **Gráficos** | Recharts | Visualización de métricas en Dashboard |

## 🏗️ Estructura del Proyecto

La arquitectura separa la lógica de negocio simulada de la interfaz visual.

```text
src/
├── components/       # Componentes UI reutilizables (Cards, Modales, Botones)
├── data/            # 💾 MOCK DATABASE
│   ├── productos.json  # Catálogo base
│   └── usuarios.json   # Usuarios precargados (Admin)
├── hooks/           # Custom Hooks (useContadorAnimado, useOnScreen)
├── pages/           # Vistas (Home, Catalogo, Checkout, DashboardAdmin)
├── utils/           # Estados globales (Zustand)
    ├── carrito.js      # Lógica del carrito
    ├── login_registro.js # Lógica de autenticación
    └── pedidos.js      # Historial de pedidos
```
## 🚀 Instalación y Despliegue
1. Clonar el repositorio
```text
gh repo clone YuleisyQuipuzcoa22/IHC
(https://github.com/YuleisyQuipuzcoa22/IHC.git)
cd IHC
```
2. Instalar las dependencias
```text
cd frontend
npm install
npm install recharts
```
3. Ejecutar servidor de desarrollo
```text
npm run dev
```
7. Abrir en el navegador. Ingresa a
```text
http://localhost:5173
```
e inicia sesión con las credenciales de demo (administrador) o de lo contrario, regístrate como cliente.
   
