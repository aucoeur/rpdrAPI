FROM node:18-alpine

WORKDIR /app

# Install Playwright dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Copy package files
COPY package*.json ./
COPY packages/data-pipeline/package*.json ./packages/data-pipeline/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/data-pipeline ./packages/data-pipeline
COPY packages/shared ./packages/shared

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
