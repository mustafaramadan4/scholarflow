
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import AsyncSessionLocal
from ..models import Scholarship
from ..schemas import ScholarshipOut
from uuid import UUID

router = APIRouter()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/search", response_model=list[ScholarshipOut])
async def search(q: str = "", db: AsyncSession = Depends(get_db)):
    stmt = Scholarship.__table__.select().limit(50)
    res = await db.execute(stmt)
    rows = res.fetchall()
    return [r._asdict() for r in rows]

@router.get("/{id}", response_model=ScholarshipOut)
async def get_scholarship(id: str, db: AsyncSession = Depends(get_db)):
    stmt = Scholarship.__table__.select().where(Scholarship.__table__.c.id == id)
    res = await db.execute(stmt)
    row = res.first()
    if not row:
        return {}
    return row._asdict()
