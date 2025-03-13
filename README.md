# README.md

# Arquetipo Service con arquitectura hexagonal

Este proyecto es un servicio para la gestión de libros y autores, que permite realizar operaciones como obtener, guardar, editar y eliminar libros y autores. Utiliza TypeScript y Prisma para la interacción con la base de datos. La arquitectura del proyecto sigue el patrón **Hexagonal Architecture**, también conocido como arquitectura de puertos y adaptadores, que facilita la separación de las preocupaciones y la independencia de los frameworks.

<p align="center">
<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3NtdGM3MDBrMzA3a25tOXVheHNxMzVhb2MxdTl3ODJ0ZmRlM2hmZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1nPdOCiWBw3YOzA9G9/giphy.gif" width="150"/>
</p>

> [!TIP]
> Se recomienda editores de codigo basados en **vscode**

> [!IMPORTANT]  
> Se recomienda instalar la extension de biome en el editor de codigo que se encuentra en la carpeta `/.vscode/extension.json`

> [!IMPORTANT]  
> docker-comose esta dewsactiualziado Se recomienda instalar la extension de biome en el editor de codigo que se encuentra en la carpeta `/.vscode/extension.json`


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

## Uso

- Para obtener todos los libros, utiliza el servicio correspondiente.
- Para guardar un nuevo libro, utiliza el servicio de guardado.
- Para eliminar un libro, utiliza el servicio de eliminación.
- Para obtener todos los autores, utiliza el servicio correspondiente.
- Para guardar un nuevo autor, utiliza el servicio de guardado.
- Para eliminar un autor, utiliza el servicio de eliminación.


## Formateadores y linters 

<img align="right" width="33%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAADNCAMAAAAsYgRbAAAAM1BMVEUVFRVgpfpbnOtNgcAoOU8fJzI2VHoyS2saHiRXk907XYhSis9Eb6UtQl0jMEBAZpZJeLPkMmawAAAFHklEQVR4nO2c6WKqQAyFi1it1KXv/7S3uBSBWbJBEm6+3zLmmDAns7QfH0EQBMF/zE47AEn2TasdgiBN02iHIMftV812aq3p2WtHIcVdzVZq7SGm+dSOQ4T2qWYbyXmJaY7akQiw+1OzgeTsBzEbsNDmHe1guHQjNc4tdN+M8V1rzRTtgDjcZmo819pMjOvkJNT4tdBdQo3b5LQpMV7lfKXFNAftwEgk68xrcqbGOeDRQrNiPCanK6hxZ6H5OvNYa0Ux7mqtosbXjkfGOJ0mpybGVbuWNU6PyanWmSc5uQZtjJd2DVBnfpJTNs4BHxYKFOMjOaUGbYyHdg0sxsMB1QGhxn6tYcSYb9dAxukmOTgxxts1oHH6SA7UOAcMWyisQRtjt10jiLFba/g667FaayQxZpNDVGOzXUMap+3koBq0ESft0BOQxVhs18h11qMd/BSKcQ5Ya9fQDZrl5NCMc8CUhfLqrKfTlvAGW4ylWuPWWY+dWhMQYyg5ImqsWCjLOAe0ZTyREWPEQoXE2Kg1oTrr0ZYiYZwD+jsezAZtjLYYCeMc0LbQTFQP8HKsiGkPX6UP7ruTfTmPEC7AT1/q2Vo02goHfCt/+S6q0dzxIE6p+5+8HAsWiiebI+3AyBxTamy0awTS6fFZa9l+VTssIhk1+u0ahWxXpB0Yiew8rd2ukciJ8ZmcvBqHci7W1Vy7drZ6a7vMVadSw6Z9QFXqvX75nk+7xc8rWugBtJyentaWP60iBHFXcJKdyhpco12b/0En+NcuV+bqybkit2smj2M/vyjwy6hUNeu1a5SNp/EIybVNUb4lLVMLKW8P3FmlXSNuCE4mKcgjK4jBvzDJ0CCPLG2hjD10ym+yrBjG6cbkJYDN7ku2a590LbNb9sCnlqs13knNZDDiY2KcWWLwbvNgIQtlnjrh3eaJQS2zFwDxpLwYrhbya9MscJ8IXhcLqJFOjsBB7bTl0lPD1zJzG9T9XFELlRAz/X1hZ6Av5CyU2mOW1fCepiMj5jweFNtVSN3NlxEzrRXM3kjqeSJS107Yv5GEGAGfEVIj0K4x+8wBjts8YYsp7eGXQn/bRd8f7+s7jtu8RmWKqe1FzrkCRyaIYScH92U76F0bqppzfdwCqNSgvoq4huWIuS6lheA2Dzjt2mJa6I5Mt1BwW0iYa6hqyLUGFUOZNzE1PIbYrkF3mot3H3PgZ/4/aLUGG/ubNDarkaV8H2zSQRiMmBpKuwYamFRlH8ztX0JyQFMA+ciY6DZP8NMOYFDiKwMcvQT26wA7ARUxn4ef9tRfWO8SkxBTDdareWKOsxXeeSyJqQaZnHpq8iaWeyd2b7uvXDW4dq0+Xu7JylL1USP0TuAFxkLrByu39IOQQ8TfHAmsziVTk1xggg+XJIC3a1U3SM4pa2h4A1xr1ZFSD4n+sRcEoJjqIjfxDP+9RgNs12pNTeKca9VX5gVMDX4UsR1EFCAxtaKZv346YmAWWhlj3jfT/4cNE0i7VhkCncsFWUDNKnGnqVtobX4+Tdabq4Sdo2qh9WXh7l2P4B+vU2AW2p3d32/CW+DzqVkocJizgTrrKdca/PZpv9ewenM2p6gGswnZ6qemokY7ODRFC9UODs+21BTaNeIRtCr5WlNqh3lk1RiYcvFk2zXtwGjkLFQ7LiLbUpNp17TDorItNckTS9l/gbQm21KTslC/alLJcawm0a4JXXxWwev/jAmCIAiCIAiCIAiCIAiCIAiCIAiCQIh/Z9k8wj4otDYAAAAASUVORK5CYII=">

