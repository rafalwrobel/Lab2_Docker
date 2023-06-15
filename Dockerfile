# Użyj obrazu bazowego Node.js
FROM node:19.5.0-alpine

# Utwórz katalog roboczy w kontenerze
WORKDIR /myapp

# Skopiuj plik package.json i package-lock.json (jeśli istnieje) do kontenera
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj kod źródłowy do kontenera
COPY . .

#Wykonaj polecenie build
RUN npm run build

# Skonfiguruj zmienne środowiskowe
ENV PORT=8000

# Wykonaj polecenie uruchamiające serwer
CMD ["node", "server.js"]
