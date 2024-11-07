# Etapa 1: Construcción de la aplicación Angular
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

RUN npm run build --omit=dev

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa 1
COPY --from=build /app/dist/app/browser /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]