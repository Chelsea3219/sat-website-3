from fastapi import APIRouter, Form, UploadFile, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
import tempfile
import os
import traceback


# Data pipelines to manipulate the data
from backend.data_pipelines.extract_pp import extract_text_pp
from backend.data_pipelines.clean import normalize_questions, mcq_diagram_identifier
from backend.data_pipelines.upload_images import upload_image_to_cloudinary


# Database and Schema
from backend.database import get_db
from backend.schemas.questions import UploadRawQuestions
from backend.schemas.users import RegisterUser


router = APIRouter(prefix="/api/questions", tags=["questions"])


# UPLOAD PDFs & WORKBOOKS TO EXTRACT QUESTIONS AND MCS -----------------------------------------------------------------
@router.post("/extract-questions")
async def extract_text(
        file: UploadFile,
        section: str = Form(...),
        topic: str = Form(...),
        subtopic: str = Form(...),
        source: str = Form(...)
):
    text = await file.read()
    extracted_questions = [] # just in case, there is an error
    try:
        # Save to temp file so your function gets the path it expects
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(text)
            tmp_path = tmp.name

        # Extract the text
        if source == "preppros":
            extracted_questions = extract_text_pp(tmp_path, section, topic, subtopic, source)

            # Clean the text
            normalized_questions = normalize_questions(extracted_questions)
            organized_questions = mcq_diagram_identifier(normalized_questions)

            #Upload the images to cloudinary
            questions = upload_image_to_cloudinary(organized_questions, section, topic, subtopic)
        else:
            return {"success": False, "error":"Source not supported"}

        return {"success": True, "questions": jsonable_encoder(questions)}

    except Exception as e:
        traceback.print_exc()
        return { "success": False, "error": str(e)}

    finally:
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.unlink(tmp_path)


# SAVE THE EXTRACTED QUESTIONS IN THE BRONZE.RAW_QUESTIONS -------------------------------------------------------------
@router.post("/bulk_upload")
async def bulk_upload(payload:UploadRawQuestions, db: Session = Depends(get_db)):
    for q in payload.questions:
        # Checks to see if the questions are in the dataframe already