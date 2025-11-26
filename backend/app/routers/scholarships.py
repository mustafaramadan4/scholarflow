from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Scholarship
from ..schemas import ScholarshipOut
from ..dependencies import get_db

router = APIRouter()

@router.get("/search", response_model=list[ScholarshipOut])
async def search(q: str = "", db: AsyncSession = Depends(get_db)):
    query = select(Scholarship)
    if q:
        search_term = f"%{q}%"
        query = query.where((Scholarship.title.ilike(search_term)) | (Scholarship.description.ilike(search_term)))
    query = query.limit(50)
    res = await db.execute(query)
    return res.scalars().all()

@router.get("/{id}", response_model=ScholarshipOut)
async def get_scholarship(id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Scholarship).where(Scholarship.id == id)
    res = await db.execute(stmt)
    row = res.scalar_one_or_none()
    return row if row else {}
