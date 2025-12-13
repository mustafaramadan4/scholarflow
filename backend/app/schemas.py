from pydantic import BaseModel, Field
from typing import Optional, Any, List  # Added List import
from uuid import UUID
from datetime import datetime

# --- USER SCHEMAS ---

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


# --- PROFILE SCHEMAS ---

from pydantic import BaseModel, Field
from typing import Optional, List

class StudentProfileCreate(BaseModel):
    # Role & Account
    grade_level: Optional[str] = Field(None, alias="gradeLevel")
    state: Optional[str] = None
    
    # Profile Basics
    full_name: Optional[str] = Field(None, alias="fullName")
    high_school: Optional[str] = Field(None, alias="highSchool")
    
    # GPA
    gpa_unweighted: Optional[float] = Field(None, alias="gpaUnweighted")
    gpa_weighted: Optional[float] = Field(None, alias="gpaWeighted")
    
    # Major
    intended_major: Optional[str] = Field(None, alias="major")
    
    income_range: Optional[str] = Field(None, alias="incomeRange")
    
    # Eligibility
    citizenship: Optional[str] = None
    first_gen: Optional[bool] = Field(False, alias="firstGen")
    ethnicity: Optional[List[str]] = []
    extracurriculars: Optional[List[str]] = []
    sports: Optional[List[str]] = []
    
    # Achievements
    sat_score: Optional[int] = Field(None, alias="satScore")
    act_score: Optional[int] = Field(None, alias="actScore")
    ap_count: Optional[int] = Field(None, alias="apCount")
    honors: Optional[str] = None
    volunteer_hours: Optional[int] = Field(None, alias="volunteerHours")
    
    # Documents
    transcript_url: Optional[str] = Field(None, alias="transcriptFile")
    resume_url: Optional[str] = Field(None, alias="resumeFile")
    
    # Preferences
    weekly_hours: Optional[int] = Field(0, alias="weeklyHours")

    class Config:
        allow_population_by_field_name = True

# Output schema inherits from Create, so it includes all the fields above automatically
class StudentProfileOut(StudentProfileCreate):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime  # Make sure your DB model has this column, or remove it here
    
    class Config:
        orm_mode = True


# --- SCHOLARSHIP & APPLICATION SCHEMAS ---

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
