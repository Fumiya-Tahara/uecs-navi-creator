from typing import List
# from imp import reload
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

# origins = [
#     # "http://localhost",
#     "http://localhost:3000",
#     "http://uecs_navi_creator"
# ]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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



@app.get("/")
async def root():
    return {"message": "Hello World"}


# BlockAのCRUD定義

@app.post("/create_block_a/")
def create_block_a(block_a: BlockASchema, db: Session = Depends(get_db)):
    db_block_a = BlockA(**block_a.dict())
    db.add(db_block_a)
    db.commit()
    db.refresh(db_block_a)
    return db_block_a

@app.get("/get_block_a/{uecsid}")
def get_block_a(uecsid: int, db: Session = Depends(get_db)):
    return db.query(BlockA).filter(BlockA.uecsid == uecsid).all()

@app.put("/update_block_a/{uecsid}")
def update_block_a( uecsid: int, block_a: BlockASchema,db: Session = Depends(get_db)):
    db.query(BlockA).filter(BlockA.uecsid == uecsid).update(block_a.dict())
    db.commit()
    return get_block_a(db, uecsid)


@app.delete("/delete_block_a/{uecsid}")
def delete_block_a(uecsid: int, db: Session = Depends(get_db)):
    db_block_a = db.query(BlockA).filter(BlockA.uecsid == uecsid).first()
    if db_block_a:
        db.delete(db_block_a)
        db.commit()
        return True
    return False

from pydantic import BaseModel

class BlockBSchema(BaseModel):
    block_a_id:int  #block_aテーブルの中のuecsidです
    ccm_type: str
    valid: int
    room: int
    region: bytes
    order: int
    priority: int
    lv: int
    cast: int
    sr: str
    ccm_type: str
    unit: str
    sthr: int
    stmn: int
    edhr: int
    edmn: int
    inmn: int
    dumn: int
    rly_l: int
    rly_h: int

@app.post("/create_block_b/{block_a_id}", response_model=BlockBSchema)
def create_block_b(block_a_id: int, block_b_data: BlockBSchema, db: Session = Depends(get_db)):
    new_block_b = BlockB(**block_b_data.dict())
    db.add(new_block_b)
    db.commit()
    db.refresh(new_block_b)
    return new_block_b



# 読み取り（Read）
@app.get("/get_block_b/{uecsid}", response_model=List[BlockBSchema])
def get_block_b(uecsid: int, db: Session = Depends(get_db)):
    block_b_items = db.query(BlockB).filter(BlockB.block_a_id == uecsid).all()
    if not block_b_items:
        raise HTTPException(status_code=404, detail="BlockB not found for the given BlockA ID")
    
    return [{"block_a_id": item.block_a_id, "ccm_type": item.ccm_type,  
             "valid": item.valid, "room": item.room, "region": item.region,
             "order": item.order, "priority": item.priority, "lv": item.lv, "cast": item.cast,
             "sr": item.sr, "ccm_type": item.ccm_type, "unit": item.unit, "sthr": item.sthr,
             "stmn": item.stmn, "edhr": item.edhr, "edmn": item.edmn, "inmn": item.inmn,
             "dumn": item.dumn, "rly_l": item.rly_l, "rly_h": item.rly_h}
            for item in block_b_items]


# 更新（Update）
@app.put("/update_block_b/{uecsid}/{id}", response_model=BlockBSchema)
def update_block_b(id: int, uecsid: int, block_b_update_data: BlockBSchema, db: Session = Depends(get_db)):
    block_b = db.query(BlockB).filter(BlockB.id == id, BlockB.block_a_id == uecsid).first()
    if block_b is None:
        raise HTTPException(status_code=404, detail="BlockB not found with the given IDs")
    for key, value in block_b_update_data.dict().items():
        setattr(block_b, key, value)
    db.commit()
    return block_b


# 削除（Delete）
@app.delete("/delete_block_b/{uecsid}/{id}", response_model=BlockBSchema)
def delete_block_b(id: int, uecsid: int, db: Session = Depends(get_db)):
    block_b = db.query(BlockB).filter(BlockB.id == id, BlockB.block_a_id ==  uecsid).first()
    if block_b is None:
        raise HTTPException(status_code=404, detail="BlockB not found with the given IDs")
    db.delete(block_b)
    db.commit()
    return {"message": "BlockB deleted with the given IDs"}