> [!CAUTION]
>   #### Ya no se usa el linter de eslint y prettier
>    La compatibilidad de la ultima version de eslint y sus versiones anteriores es mala; al igual que la compatibilidad con prettier. Se ha encontrado una libreria que es mas robusta y facil de usar que el linter de eslint y prettier. Librería: **[Biome](https://biomejs.dev/)** usa un formato de codigo mas estricto y facil de entender. Tanto para resolver errores como para formatear el codigo.


## Instalación
### 1. Instalar dependencias con npm 
- Ejecuta `npm install` para instalar las dependencias.
### 2. Instalar extensiones de desarrollo
- Instala las extensiones que se encuentra en la carpeta `/.vscode/extension.json` esto ayudar a mejroar la experiencia de desarrollo.

### 3. Desplegue en local
- Ejecuta `npm run dev` para iniciar el servidor en modo de desarrollo.
- En caso se desee usar docker se puede ejecutar `npm run dev:docker` para iniciar el servidor en modo de desarrollo con docker.
> [!IMPORTANT]
> Para levantar el proyecto con docker se debe tener apuntado las variables de entorno en el archivo `.env.test`
> el comando es npm run 


## Pruebas unitarias
- Ejecuta `npm run test:unit` para ejecutar las pruebas unitarias.
- Ejecuta `npm run test:integration` para ejecutar las pruebas de integración.
- Ejecuta `npm run test:e2e` para ejecutar las pruebas de extremo a extremo.


> [!WARNING]
> Las pruebas de integracion y e2e levantan un contenedor de docker creando data mock en la base de datos. Asegurate no estar apuntado en produccion


## Scripts

### Scripts Disponibles

- **`doc`**: Genera la documentación Swagger.
- **`generate`**: Genera los tipos de Prisma.
- **`migrate`**: Ejecuta las migraciones de desarrollo utilizando Prisma.
- **`migrate:prod`**: Despliega las migraciones en el entorno de producción.
- **`migrate:test`**: Despliega las migraciones en el entorno de pruebas.

### Tests
- **`test:integration`**: Ejecuta pruebas de integración con Docker.
- **`test:integration:down`**: Detiene los contenedores Docker de pruebas.
- **`test:unit`**: Ejecuta pruebas unitarias con Jest.
- **`test:e2e`**: Ejecuta pruebas end-to-end.

### Calidad de Código
- **`lint`**: Ejecuta Biome para verificar problemas de código.
- **`format`**: Formatea el código usando Biome.
- **`check`**: Ejecuta todas las verificaciones de Biome.

### Desarrollo
- **`start`**: Inicia la aplicación en producción.
- **`build`**: Compila el código TypeScript y copia archivos proto.
- **`dev`**: Inicia la aplicación en modo desarrollo con hot-reload.
- **`dev:docker`**: Inicia la aplicación en Docker usando variables de `.env.test`.
- **`tsc`**: Ejecuta el compilador de TypeScript.
- **`release`**: Gestiona el versionado del proyecto.

## Contribuciones
 [DELFOSTI](https://delfosti.com)

## Licencia

Este proyecto está bajo la Licencia MIT.# pacasmayo-hexagonal



variables de entorno
