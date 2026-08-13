#!/bin/bash

echo "🦀 Building WASM modules..."

cd rust-wasm

# Build with wasm-pack
wasm-pack build --target web --out-dir ../frontend/src/wasm

echo "✅ WASM build complete!"
echo "📁 Output: frontend/src/wasm/"