from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.schemas import StudentProfileCreate, StudentProfileOut 
from app.models import StudentProfile
from app.dependencies import get_db, get_current_user_id
import logging
from fastapi import Request


# -------------------------
# Logger setup
# -------------------------
logger = logging.getLogger("profiles")
if not logger.hasHandlers():
    logging.basicConfig(level=logging.DEBUG)

router = APIRouter(
    tags=["profiles"]
)

@router.post("/", response_model=StudentProfileOut)
async def create_or_update_profile(
    request: Request,
    payload: StudentProfileCreate, 
    user_id: str = Depends(get_current_user_id), 
    db: AsyncSession = Depends(get_db)
):
    # Log the raw request body
    raw_body = await request.json()
    logger.debug("Raw request body: %s", raw_body)

    # Then normal payload dict
    payload_dict = payload.dict(exclude_unset=True)
    logger.debug("Parsed payload dict: %s", payload_dict)

    # 1. Check if profile exists
    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    existing_profile = result.scalar_one_or_none()

    if existing_profile:
        # UPDATE existing profile
        for key, value in payload_dict.items():
            setattr(existing_profile, key, value)
        
        await db.commit()
        await db.refresh(existing_profile)
        logger.debug("Updated existing profile: %s", existing_profile.id)
        return existing_profile
    else:
        # CREATE new profile
        profile = StudentProfile(**payload_dict, user_id=user_id)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)
        logger.debug("Created new profile: %s", profile.id)
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
        logger.debug("Profile not found for user_id: %s", user_id)
        raise HTTPException(status_code=404, detail="Profile not found. Please create one.")
    
    logger.debug("Retrieved profile for user_id: %s", user_id)
    return profile