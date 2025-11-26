from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..schemas import StudentProfileCreate, StudentProfileOut
from ..models import StudentProfile
from ..dependencies import get_db, get_current_user_id

router = APIRouter()

@router.post("/", response_model=StudentProfileOut)
async def create_or_update_profile(payload: StudentProfileCreate, user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    existing_profile = result.scalar_one_or_none()

    if existing_profile:
        for key, value in payload.dict().items():
            setattr(existing_profile, key, value)
        await db.commit()
        await db.refresh(existing_profile)
        return existing_profile
    else:
        profile = StudentProfile(**payload.dict(), user_id=user_id)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
        return profile

@router.get("/me", response_model=StudentProfileOut)
async def get_my_profile(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please create one.")
    return profile
