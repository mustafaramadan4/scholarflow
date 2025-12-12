from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
# Ensure these imports match your actual file structure
from app.schemas import StudentProfileCreate, StudentProfileOut 
from app.models import StudentProfile
from app.dependencies import get_db, get_current_user_id

router = APIRouter(
    tags=["profiles"]
)

@router.post("/", response_model=StudentProfileOut)
async def create_or_update_profile(
    payload: StudentProfileCreate, 
    user_id: str = Depends(get_current_user_id), 
    db: AsyncSession = Depends(get_db)
):
    # 1. Check if profile exists
    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    existing_profile = result.scalar_one_or_none()

    # 2. Convert Pydantic model to dict, filtering out values that weren't sent
    # This relies on the Schema (below) converting camelCase -> snake_case
    updated_data = payload.dict(exclude_unset=True)

    if existing_profile:
        # UPDATE existing profile
        for key, value in updated_data.items():
            setattr(existing_profile, key, value)
        
        await db.commit()
        await db.refresh(existing_profile)
        return existing_profile
    else:
        # CREATE new profile
        # We unpack (**updated_data) so 'grade_level' goes to 'grade_level' column
        profile = StudentProfile(**updated_data, user_id=user_id)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
        return profile

@router.get("/me", response_model=StudentProfileOut)
async def get_my_profile(
    user_id: str = Depends(get_current_user_id), 
    db: AsyncSession = Depends(get_db)
):
    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    profile = result.scalar_one_or_none()
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found. Please create one.")
    
    return profile
