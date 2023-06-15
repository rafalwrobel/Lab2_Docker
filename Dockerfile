# Etap 1: Budowanie aplikacji
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etap 2: Tworzenie optymalnego obrazu

FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app ./

RUN npm install

EXPOSE 8000

CMD ["node", "server.js"]
LABEL author="Rafał Wróbel"

