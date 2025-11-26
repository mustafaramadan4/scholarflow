from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..schemas import UserCreate, UserOut
from ..db import AsyncSessionLocal
from ..models import User
from passlib.context import CryptContext
from ..auth import create_access_token
from pydantic import BaseModel

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# ---------- Signup Route ----------
@router.post("/signup", response_model=UserOut)
async def signup(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    # hash the password
    hashed = pwd_context.hash(payload.password)
    user = User(email=payload.email, password_hash=hashed, role=payload.role, name=payload.name)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

# ---------- Token Route (existing stub) ----------
@router.post("/token")
async def token(email: str, password: str, db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(select(User).where(User.email == email))
    user = stmt.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # skip password check for stub
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

# ---------- New Login Route ----------
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
    
    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }