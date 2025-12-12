from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id")) # Links to your existing User table
    
    # Demographics
    full_name = Column(String, nullable=True)
    high_school = Column(String, nullable=True)
    grade_level = Column(String, nullable=True)
    state = Column(String, nullable=True)
    
    # Academics
    gpa_unweighted = Column(Float, nullable=True)
    gpa_weighted = Column(Float, nullable=True)
    major = Column(String, nullable=True)
    
    # Background
    citizenship = Column(String, nullable=True)
    first_gen = Column(Boolean, default=False)
    income_range = Column(String, nullable=True)
    
    # Arrays (Stored as JSON in the database)
    ethnicity = Column(JSON, default=[])
    extracurriculars = Column(JSON, default=[])
    sports = Column(JSON, default=[])
    
    # Stats
    sat_score = Column(Integer, nullable=True)
    act_score = Column(Integer, nullable=True)
    ap_count = Column(Integer, nullable=True)
    volunteer_hours = Column(Integer, nullable=True)
    
    # Misc
    honors_text = Column(String, nullable=True)
    preferences = Column(JSON, default={}) # Store weekly hours, etc here
    
    # Relationships
    user = relationship("User", back_populates="student_profile")

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
