FROM node:20-alpine AS base

WORKDIR /app

ENV ENV=production \
    PORT=3000

RUN apk add --no-cache openssl curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser && \
    adduser nodeuser nodejs && \
    chown -R nodeuser:nodejs /app

FROM base AS deps
COPY package*.json ./
RUN npm pkg delete scripts.prepare && \
    npm ci && \
    npm cache clean --force

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && \
    npm ci --omit=dev

FROM base AS runner
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:${PORT}/health || exit 1

EXPOSE ${PORT}
CMD ["npm", "start"]
