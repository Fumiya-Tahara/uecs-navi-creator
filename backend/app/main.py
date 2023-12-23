from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session
from app.database.settings import SessionLocal
# from app.database.models import Uecs, Parameter
# from app.schemas import UecsCreator, ParameterCreator
# from datetime import time, timedelta

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD定義
