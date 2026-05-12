from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional
from uuid import UUID


class RegisterUser(BaseModel):
    # Identification
    id: Optional[UUID] = None
    clerk_id: str = Field(...)
    email: EmailStr = Field(...)
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)

    # Progress and Objective
    grade_level: str = Field(max_length=20)
    school: str = Optional[Field(max_length=100)]
    state: str = Optional[Field(max_length=2)]
    current_score: int = Field(default=0)
    dream_score: int = Field(default=0)
    test_date: Optional[date] = None

    subscription: str | None = Field(default=None)
    proficiency: str | None = Field(default=None)
    referral: str | None = Optional[Field(default=None)]
