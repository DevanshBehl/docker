FROM oven/bun:1
WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

RUN bun install

COPY ./apps/ws ./apps/ws
RUN bun run db:migrate

EXPOSE 3002

CMD ["bun","run","start:ws"]
