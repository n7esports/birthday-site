# 🎂 Ultimate Birthday Experience

A cinematic 12-page birthday website with heavy GSAP animations, Rust/WASM for high-performance physics, and Python FastAPI backend.

## 🚀 Tech Stack
- **Frontend:** TypeScript, React 18, GSAP 3.12, CSS Modules
- **Backend:** Python 3.11, FastAPI, PostgreSQL, Redis
- **Performance:** Rust 1.70 + WebAssembly
- **Infrastructure:** Docker, Docker Compose, Nginx

## 📂 Project Structure
birthday-site/
├── frontend/ # React + TypeScript + GSAP
├── backend/ # Python FastAPI
├── rust-wasm/ # Rust WebAssembly modules
├── infrastructure/ # K8s, Nginx, Terraform
├── docs/ # Documentation
└── scripts/ # Build/deploy scripts

## 🎯 12 Pages
1. Landing - Cinematic hero with particle effects
2. Timeline - Life journey with ScrollTrigger
3. 3D Cake Builder - Three.js + Rust physics
4. Gallery - Masonry with Flip plugin
5. Countdown - Animated flip clock
6. Guestbook - Real-time message wall
7. Playlist - Audio visualizer with Rust FFT
8. Trivia - Interactive quiz game
9. Gifts - Wishlist with progress tracking
10. Virtual Room - Multiplayer avatars
11. Photo Booth - Camera + WASM filters
12. Finale - Fireworks + PDF recap

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Rust 1.70+
- Docker Desktop

### Installation
```bash
# Clone and enter directory
cd D:\Wassay\Personal\birthday-site

# Install all dependencies
npm run install:all

# Start development environment
npm run dev

# Build WASM modules
npm run build:wasm