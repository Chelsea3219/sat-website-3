from backend.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, UUID, Date, Boolean
import uuid


class RawQuestion(Base):
    __tablename__ = "raw_question"
    __table_args__ = {"schema": "bronze"}


    question_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    section = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    subtopic = Column(String, nullable=False)

    question_preview = Column(String, nullable=False)
    mc_preview = Column(String, nullable=True)
    text = Column(String, nullable=False)

    uploaded_at = Column(Date, nullable=False)
    source = Column(String, nullable=False)
    reviewed = Column(Boolean, nullable=False)
