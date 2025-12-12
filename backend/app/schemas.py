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

class StudentProfileCreate(BaseModel):
    # Role & Account
    # We map frontend "gradeLevel" -> backend "grade_level"
    grade_level: str = Field(alias="gradeLevel")
    state: str
    
    # Profile Basics
    full_name: str = Field(alias="fullName")
    high_school: str = Field(alias="highSchool")
    
    # Merging GPA logic
    gpa_unweighted: Optional[float] = Field(None, alias="gpaUnweighted")
    gpa_weighted: Optional[float] = Field(None, alias="gpaWeighted")
    
    # Mapping "major" from frontend to "intended_major" for backend clarity
    intended_major: str = Field(alias="major")
    
    income_range: Optional[str] = Field(None, alias="incomeRange")
    
    # Eligibility
    citizenship: Optional[str] = None
    first_gen: bool = Field(False, alias="firstGen")
    ethnicity: List[str] = []       
    extracurriculars: List[str] = [] 
    sports: List[str] = []
    
    # Achievements
    sat_score: Optional[int] = Field(None, alias="satScore")
    act_score: Optional[int] = Field(None, alias="actScore")
    ap_count: Optional[int] = Field(None, alias="apCount")
    honors: Optional[str] = None
    volunteer_hours: Optional[int] = Field(None, alias="volunteerHours")
    
    # Documents
    # Mapping frontend "transcriptFile" to your existing "transcript_url" concept
    transcript_url: Optional[str] = Field(None, alias="transcriptFile")
    resume_url: Optional[str] = Field(None, alias="resumeFile")
    
    # Preferences
    weekly_hours: Optional[int] = Field(0, alias="weeklyHours")

    class Config:
        # CRITICAL: This allows the backend to accept "gradeLevel" (from frontend)
        # OR "grade_level" (from python code) interchangeably.
        allow_population_by_field_name = True 
        # Note: If you are using Pydantic V2, rename this to 'populate_by_name = True'

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
