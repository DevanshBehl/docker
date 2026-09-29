FROM oven/bun:1
WORKDIR /usr/src/app

# Install deps first so this layer is cached until a manifest changes
COPY package.json bun.lock turbo.json ./
COPY packages ./packages
COPY apps/ws/package.json ./apps/ws/package.json
RUN bun install

COPY apps/ws ./apps/ws
# Builds @repo/db (prisma generate + tsc) and then ws. No database needed.
RUN bunx turbo run build --filter=ws

ENV NODE_ENV=production
EXPOSE 3002

# DATABASE_URL is supplied at runtime; apply pending migrations, then start
CMD ["sh", "-c", "cd packages/db && bunx prisma migrate deploy && cd ../.. && bun run start:ws"]
