#!/bin/bash

echo "🚀 Deploying Birthday Site..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "📦 Building backend..."
cd backend
docker build -t birthday-backend .
cd ..

# Build WASM
echo "📦 Building WASM modules..."
cd rust-wasm
wasm-pack build --target web
cd ..

# Deploy with Docker Compose
echo "🐳 Starting Docker containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Deployment complete!"
echo "🌐 Site running at: http://localhost:3000"
echo "🔗 API at: http://localhost:8000"