# BUILD

FROM node:gallium-alpine as build

WORKDIR /project

COPY . .

RUN yarn && yarn build

# DEPLOY

FROM caddy:alpine

EXPOSE 80

COPY --from=build /project/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile

