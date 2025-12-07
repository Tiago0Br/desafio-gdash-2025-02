# Build stage: compile TypeScript and install dependencies
FROM node:22-alpine AS builder

# Enable pnpm package manager
RUN corepack enable

WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy source code and build the application
COPY . .
RUN pnpm run build

# Remove dev dependencies to reduce image size
RUN pnpm prune --prod

# Production stage: minimal runtime image
FROM node:22-alpine

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose API port
EXPOSE 3000

# Start the Node.js application
CMD ["node", "dist/infra/main"]