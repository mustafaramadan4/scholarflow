
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..schemas import StudentProfileCreate, StudentProfileOut
from ..db import AsyncSessionLocal
from ..models import StudentProfile
from uuid import UUID

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.post("/", response_model=StudentProfileOut)
async def create_profile(payload: StudentProfileCreate, db: AsyncSession = Depends(get_db)):
    profile = StudentProfile(**payload.dict())
    db.add(profile)
    await db.commit()
    await db.refresh(profile)
    return profile

@router.get("/", response_model=list[StudentProfileOut])
async def list_profiles(db: AsyncSession = Depends(get_db)):
    stmt = StudentProfile.__table__.select()
    res = await db.execute(stmt)
    rows = res.fetchall()
    return [r._asdict() for r in rows]
