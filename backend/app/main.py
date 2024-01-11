from fastapi import FastAPI ,Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from app.database.settings import SessionLocal

from app.database.models import BlockA

from app.database.models import BlockB

from app.database.models import BlockC

from app.database.models import BlockD



from app.schemas import BlockA as BlockASchema

app = FastAPI()

origins = [
    # "http://localhost",
    "http://localhost:3000",
    "http://uecs_navi_creator"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],  # Next.jsサーバーのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# BlockAのCRUD定義

@app.post("/create_block_a/")
def create_block_a(block_a: BlockASchema, db: Session = Depends(get_db)):
    db_block_a = BlockA(**block_a.dict())
    db.add(db_block_a)
    db.commit()
    db.refresh(db_block_a)
    return db_block_a


@app.get("/get_block_a/{uecs_id}")
def get_block_a(uecs_id: int, db: Session = Depends(get_db)):
    return db.query(BlockA).filter(BlockA.uecs_id == uecs_id).all()

@app.put("/update_block_a/{uecs_id}")
def update_block_a( uecs_id: int, block_a: BlockASchema,db: Session = Depends(get_db)):
    db.query(BlockA).filter(BlockA.uecs_id == uecs_id).update(block_a.dict())
    db.commit()
    return get_block_a(db, uecs_id)


@app.post("/delete_block_a/{uecs_id}")
def delete_block_a(uecs_id: int,db: Session = Depends(get_db)):
    db_block_a = get_block_a(db,  uecs_id)
    if db_block_a:
        db.delete(db_block_a)
        db.commit()
        return True
    return False

# BlockB

@app.post("/create_block_b/{block_a_id}")
def create_block_b(block_b_data: dict,db: Session = Depends(get_db)):
    new_block_b = BlockB(**block_b_data)
    db.add(new_block_b)
    db.commit()
    db.refresh(new_block_b)
    return new_block_b

@app.get("/get_block_b/{block_b_id}")
def get_block_b(block_b_id: int,db: Session = Depends(get_db)):
    return db.query(BlockB).filter(BlockB.id == block_b_id).all()


@app.put("/update_block_b/{block_b_id}")
def update_block_b(block_b_id: int, block_b_update_data: dict,db: Session = Depends(get_db)):
    db.query(BlockB).filter(BlockB.id == block_b_id).update(block_b_update_data)
    db.commit()
    return db.query(BlockB).filter(BlockB.id == block_b_id).first()

@app.post("/delete_block_b/{block_b_id}")
def delete_block_b( block_b_id: int,db: Session = Depends(get_db)):
    block_b_to_delete = db.query(BlockB).filter(BlockB.id == block_b_id).first()
    db.delete(block_b_to_delete)
    db.commit()
    return block_b_to_delete




# BlockC
@app.post("/create_block_c/{block_a_id}")
def create_block_c(block_c_data: dict,db: Session = Depends(get_db)):
    new_block_c = BlockC(**block_c_data)
    db.add(new_block_c)
    db.commit()
    db.refresh(new_block_c)
    return new_block_c

@app.get("/get_block_c/{block_c_id}")
def get_block_c( block_c_id: int,db: Session = Depends(get_db)):
    return db.query(BlockC).filter(BlockC.id == block_c_id).all()

@app.put("/update_block_c/{block_c_id}")
def update_block_c(block_c_id: int, block_c_update_data: dict,db: Session = Depends(get_db)):
    db.query(BlockC).filter(BlockC.id == block_c_id).update(block_c_update_data)
    db.commit()
    return db.query(BlockC).filter(BlockC.id == block_c_id).first()

@app.post("/delete_block_c/{block_c_id}")
def delete_block_c(block_c_id: int,db: Session = Depends(get_db)):
    block_c_to_delete = db.query(BlockC).filter(BlockC.id == block_c_id).first()
    db.delete(block_c_to_delete)
    db.commit()
    return block_c_to_delete



# BlockD

@app.post("/get_block_d/{block_a_id}")
def create_block_d(block_d_data: dict,db: Session = Depends(get_db)):
    new_block_d = BlockD(**block_d_data)
    db.add(new_block_d)
    db.commit()
    db.refresh(new_block_d)
    return new_block_d

@app.get("/get_block_d/{block_d_id}")
def get_block_d(block_d_id: int,db: Session = Depends(get_db)):
    return db.query(BlockD).filter(BlockD.id == block_d_id).all()

@app.get("/update_block_d/{block_d_id}")
def update_block_d(block_d_id: int, block_d_update_data: dict,db: Session = Depends(get_db)):
    db.query(BlockD).filter(BlockD.id == block_d_id).update(block_d_update_data)
    db.commit()
    return db.query(BlockD).filter(BlockD.id == block_d_id).first()

@app.get("/delete_block_d/{block_d_id}")
def delete_block_d(block_d_id: int,db: Session = Depends(get_db)):
    block_d_to_delete = db.query(BlockD).filter(BlockD.id == block_d_id).first()
    db.delete(block_d_to_delete)
    db.commit()
    return block_d_to_delete


# データの送信形式はipaddressとintelhex形式の文字列

# @app.get("/{ip_address}/{intelhex}")
# async def send_data(fixed_ipaddress: str, intelhex: int):
#     return {"fixed_ipaddress": fixed_ipaddress, "intelhex": intelhex}