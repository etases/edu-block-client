# BUILD

FROM node:gallium-alpine as build

WORKDIR /project/app

COPY . .

RUN npm install --package-lock-only

RUN npm ci

RUN npm run build

# DEPLOY

FROM caddy:alpine

COPY --from=build /project/app/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile
