from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..schemas import UserCreate, UserOut
from ..models import User
from passlib.context import CryptContext
from ..auth import create_access_token
from pydantic import BaseModel
from ..dependencies import get_db

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup", response_model=UserOut)
async def signup(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(select(User).where(User.email == payload.email))
    if stmt.scalar_one_or_none():
         raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(payload.password)
    user = User(email=payload.email, password_hash=hashed, role=payload.role, name=payload.name)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(select(User).where(User.email == payload.email))
    user = stmt.scalar_one_or_none()
    if not user or not pwd_context.verify(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"token": token, "user": {"id": user.id, "name": user.name, "email": user.email}}
