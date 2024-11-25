# Etapa 1: Construcción (Build)
FROM mongo-express AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Etapa 2: Producción
FROM mongo-express AS production

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo el package.json y package-lock.json para optimizar las dependencias
COPY --from=build /app/package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --production

# Copiar el código fuente desde la etapa de construcción
COPY --from=build /app .

# Exponer el puerto en el que la API va a estar disponible
EXPOSE 3000

# Comando para ejecutar la API
CMD ["npm", "start"]
