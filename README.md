# Rick and Morty Explorer

Aplicación web desarrollada en Vue 3 que permite explorar y gestionar información sobre los personajes de Rick and Morty.

## 🚀 Características

- 🎯 Vista dual: cuadrícula y tabla
- 🌓 Modo oscuro/claro
- 🔍 Búsqueda y filtros avanzados
- ⭐ Sistema de favoritos
- 📱 Diseño totalmente responsive
- 📊 Exportación a CSV
- 🎨 Interfaz moderna con Tailwind CSS

## 🛠️ Tecnologías

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- Vitest para testing
- Rick and Morty API

## 📋 Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/rick-and-morty-vue.git
cd rick-and-morty-vue
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 🧪 Testing

Ejecutar los tests unitarios:
```bash
npm test
```

Ver cobertura de tests:
```bash
npm run test:coverage
```

## 📦 Construcción

Para construir la aplicación para producción:
```bash
npm run build
```

## 🎨 Estructura del proyecto

```
rick-and-morty-vue/
├── src/
│   ├── components/      # Componentes Vue
│   ├── services/        # Servicios (API, storage)
│   ├── assets/         # Recursos estáticos
│   └── App.vue         # Componente raíz
├── tests/
│   └── unit/          # Tests unitarios
└── ...configuración
```

## 🔍 Características detalladas

### Vista de cuadrícula
- Tarjetas con información detallada
- Imágenes optimizadas con lazy loading
- Animaciones suaves
- Marcado de favoritos

### Vista de tabla
- Ordenación por columnas
- Vista compacta de información
- Acciones rápidas
- Exportación a CSV

### Filtros
- Búsqueda por nombre
- Filtro por estado
- Filtro por especie
- Filtro por género

### Sistema de favoritos
- Persistencia local
- Sincronización entre vistas
- Animaciones de interacción

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
