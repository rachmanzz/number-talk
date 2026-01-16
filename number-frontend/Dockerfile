FROM node:24.13-alpine3.22

WORKDIR /app

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat


ENV npm_config_build_from_source=true

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

# === PRODUCTION BUILD ===
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]
