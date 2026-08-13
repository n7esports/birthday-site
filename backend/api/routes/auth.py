from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import jwt
import os
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/auth", tags=["auth"])

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class UserLogin(BaseModel):
    username: str
    password: str


class UserRegister(BaseModel):
    username: str
    password: str
    email: Optional[str] = None


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register")
async def register(user: UserRegister):
    # In production, save to database
    return {
        "message": "User registered successfully",
        "username": user.username,
        "token": create_access_token({"sub": user.username})
    }


@router.post("/login")
async def login(user: UserLogin):
    # In production, verify credentials from database
    if user.username == "admin" and user.password == "password":
        return {
            "access_token": create_access_token({"sub": user.username}),
            "token_type": "bearer",
            "username": user.username
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")