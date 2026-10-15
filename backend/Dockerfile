# ==========================================
# 1. Base Stage
# ==========================================
FROM node:22-alpine AS base
WORKDIR /app

# Install curl for healthcheck and gcompat if needed for native bindings
RUN apk add --no-cache curl gcompat

# ==========================================
# 2. Dependencies Stage (Production only)
# ==========================================
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ==========================================
# 3. Builder Stage (Compiles TypeScript)
# ==========================================
FROM base AS builder
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ==========================================
# 4. Runner Stage (Final Production Image)
# ==========================================
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Create dedicated non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 hono

WORKDIR /app

# Copy production dependencies and compiled build
COPY --from=deps --chown=hono:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=hono:nodejs /app/dist ./dist
COPY --from=builder --chown=hono:nodejs /app/package.json ./package.json

# Pre-create uploads directory and ensure correct ownership for non-root user
RUN mkdir -p /app/uploads/chat && chown -R hono:nodejs /app

USER hono

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-3000}/health || exit 1

CMD ["node", "dist/index.js"]
