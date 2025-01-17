# README.md

# Arquetipo Service

Este proyecto es un servicio para la gestión de libros, que permite realizar operaciones como obtener, guardar y eliminar libros. Utiliza TypeScript y Prisma para la interacción con la base de datos.

## Estructura del Proyecto

- **src/application/UsesCases/**: Contiene los casos de uso para la gestión de libros.

  - **BookById**: Recupera un libro por su ID.
  - **BookDelete**: Elimina un libro por su ID.
  - **BookGetAll**: Recupera todos los libros.
  - **BookSave**: Guarda un nuevo libro.

- **src/domain/**: Define la entidad del libro.

  - **Book.ts**: Representa la entidad del libro con propiedades como id, title, author y publishedDate.

- **src/infrastructure/database/**: Implementa la lógica para interactuar con la base de datos.

  - **PrismaBookRepository.ts**: Implementa la lógica de acceso a datos utilizando Prisma.

- **src/serviceContainer.ts**: Configura y exporta los servicios de libros.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

- Para obtener todos los libros, utiliza el servicio correspondiente.
- Para guardar un nuevo libro, utiliza el servicio de guardado.
- Para eliminar un libro, utiliza el servicio de eliminación.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.# pacasmayo-hexagonal
