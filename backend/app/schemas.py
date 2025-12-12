from pydantic import BaseModel
from typing import Optional, Any
from uuid import UUID
from datetime import datetime

# This matches the JSON object your frontend "OnboardingWizard" sends
class StudentProfileCreate(BaseModel):
    # Role & Account
    role: str
    gradeLevel: str  # Matches frontend "gradeLevel"
    state: str
    
    # Profile Basics
    fullName: str
    highSchool: str
    gpaUnweighted: Optional[float] = None
    gpaWeighted: Optional[float] = None
    major: str
    incomeRange: Optional[str] = None
    
    # Eligibility
    citizenship: Optional[str] = None
    firstGen: bool = False
    ethnicity: List[str] = []       # Frontend sends array
    extracurriculars: List[str] = [] 
    sports: List[str] = []
    
    # Achievements
    satScore: Optional[int] = None
    actScore: Optional[int] = None
    apCount: Optional[int] = None
    honors: Optional[str] = None
    volunteerHours: Optional[int] = None
    
    # Documents (Just storing filenames for now)
    transcriptFile: Optional[str] = None
    resumeFile: Optional[str] = None
    
    # Preferences
    weeklyHours: Optional[int] = 0
    # Add other preference fields if your frontend sends them

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

class ApplyRequest(BaseModel):
    scholarship_id: UUID
