# syntax=docker/dockerfile:1
FROM node:20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy package files and install dependencies
COPY ./nostrudel/package*.json .
COPY ./nostrudel/pnpm-lock.yaml .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# set version env
ARG COMMIT_HASH=""
ARG APP_VERSION="Start9-OS"
ENV VITE_COMMIT_HASH="$COMMIT_HASH"
ENV VITE_APP_VERSION="$APP_VERSION"

# Copy application files
COPY ./nostrudel/tsconfig.json .
COPY ./nostrudel/vite.config.ts .
COPY ./nostrudel/index.html .
COPY ./nostrudel/public ./public
COPY ./nostrudel/src ./src

# build
RUN pnpm build

FROM nginx:stable-alpine-slim

RUN apk update && \
    apk add --no-cache yq && \
    rm -rf /var/cache/apk/*

EXPOSE 8080
COPY --from=build /app/dist /usr/share/nginx/html

ADD ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod a+x /usr/local/bin/docker_entrypoint.sh
