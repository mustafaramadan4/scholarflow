
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import AsyncSessionLocal
from ..models import Application
from ..schemas import ApplicationCreate, ApplicationOut
from uuid import UUID

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.post("/", response_model=ApplicationOut)
async def create_application(payload: ApplicationCreate, db: AsyncSession = Depends(get_db)):
    app_rec = Application(**payload.dict())
    db.add(app_rec)
    await db.commit()
    await db.refresh(app_rec)
    return app_rec

@router.get("/", response_model=list[ApplicationOut])
async def list_applications(db: AsyncSession = Depends(get_db)):
    stmt = Application.__table__.select().limit(100)
    res = await db.execute(stmt)
    rows = res.fetchall()
    return [r._asdict() for r in rows]
