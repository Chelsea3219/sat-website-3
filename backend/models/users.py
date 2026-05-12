from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid

from database import Base

# Add Users to the Bronze Layer
class RawUsers(Base):
    __tablename__ = "raw_users"
    __table_args__ = {"schema": "bronze"}

    # Identification
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    clerk_id = Column(String, index=True, unique=True, nullable=False)
    full_name = Column(String)
    email = Column(String)

    # Classification
    school = Column(String)
    state = Column(String)
    grade_level = Column(String)

    # Progress and Timeline
    proficiency = Column(String, nullable=True)
    dream_score = Column(Integer, nullable=True)
    original_score = Column(Integer, nullable=True)
    test_date = Column(Date, nullable=True)

    # Auditing
    role = Column(String, nullable=True)
    created_at = Column(Date, nullable=True)
    subscription = Column(String, nullable=True)
    referral = Column(String, nullable=True)