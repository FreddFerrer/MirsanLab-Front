# ==============================
# Dockerfile (FRONTEND sin NGINX)
# ==============================
# 1) Etapa de compilación de Angular
FROM node:18-alpine AS builder
WORKDIR /app

# 1.1 Copiar package.json y lock para cachear dependencias
COPY package.json package-lock.json ./
RUN npm install

# 1.2 Copiar el resto del código y compilar en modo producción
COPY . .
# En lugar de "-- --prod", usar "-- --configuration production"
RUN npm run build -- --configuration production

# 2) Etapa de producción usando http-server
FROM node:18-alpine AS runner
WORKDIR /app

# 2.1 Instalar servidor estático
RUN npm install -g http-server

# 2.2 Copiar la carpeta `dist` generada en la etapa builder
COPY --from=builder /app/dist/mirsanlab-frontend ./dist

# Exponer el puerto 80 para servir el build
EXPOSE 80

# Punto de entrada: http-server servirá la carpeta ./dist
CMD ["http-server", "dist", "-p", "80", "--cors"]
