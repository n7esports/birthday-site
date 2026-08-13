from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


class Photo(BaseModel):
    id: int
    title: str
    url: str
    year: str
    description: Optional[str] = None


# Sample data
photos = [
    Photo(id=1, title="Childhood", url="/images/gallery/childhood.jpg", year="1995"),
    Photo(id=2, title="School Days", url="/images/gallery/school.jpg", year="2005"),
    Photo(id=3, title="Graduation", url="/images/gallery/graduation.jpg", year="2015"),
    Photo(id=4, title="Travel", url="/images/gallery/travel.jpg", year="2018"),
]


@router.get("/")
async def get_photos():
    return photos


@router.get("/{photo_id}")
async def get_photo(photo_id: int):
    for photo in photos:
        if photo.id == photo_id:
            return photo
    raise HTTPException(status_code=404, detail="Photo not found")