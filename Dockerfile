# Next.js standalone — Fly.io
# https://nextjs.org/docs/app/building-your-application/deploying#docker-image

FROM node:20-bookworm-slim AS base
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/data/gallery-data.json /app/data/gallery-data.json
COPY --from=builder /app/data/gallery/uploads /app/data/gallery/uploads
ENV GALLERY_READ_ONLY=true

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
