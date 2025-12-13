from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from app.schemas import ApplicationCreate, ApplicationOut
from app.models import Application, StudentProfile
from app.dependencies import get_db, get_current_user_id
from pydantic import BaseModel
from uuid import UUID

class ApplyRequest(BaseModel):
    scholarship_id: UUID
    
router = APIRouter()

@router.post("/", response_model=ApplicationOut)
async def create_application(
    payload: ApplyRequest,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    scholarship_id = payload.scholarship_id

    stmt = select(StudentProfile).where(StudentProfile.user_id == user_id)
    result = await db.execute(stmt)
    profile = result.scalar_one_or_none()

    if not profile:
        raise HTTPException(status_code=400, detail="You must create a student profile before applying.")

    app_rec = Application(
        profile_id=profile.id,
        scholarship_id=scholarship_id,
        status="submitted"
    )

    db.add(app_rec)
    await db.commit()
    await db.refresh(app_rec)
    return app_rec

@router.get("/", response_model=list[ApplicationOut])
async def list_my_applications(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    stmt = select(Application).join(StudentProfile, Application.profile_id == StudentProfile.id).where(StudentProfile.user_id == user_id)
    res = await db.execute(stmt)
    return res.scalars().all()
