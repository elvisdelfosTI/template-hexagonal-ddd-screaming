# Gestión de Libros y Autores
![Express](https://img.shields.io/badge/express-5.0.0-brightgreen?logo=express)
![Node.js](https://img.shields.io/badge/nodejs-22.0.0-brightgreen?logo=node.js)
![Versión](https://img.shields.io/badge/version-1.0.0-blue)
![typescript](https://img.shields.io/badge/logo-typescript-blue?logo=typescript)


Servicio para la gestión de libros y autores utilizando arquitectura hexagonal (ports and adapters).


## 🚀 Características Principales

- Gestión completa de libros y autores
- Arquitectura hexagonal para mejor mantenibilidad
- TypeScript como lenguaje principal
- Drizzle como ORM
- Documentación con Swagger

## 📋 Requisitos

- Node.js (v18 o superior)
- npm
- Docker (opcional)

## 🛠️ Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Instalar extensiones recomendadas de VSCode (ver `.vscode/extensions.json`)

## 🏗️ Estructura del Proyecto
### Hexagonal Architecture + DDD + Screaming Architecture 

```
src/
├── lib/
│   ├── book/           # Módulo de libros
│   ├── author/         # Módulo de autores
│   └── shared/         # Código compartido
├── config/             # Configuraciones
└── main.ts            # Punto de entrada
```

## 📦 Scripts Principales

```bash
# Desarrollo
npm run dev           # Inicia servidor en desarrollo
npm run dev:docker    # Inicia con Docker

# Pruebas
npm run test:unit     # Pruebas unitarias
npm run test:integration # Pruebas de integración
npm run test:e2e      # Pruebas end-to-end

# Calidad de Código
npm run check         # Verifica con Biome
npm run check:fix     # Corrige problemas

# Documentación
npm run doc           # Inicia servidor de documentación
```

## 🛡️ Calidad de Código

El proyecto utiliza Biome para:
- Formateo de código
- Linting
- Organización de imports

## 📚 Base de Datos

El proyecto utiliza Drizzle como ORM. Comandos principales:

```bash
npm run generate      # Genera tipos
npm run migrate      # Ejecuta migraciones (desarrollo)
npm run migrate:prod # Ejecuta migraciones (producción)
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue las guías de contribución.


## 📄 Licencia

MIT License

---

Desarrollado por [DELFOSTI](https://delfosti.com)# template-hexagonal-ddd-screaming
