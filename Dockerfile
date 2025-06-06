# 1) Etapa de build de Angular
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar package.json y lock para cachear dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar resto del código y compilar en modo producción
COPY . .
RUN npm run build -- --prod

# 2) Etapa de producción usando http-server
FROM node:18-alpine AS runner
WORKDIR /app

# Instalar un servidor estático globalmente
RUN npm install -g http-server

# Copiar solamente la carpeta dist generada
COPY --from=builder /app/dist/clinica-frontend ./dist

# Exponer el puerto en el que correrá http-server
EXPOSE 80

# Comando por defecto para servir los archivos
CMD ["http-server", "dist", "-p", "80", "--cors"]
