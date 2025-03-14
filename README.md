# README.md

# Arquetipo Service con arquitectura hexagonal

Este proyecto es un servicio para la gestión de libros y autores, que permite realizar operaciones como obtener, guardar, editar y eliminar libros y autores. Utiliza TypeScript y Prisma para la interacción con la base de datos. La arquitectura del proyecto sigue el patrón **Hexagonal Architecture**, también conocido como arquitectura de puertos y adaptadores, que facilita la separación de las preocupaciones y la independencia de los frameworks.

<p align="center">
<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NtdGM3MDBrMzA3a25tOXVheHNxMzVhb2MxdTl3ODJ0ZmRlM2hmZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1nPdOCiWBw3YOzA9G9/giphy.gif" width="150"/>
</p>

> [!TIP]
> Se recomienda editores de código basados en **VSCode**

> [!IMPORTANT]  
> Se recomienda instalar la extensión de Biome en el editor de código que se encuentra en la carpeta `/.vscode/extensions.json`

## Estructura del Proyecto

La aplicación sigue una estructura de arquitectura hexagonal con las siguientes capas:

### Capa de Aplicación
- **src/lib/*/application/UsesCases/**: Contiene los casos de uso para la gestión de libros y autores.
  - **Book**: Casos de uso para libros (Create, Delete, Edit, GetAll, GetById)
  - **Author**: Casos de uso para autores (Create, Delete, Edit, GetAll, GetById)

### Capa de Dominio
- **src/lib/*/domain/**: Define las entidades y sus reglas de negocio
  - Entidades principales: Book, Author
  - Value Objects: AuthorId, AuthorAge, etc.

### Capa de Infraestructura
- **src/lib/*/infrastructure/**: Implementaciones concretas
  - Repositorios
  - Adaptadores de base de datos

## Configuración y Desarrollo

### Requisitos Previos
- Node.js
- npm
- Docker (opcional)

### Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
- Copia `.env.example` a `.env`
- Ajusta las variables según tu entorno

3. **Instalar extensiones recomendadas:**
- Instala las extensiones listadas en `/.vscode/extension.json`

### Scripts Principales

#### Desarrollo
- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run dev:docker`: Inicia el servidor usando Docker

#### Pruebas
- `npm run test:unit`: Ejecuta pruebas unitarias
- `npm run test:integration`: Ejecuta pruebas de integración
- `npm run test:e2e`: Ejecuta pruebas end-to-end

#### Calidad de Código
- `npm run check`: Verifica el código con Biome
- `npm run check:fix`: Ejecuta todas las verificaciones

## Formateador y Linter

Este proyecto utiliza **Biome** en lugar de ESLint y Prettier. Biome ofrece:
- Mayor rendimiento
- Configuración más simple
- Mejor integración entre formateo y linting
- Reglas más estrictas y coherentes

> [!NOTE]
> Biome es una alternativa moderna a ESLint y Prettier que combina ambas funcionalidades en una sola herramienta.

## Base de Datos

El proyecto utiliza Prisma como ORM con los siguientes comandos principales:
- `npm run generate`: Genera los tipos de Prisma
- `npm run migrate`: Ejecuta migraciones en desarrollo
- `npm run migrate:prod`: Ejecuta migraciones en producción
> [!NOTE]
> Las migraciones se pueden manejar de mejor manera para este proyecto.

## Documentacion

El proyecto utiliza Swagger para generar documentacion comandos principales:
- `npm run doc`: Despliega un servidor de documentación

## Contribuciones
 [DELFOSTI](https://delfosti.com)

## Licencia
Este proyecto está bajo la Licencia MIT.
