import sqlalchemy as sa
from .db import Base
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from sqlalchemy.sql import func

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

class StudentProfile(Base):
    """Detailed academic profile linked to a User."""
    __tablename__ = "student_profiles"
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    preferred_name = sa.Column(sa.Text)
    grade_level = sa.Column(sa.SmallInteger)
    gpa = sa.Column(sa.Numeric(3,2))
    gpa_type = sa.Column(sa.Text, server_default='unweighted')
    intended_major = sa.Column(sa.Text)
    residency = sa.Column(JSONB)
    first_gen = sa.Column(sa.Boolean, server_default=sa.text('false'))
    transcript_url = sa.Column(sa.Text)
    resume_url = sa.Column(sa.Text)
    master_essays = sa.Column(JSONB)
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
