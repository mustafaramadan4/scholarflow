import uuid
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    """Represents a registered user of the platform."""
    __tablename__ = "users"
    
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = sa.Column(sa.Text, unique=True, nullable=False)
    password_hash = sa.Column(sa.Text)
    role = sa.Column(sa.Text, nullable=False)
    name = sa.Column(sa.Text)
    created_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to profile
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    # FIXED: Changed from Integer to UUID to match the User table
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"))
    
    created_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    # Demographics
    full_name = sa.Column(sa.Text, nullable=True)
    high_school = sa.Column(sa.Text, nullable=True)
    grade_level = sa.Column(sa.Text, nullable=True)
    state = sa.Column(sa.Text, nullable=True)
    
    # Academics
    gpa_unweighted = sa.Column(sa.Float, nullable=True)
    gpa_weighted = sa.Column(sa.Float, nullable=True)
    # Renamed to match Schema (intended_major)
    intended_major = sa.Column(sa.Text, nullable=True) 
    
    # Background
    citizenship = sa.Column(sa.Text, nullable=True)
    first_gen = sa.Column(sa.Boolean, default=False)
    income_range = sa.Column(sa.Text, nullable=True)
    
    # Arrays (Using JSONB for better performance in Postgres)
    ethnicity = sa.Column(JSONB, default=[])
    extracurriculars = sa.Column(JSONB, default=[])
    sports = sa.Column(JSONB, default=[])
    
    # Stats
    sat_score = sa.Column(sa.Integer, nullable=True)
    act_score = sa.Column(sa.Integer, nullable=True)
    ap_count = sa.Column(sa.Integer, nullable=True)
    volunteer_hours = sa.Column(sa.Integer, nullable=True)
    
    # Misc
    honors_text = sa.Column(sa.Text, nullable=True)
    # ADDED: Missing fields for documents and preferences
    transcript_url = sa.Column(sa.Text, nullable=True)
    resume_url = sa.Column(sa.Text, nullable=True)
    weekly_hours = sa.Column(sa.Integer, default=0)
    preferences = sa.Column(JSONB, default={}) 
    
    # Relationships
    user = relationship("User", back_populates="student_profile")
    applications = relationship("Application", back_populates="student_profile")


class Scholarship(Base):
    """A financial aid opportunity."""
    __tablename__ = "scholarships"
    
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = sa.Column(sa.Text, nullable=False)
    description = sa.Column(sa.Text)
    amount_min = sa.Column(sa.Integer)
    amount_max = sa.Column(sa.Integer)
    deadline = sa.Column(sa.TIMESTAMP(timezone=True))
    source_url = sa.Column(sa.Text)
    source = sa.Column(sa.Text)
    is_local = sa.Column(sa.Boolean, server_default=sa.text('false'))
    location = sa.Column(JSONB)
    eligibility = sa.Column(JSONB)
    requirements = sa.Column(JSONB)
    verified = sa.Column(sa.Boolean, server_default=sa.text('false'))
    created_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    
    applications = relationship("Application", back_populates="scholarship")


class Application(Base):
    """Links a StudentProfile to a Scholarship."""
    __tablename__ = "applications"
    
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey("student_profiles.id", ondelete="CASCADE"))
    scholarship_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey("scholarships.id", ondelete="CASCADE"))
    status = sa.Column(sa.Text, nullable=False, server_default='not_started')
    submission_url = sa.Column(sa.Text)
    award_amount = sa.Column(sa.Integer)
    note = sa.Column(sa.Text)
    created_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = sa.Column(sa.TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    student_profile = relationship("StudentProfile", back_populates="applications")
    scholarship = relationship("Scholarship", back_populates="applications")
