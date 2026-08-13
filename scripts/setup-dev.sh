#!/bin/bash

echo "🔧 Setting up development environment..."

# Frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Backend
echo "📦 Installing backend dependencies..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Rust
echo "📦 Installing Rust dependencies..."
cd rust-wasm
cargo fetch
cd ..

echo "✅ Development environment ready!"
echo "🚀 Run 'npm run dev' to start"