# Usa una imagen base oficial de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Usa una imagen base más ligera para el entorno de producción
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia las dependencias instaladas y el código compilado desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copia el archivo .env
COPY .env .env

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["node", "dist/index.js"]
