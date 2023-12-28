from fastapi import FastAPI ,Depends, HTTPException

from sqlalchemy.orm import Session
from app.database.settings import SessionLocal
# from app.database.models import Uecs, Parameter
# from app.schemas import UecsCreator, ParameterCreator
# from datetime import time, timedelta

from app.database.models import BlockBItem

# from typing import List

from app.database.models import BlockA as BlockAModel

from app.schemas import BlockA as BlockASchema

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# BlockAのCRUD定義

@app.post("/add_uecs/")
def create_block_a(block_a: BlockASchema, db: Session = Depends(get_db)):
    db_block_a = BlockAModel(**block_a.dict())
    db.add(db_block_a)
    db.commit()
    db.refresh(db_block_a)
    return db_block_a


@app.get("/get_uecs/{uecs_id}")
def get_block_a(uecs_id: int, db: Session = Depends(get_db)):
    return db.query(BlockAModel).filter(BlockAModel.uecs_id == uecs_id).first()

@app.put("/update_uecs/{uecs_id}")
def update_block_a( uecs_id: int, block_a: BlockASchema,db: Session = Depends(get_db)):
    db.query(BlockAModel).filter(BlockAModel.uecs_id == uecs_id).update(block_a.dict())
    db.commit()
    return get_block_a(db, uecs_id)


@app.post("/delete_uecs/{uecs_id}")
def delete_block_a(uecs_id: int,db: Session = Depends(get_db)):
    db_block_a = get_block_a(db,  uecs_id)
    if db_block_a:
        db.delete(db_block_a)
        db.commit()
        return True
    return False

# BlockBのCRUD定義

def create_block_b (db: Session, block_b_id: int):
    db_block_b = BlockAModel(**block_b.dict())
    db.add(db_block_b)
    db.commit()
    db.refresh(db_block_b)
    return db_block_b


# BlockCの



# BlockDの作成

# def create_block_b (db: Session, block_d_id: int):
#     db_block_a = BlockAModel(**block_d.dict())
#     db.add(db_block_d)
#     db.commit()
#     db.refresh(db_block_d)
#     return db_block_d