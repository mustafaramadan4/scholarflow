from pydantic import BaseModel
from typing import Optional, Any
from uuid import UUID
from datetime import datetime

class UserCreate(BaseModel):
    email: str 
    password: str
    role: str
    name: Optional[str]

class UserOut(BaseModel):
    id: UUID
    email: str 
    name: Optional[str]
    role: str
    created_at: datetime
    class Config:
        orm_mode = True

class StudentProfileCreate(BaseModel):
    preferred_name: Optional[str]
    grade_level: Optional[int]
    gpa: Optional[float]
    intended_major: Optional[str]
    residency: Optional[Any]
    first_gen: Optional[bool]
    transcript_url: Optional[str]
    resume_url: Optional[str]

class StudentProfileOut(StudentProfileCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class ScholarshipOut(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    amount_min: Optional[int]
    amount_max: Optional[int]
    deadline: Optional[datetime]
    is_local: Optional[bool]
    class Config:
        orm_mode = True

class ApplicationCreate(BaseModel):
    profile_id: UUID
    scholarship_id: UUID

class ApplicationOut(BaseModel):
    id: UUID
    profile_id: UUID
    scholarship_id: UUID
    status: str
    class Config:
        orm_mode = True

class EssayRequest(BaseModel):
    profile_id: UUID
    scholarship_id: UUID
    prompt: str
    length_target: Optional[int]
    tone: Optional[str]

class EssayResponse(BaseModel):
    essay_id: str
    text: str
    class Config:
        orm_mode = True
