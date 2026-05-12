
from fastapi import APIRouter, Request, Depends, HTTPException, status

from backend.models.users import RawUsers
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas.users import RegisterUser
from datetime import  date

router = APIRouter(prefix="/api", tags=["register"])

@router.post("/register")
async def register_user(payload:RegisterUser, db: Session = Depends(get_db) ):

    # Checks for an existing user
    user = db.query(RawUsers).filter(RawUsers.clerk_id == payload.clerk_id).first()
    fullname = payload.first_name + " " + payload.last_name
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    # Register the user
    else:
        user = RawUsers(
            clerk_id = payload.clerk_id,
            full_name = fullname,
            email=payload.email,
            school=payload.school,
            state=payload.state,
            grade_level=payload.grade_level,
            original_score=payload.current_score,
            dream_score=payload.dream_score,
            test_date=payload.test_date,
            subscription=payload.subscription,
            proficiency=payload.proficiency,
            created_at= date.today(),
            referral= payload.referral,
            role = "student"
        )
        # Adds to datasets
        db.add(user)
        db.commit()
        db.refresh(user)
        print("USER SAVED SUCCESSFULLY")


