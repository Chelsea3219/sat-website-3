from pydantic import BaseModel
from typing import Optional
from fastapi import Form, UploadFile


# Class for incoming raw_questions from the frontend
class UploadRawQuestions(BaseModel):
    section: str
    topic: str
    subtopic: str

    question_preview: str
    multiple_choice_preview: Optional[str] = None
    raw_text: str

    source: str
