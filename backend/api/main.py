# @ts-ignore
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# @ts-ignore
from fastapi.middleware.cors import CORSMiddleware
# @ts-ignore
from fastapi.responses import JSONResponse
# @ts-ignore
import asyncio
# @ts-ignore
from typing import List, Dict

app = FastAPI(
    title="Birthday API",
    description="API for Ultimate Birthday Experience",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_names: Dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket, name: str = "Guest"):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.user_names[websocket] = name
        await self.broadcast(f"{name} joined the party! 🎉")

    def disconnect(self, websocket: WebSocket):
        name = self.user_names.get(websocket, "Guest")
        self.active_connections.remove(websocket)
        del self.user_names[websocket]
        return name

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@app.get("/")
async def root():
    return {
        "message": "🎂 Happy Birthday API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "connections": len(manager.active_connections)}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    name = f"User_{len(manager.active_connections) + 1}"
    await manager.connect(websocket, name)
    
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{name}: {data}")
    except WebSocketDisconnect:
        name = manager.disconnect(websocket)
        await manager.broadcast(f"{name} left the party 👋")
