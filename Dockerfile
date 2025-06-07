# ============================
# Etapa 1: compilar Angular
# ============================
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# ============================
# Etapa 2: servir con NGINX
# ============================
FROM nginx:alpine
COPY --from=builder /app/dist/mirsanlab-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
