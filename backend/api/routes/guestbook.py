from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/guestbook", tags=["guestbook"])


class Message(BaseModel):
    id: int
    name: str
    message: str
    emoji: str
    timestamp: datetime


messages = [
    Message(
        id=1,
        name="🎉 Party Planner",
        message="Happy Birthday! Let the celebration begin!",
        emoji="🎂",
        timestamp=datetime.now()
    )
]


@router.get("/")
async def get_messages():
    return sorted(messages, key=lambda x: x.timestamp, reverse=True)


@router.post("/")
async def create_message(name: str, message: str, emoji: str = "🎉"):
    new_message = Message(
        id=len(messages) + 1,
        name=name,
        message=message,
        emoji=emoji,
        timestamp=datetime.now()
    )
    messages.append(new_message)
    return new_message