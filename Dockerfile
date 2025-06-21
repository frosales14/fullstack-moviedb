# Multi-stage build for backend
FROM node:18-alpine3.15 AS backend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

FROM node:18-alpine3.15 AS backend-builder
WORKDIR /app/backend
COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY backend/ .
RUN npm run build

# Multi-stage build for frontend
FROM node:18-alpine AS frontend-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY frontend/ .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Install production dependencies for backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --only=production
COPY --from=backend-builder /app/backend/dist ./dist

# Install production dependencies for frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --only=production
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/.next/standalone ./
COPY --from=frontend-builder /app/frontend/.next/static ./.next/static

# Create a startup script with proper wait mechanism
WORKDIR /app
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "Starting backend..."' >> start.sh && \
    echo 'cd /app/backend && PORT=3000 node dist/main &' >> start.sh && \
    echo 'BACKEND_PID=$!' >> start.sh && \
    echo 'echo "Backend started with PID: $BACKEND_PID"' >> start.sh && \
    echo 'echo "Waiting for backend to be ready..."' >> start.sh && \
    echo 'sleep 5' >> start.sh && \
    echo 'echo "Starting frontend..."' >> start.sh && \
    echo 'cd /app/frontend && PORT=3001 NEXT_PUBLIC_API_BASE_URL=http://localhost:3000 node server.js' >> start.sh && \
    chmod +x start.sh

EXPOSE 3000 3001

CMD ["./start.sh"] 