class BlockCSchema(BaseModel):
    block_a_id:int  #block_aテーブルの中のuecsidです
    ccm_type: str
    valid: int
    room: int
    region: bytes
    order: int
    priority: int
    lv: int
    cast: int
    sr: str
    ccm_type: str
    unit: str
    sthr: int
    stmn: int
    edhr: int
    edmn: int
    inmn: int
    dumn: int
    rly_l: int
    rly_h: int


# BlockC
@app.post("/create_block_c/{block_a_id}", response_model=BlockBSchema)
def create_block_c(block_c_data: dict,db: Session = Depends(get_db)):
    new_block_c = BlockC(**block_c_data.dict())
    db.add(new_block_c)
    db.commit()
    db.refresh(new_block_c)
    return new_block_c

@app.get("/get_block_c/{uecsid}", response_model=List[BlockCSchema])
def get_block_c(uecsid: int, db: Session = Depends(get_db)):
    block_c_items = db.query(BlockB).filter(BlockC.block_a_id == uecsid).all()
    if not block_c_items:
        raise HTTPException(status_code=404, detail="BlockB not found for the given BlockA ID")
    
    return [{"block_a_id": item.block_a_id, "ccm_type": item.ccm_type,
             "valid": item.valid, "room": item.room, "region": item.region,
             "order": item.order, "priority": item.priority, "lv": item.lv, "cast": item.cast,
             "sr": item.sr, "ccm_type": item.ccm_type, "unit": item.unit, "sthr": item.sthr,
             "stmn": item.stmn, "edhr": item.edhr, "edmn": item.edmn, "inmn": item.inmn,
             "dumn": item.dumn, "rly_l": item.rly_l, "rly_h": item.rly_h}
            for item in block_c_items]


# 更新（Update）
@app.put("/update_block_c/{uecsid}/{id}", response_model=BlockCSchema)
def update_block_b(id: int, uecsid: int, block_c_update_data: BlockBSchema, db: Session = Depends(get_db)):
    block_c = db.query(BlockC).filter(BlockC.id == id, BlockC.block_a_id == uecsid).first()
    if block_c is None:
        raise HTTPException(status_code=404, detail="BlockB not found with the given IDs")
    for key, value in block_c_update_data.dict().items():
        setattr(block_c, key, value)
    db.commit()
    return block_c


# 削除（Delete）
@app.delete("/delete_block_c/{uecsid}/{id}", response_model=BlockBSchema)
def delete_block_c(id: int, uecsid: int, db: Session = Depends(get_db)):
    block_c = db.query(BlockC).filter(BlockC.id == id, BlockC.block_a_id ==  uecsid).first()
    if block_c is None:
        raise HTTPException(status_code=404, detail="BlockB not found with the given IDs")
    db.delete(block_c)
    db.commit()
    return {"message": "BlockB deleted with the given IDs"}



# BlockD

@app.post("/get_block_d/{uecsid}")
def create_block_d(block_d_data: dict,db: Session = Depends(get_db)):
    new_block_d = BlockD(**block_d_data)
    db.add(new_block_d)
    db.commit()
    db.refresh(new_block_d)
    return new_block_d

@app.get("/get_block_d/{uecsid}")
def get_block_d(uecsid: int,db: Session = Depends(get_db)):
    return db.query(BlockD).filter(BlockA.uecsid == uecsid).all()

@app.put("/update_block_d/{uecsid}/{id}")
def update_block_d(uecsid: int ,id: int, block_d_update_data: dict,db: Session = Depends(get_db)):
    db.query(BlockD).filter(BlockD.id == id,BlockD.block_a_id == uecsid).update(block_d_update_data)
    db.commit()
    return db.query(BlockD).filter(BlockD.id == id).first()

@app.delete("/delete_block_d/{uecsid}/{id}")
def delete_block_d(uecsid: int, id: int, db: Session = Depends(get_db)):
    block_d_to_delete = db.query(BlockD).filter(BlockD.id == id, BlockD.block_a_id == uecsid).first()
    db.delete(block_d_to_delete)
    db.commit()
    return block_d_to_delete

# データの送信形式はipaddressとintelhex形式の文字列

# @app.get("/{ip_address}/{intelhex}")
# async def send_data(fixed_ipaddress: str, intelhex: int):
#     return {"fixed_ipaddress": fixed_ipaddress, "intelhex": intelhex}



