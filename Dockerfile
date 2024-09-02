FROM node:20 as builder

WORKDIR /app

# Copy package files and install dependencies
COPY ./nostrudel/package*.json ./
COPY ./nostrudel/yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy application files
COPY ./nostrudel .

# Build
ENV VITE_COMMIT_HASH=""
ENV VITE_APP_VERSION="Start9-OS"
RUN yarn build

FROM nginx:stable-alpine-slim

RUN apk update && \
    apk add --no-cache yq && \
    rm -rf /var/cache/apk/*

EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
