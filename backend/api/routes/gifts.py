from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/api/gifts", tags=["gifts"])


class Gift(BaseModel):
    id: int
    name: str
    price: str
    emoji: str
    claimed: bool


gifts = [
    Gift(id=1, name="Smart Watch", price="$299", emoji="⌚", claimed=False),
    Gift(id=2, name="Book Collection", price="$75", emoji="📚", claimed=False),
    Gift(id=3, name="Gaming Console", price="$499", emoji="🎮", claimed=False),
    Gift(id=4, name="Spa Package", price="$150", emoji="🧖", claimed=False),
    Gift(id=5, name="Camera", price="$899", emoji="📷", claimed=False),
]


@router.get("/")
async def get_gifts():
    return gifts


@router.post("/{gift_id}/claim")
async def claim_gift(gift_id: int):
    for gift in gifts:
        if gift.id == gift_id:
            gift.claimed = True
            return {"message": f"Gift '{gift.name}' claimed!", "gift": gift}
    return {"error": "Gift not found"}