FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build   # создаст dist/styles.css (и, возможно, другие файлы)

FROM nginx:alpine
# Копируем статические файлы из корня
COPY index.html /usr/share/nginx/html/
COPY src /usr/share/nginx/html/src/
# Копируем результат сборки CSS
COPY --from=builder /app/dist/styles.css /usr/share/nginx/html/dist/styles.css
# Если есть другие файлы в dist (например, иконки) — скопируйте их
# COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80