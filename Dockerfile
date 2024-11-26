FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /app/env && echo "$PRODUCTION" > /app/env/production.env

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/env/production.env ./env/production.env

COPY --from=build /app/package*.json ./

RUN npm install --production

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "start"]
