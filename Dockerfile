# Base image
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy Prisma schema
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .
# Set DATABASE_URL environment variable
ARG _DATABASE_URL
ARG _KINDE_CLIENT_ID
ARG _KINDE_CLIENT_SECRET
ARG _KINDE_ISSUER_URL
ARG _KINDE_SITE_URL
ARG _KINDE_POST_LOGOUT_REDIRECT_URL
ARG _KINDE_POST_LOGIN_REDIRECT_URL
ARG _REDIS_URL
ARG _REDIS_TOKEN
ARG _UPLOADTHING_SECRET
ARG _BASE_URL
ARG _SIGNATURE_KEY
ARG _STORE_ID
ARG _SUPABASE_KEY

ENV DATABASE_URL=$_DATABASE_URL
ENV KINDE_CLIENT_ID=$_KINDE_CLIENT_ID
ENV KINDE_CLIENT_SECRET=$_KINDE_CLIENT_SECRET
ENV KINDE_ISSUER_URL=$_KINDE_ISSUER_URL
ENV KINDE_SITE_URL=$_KINDE_SITE_URL
ENV KINDE_POST_LOGOUT_REDIRECT_URL=$_KINDE_POST_LOGOUT_REDIRECT_URL
ENV KINDE_POST_LOGIN_REDIRECT_URL=$_KINDE_POST_LOGIN_REDIRECT_URL
ENV REDIS_URL=$_REDIS_URL
ENV REDIS_TOKEN=$_REDIS_TOKEN
ENV UPLOADTHING_SECRET=$_UPLOADTHING_SECRET
ENV BASE_URL=$_BASE_URL
ENV SIGNATURE_KEY=$_SIGNATURE_KEY
ENV STORE_ID=$_STORE_ID
ENV SUPABASE_KEY=$_SUPABASE_KEY

# Install dependencies based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Generate Prisma client
RUN npx prisma generate



# Build application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js