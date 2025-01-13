# Build aşaması
FROM node:20-buster AS build
WORKDIR /usr/src/app

# Gerekli bağımlılıkları yükle
RUN apt-get update && apt-get install -y --no-install-recommends \
    libssl1.1 wget curl tar build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Bağımlılık dosyalarını yükle
COPY package*.json yarn.lock ./
RUN yarn install

# Kodları kopyala ve Prisma client'ı oluştur
COPY . .
RUN npx prisma generate

# Uygulamayı derle
RUN yarn build

# Çalışma zamanı (runtime) aşaması
FROM node:20-buster-slim AS runtime
WORKDIR /usr/src/app

# Gerekli bağımlılıkları yükle
RUN apt-get update && apt-get install -y --no-install-recommends \
    libssl1.1 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Build aşamasından dosyaları kopyala
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.env .env
COPY --from=build /usr/src/app/dist/prisma ./dist/prisma

# Ortam değişkenlerini ayarla
ENV NODE_ENV=production
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "dist/src/main.js"]