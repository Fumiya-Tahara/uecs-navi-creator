from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database.settings import SessionLocal
from app.database.models import Uecs, Parameter
from app.schemas import UecsCreator, ParameterCreator
from datetime import time, timedelta

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD定義

def create_uecs(db: Session, uecs_data: UecsCreator):
    db_uecs = Uecs(**uecs_data.dict())
    db.add(db_uecs)
    db.commit()
    db.refresh(db_uecs)
    return db_uecs

def create_parameter(db: Session, parameter_data: ParameterCreator):
    db_parameter = Parameter(**parameter_data.dict())
    db.add(db_parameter)
    db.commit()
    db.refresh(db_parameter)
    return db_parameter


# 実際のCRUD操作(仮)
@app.post("/uecs/create", response_model=UecsCreator)
def create_uecs_endpoint(uecs_data: UecsCreator, db: Session = Depends(get_db)):
    return create_uecs(db, uecs_data)

@app.post("/parameters/create", response_model=ParameterCreator)
def create_parameter_endpoint(parameter_data: ParameterCreator, db: Session = Depends(get_db)):
    return create_parameter(db, parameter_data)
