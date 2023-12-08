# syntax=docker/dockerfile:1
FROM node:20 as builder

WORKDIR /app
COPY ./nostrudel /app/

ENV VITE_COMMIT_HASH=""
ENV VITE_APP_VERSION="Start9-OS"
RUN yarn install && yarn build

FROM nginx:stable-alpine-slim
EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
