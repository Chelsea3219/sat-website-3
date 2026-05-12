import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError

# APIs
from api.errors import general_http_exception_handler, validation_exception_handler
from api import register, errors
from api.admin import questions

# Configuration
from core.config import settings


# DEFINE THE API -------------------------------------------------------------------------------------------------------
app = FastAPI(
    title = "Elevate Learning",
    description="Master the SAT through adaptive learning",
    version="0.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ERROR HANDLING -------------------------------------------------------------------------------------------------------
app.add_exception_handler(StarletteHTTPException, general_http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)


# API ROUTES -----------------------------------------------------------------------------------------------------------
app.include_router(errors.router)
app.include_router(register.router)
app.include_router(questions.router)


# MIDDLEWARE -----------------------------------------------------------------------------------------------------------
# Add middleware to enable certain origin / certain URLS to interact with our backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True, # allows someone to send credentials to backend
    allow_methods=["*"], # enables them to use any API method
    allow_headers=["*"], # enables them to send additional information with the request
)