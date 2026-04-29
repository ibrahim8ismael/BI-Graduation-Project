from pydantic import BaseModel, EmailStr, Field
from typing import Literal


UserRole = Literal["ceo", "product_manager", "marketer"]


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: UserRole


class UserResponse(BaseModel):
    id: str
    email: str
    role: UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
