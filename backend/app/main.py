from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session
from app.database.settings import SessionLocal
from app.database.models import Uecs, Parameter
from app.schemas import UecsCreator, ParameterCreator
# from datetime import time, timedelta

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

def delete_uecs(db: Session, uecs_id: int):
    db_uecs = db.query(Uecs).filter(Uecs.id == uecs_id).first()
    if db_uecs is None:
        raise HTTPException(status_code=404, detail="UECS not found")
    db.delete(db_uecs)
    db.commit()
    return {"msg": "UECS deleted"}


def update_uecs(db: Session, uecs_id: int, uecs_data: UecsCreator):
    db_uecs = db.query(Uecs).filter(Uecs.id == uecs_id).first()
    if db_uecs is None:
        raise HTTPException(status_code=404, detail="UECS not found")
    for var, value in vars(uecs_data).items():
        setattr(db_uecs, var, value) if value else None
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

# uecs装置の部分
@app.post("/uecs/create", response_model=UecsCreator)
def create_uecs_endpoint(uecs_data: UecsCreator, db: Session = Depends(get_db)):
    return create_uecs(db, uecs_data)

@app.delete("/uecs/{uecs_id}")
def delete_uecs_endpoint(uecs_id: int, db: Session = Depends(get_db)):
    return delete_uecs(db, uecs_id)

@app.put("/uecs/{uecs_id}", response_model=UecsCreator)
def update_uecs_endpoint(uecs_id: int, uecs_data: UecsCreator, db: Session = Depends(get_db)):
    return update_uecs(db, uecs_id, uecs_data)




# parametersの部分


@app.post("/parameters/create", response_model=ParameterCreator)
def create_parameter_endpoint(parameter_data: ParameterCreator, db: Session = Depends(get_db)):
    return create_parameter(db, parameter_data)
