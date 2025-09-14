#!/bin/bash

echo "🚀 Setting up RuPaul's Drag Race API Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install workspace dependencies
echo "📦 Installing workspace dependencies..."
npm install --workspaces

# Build shared package first (other packages depend on it)
echo "🔨 Building shared package..."
cd packages/shared && npm run build && cd ../..

# Build all packages
echo "🔨 Building all packages..."
npm run build

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "🐳 Docker is available. You can run 'docker-compose up' to start the development environment."
else
    echo "⚠️  Docker is not installed. You'll need to set up PostgreSQL and Redis manually."
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and configure your environment variables"
echo "2. Run 'npm run api:dev' to start the API in development mode"
echo "3. Run 'npm run pipeline:dev' to start the data pipeline in development mode"
echo "4. Or run 'docker-compose up' to start the full development environment"
