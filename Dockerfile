# BUILD

FROM node:gallium-alpine as build

ARG VITE_RS_API_BASE_URL=http://localhost:7070
ARG VITE_OCR_API_BASE_URL=http://localhost:8000

WORKDIR /project

COPY . .

RUN yarn && yarn build

# DEPLOY

FROM caddy:alpine

EXPOSE 80

COPY --from=build /project/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile

