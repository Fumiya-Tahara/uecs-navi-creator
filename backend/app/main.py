from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database.settings import SessionLocal
from app.database.models import Uecs, Parameter
from app.schemas import UecsCreator, ParameterCreator
# from app.database.settings import Base

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD operations
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

# API endpoints
@app.post("/uecs/", response_model=UecsCreator)
def create_uecs_endpoint(uecs_data: UecsCreator, db: Session = Depends(get_db)):
    return create_uecs(db, uecs_data)

@app.post("/parameters/", response_model=ParameterCreator)
def create_parameter_endpoint(parameter_data: ParameterCreator, db: Session = Depends(get_db)):
    return create_parameter(db, parameter_data)
