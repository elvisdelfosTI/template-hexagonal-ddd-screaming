# README.md

# Arquetipo Service

Este proyecto es un servicio para la gestión de libros y autores, que permite realizar operaciones como obtener, guardar, editar y eliminar libros y autores. Utiliza TypeScript y Prisma para la interacción con la base de datos. La arquitectura del proyecto sigue el patrón **Hexagonal Architecture**, también conocido como arquitectura de puertos y adaptadores, que facilita la separación de las preocupaciones y la independencia de los frameworks.

## Estructura del Proyecto

- **src/application/UsesCases/**: Contiene los casos de uso para la gestión de libros y autores.

  - **BookById**: Recupera un libro por su ID.
  - **BookDelete**: Elimina un libro por su ID.
  - **BookGetAll**: Recupera todos los libros.
  - **BookSave**: Guarda un nuevo libro.
  - **AuthorById**: Recupera un autor por su ID.
  - **AuthorDelete**: Elimina un autor por su ID.
  - **AuthorGetAll**: Recupera todos los autores.
  - **AuthorSave**: Guarda un nuevo autor.

- **src/domain/**: Define las entidades del libro y el autor.

  - **Book.ts**: Representa la entidad del libro con propiedades como id, title, author y publishedDate.
  - **Author.ts**: Representa la entidad del autor con propiedades como id, name, email, password y age.

- **src/infrastructure/database/**: Implementa la lógica para interactuar con la base de datos.

  - **PrismaBookRepository.ts**: Implementa la lógica de acceso a datos para libros utilizando Prisma.
  - **PrismaAuthorRepository.ts**: Implementa la lógica de acceso a datos para autores utilizando Prisma.

- **src/serviceContainer.ts**: Configura y exporta los servicios de libros y autores.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

- Para obtener todos los libros, utiliza el servicio correspondiente.
- Para guardar un nuevo libro, utiliza el servicio de guardado.
- Para eliminar un libro, utiliza el servicio de eliminación.
- Para obtener todos los autores, utiliza el servicio correspondiente.
- Para guardar un nuevo autor, utiliza el servicio de guardado.
- Para eliminar un autor, utiliza el servicio de eliminación.

## Scripts

- **`migrate`**: Ejecuta las migraciones de desarrollo utilizando Prisma.
- **`migrate:prod`**: Despliega las migraciones en el entorno de producción.
- **`migrate:test`**: Despliega las migraciones en el entorno de pruebas.
- **`test:integration`**: Ejecuta pruebas de integración.
- **`test:integration:down`**: Detiene los servicios de Docker utilizados para las pruebas de integración.
- **`test:unit`**: Ejecuta pruebas unitarias.
- **`test:e2e`**: Ejecuta pruebas de extremo a extremo.
- **`lint`**: Ejecuta ESLint para verificar y corregir problemas de estilo de código.
- **`prepare`**: Instala Husky para gestionar hooks de Git.
- **`start`**: Inicia la aplicación desde el archivo compilado.
- **`build`**: Compila el código TypeScript.
- **`dev`**: Inicia la aplicación en modo de desarrollo.
- **`dev:docker`**: Inicia los servicios necesarios con Docker y ejecuta la aplicación en modo de desarrollo.
- **`tsc`**: Ejecuta el compilador de TypeScript.
- **`release`**: Realiza un proceso de liberación utilizando `release-it`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.# pacasmayo-hexagonal
