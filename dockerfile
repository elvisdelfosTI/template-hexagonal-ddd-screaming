    #Etapa base
    FROM node:20-alpine AS base
    WORKDIR /app
    ENV NODE_ENV=production \
        NEXT_TELEMETRY_DISABLED=1
    RUN apk add --no-cache openssl && \
        addgroup --system --gid 1001 nodejs && \
        rm -rf /var/cache/apk/*

    # Etapa deps
    FROM base AS deps
    COPY package.json package-lock.json ./
    RUN npm install --frozen-lockfile --production=false && \
        npm cache clean

    # Etapa builder
    FROM base AS builder
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npm build

    # Etapa runner
    FROM base AS runner
    WORKDIR /app
    COPY --from=builder /app/package.json /app/yarn.lock ./
    COPY --from=builder /app/next.config.mjs ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/prisma ./prisma
    RUN yarn install --production --frozen-lockfile --ignore-scripts && \
        yarn cache clean
    USER nextjs
    EXPOSE 3000
    CMD ["yarn", "start"]
