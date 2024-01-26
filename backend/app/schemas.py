from pydantic import BaseModel, Field, conint
from typing import List

# BlockA: 個体識別情報
class BlockA(BaseModel):
    uecsid: int
    macaddr: bytes = Field(..., max_length=6)
    fix_dhcp_flag: int
    fixed_ipaddress: bytes = Field(..., max_length=4)
    fixed_netmask: bytes = Field(..., max_length=4)
    fixed_defgw: bytes = Field(..., max_length=4)
    fixed_dns: bytes = Field(..., max_length=4)
    vender_name: str = Field(..., max_length=16)
    node_name: str = Field(..., max_length=16)

# BlockBItem: 受信CCM情報
class BlockBItem(BaseModel):
    block_a_id:int
    valid: bytes = Field(..., max_length=1)
    room: bytes = Field(..., max_length=1)
    region: bytes = Field(..., max_length=1)
    order: conint(ge=0)
    priority: bytes = Field(..., max_length=1)
    lv: int = Field(..., ge=1, le=10)
    cast: bytes = Field(..., max_length=1)
    sr: str
    ccm_type: str = Field(..., min_length=1, max_length=20)
    unit: str = Field(..., min_length=1, max_length=10)
    sthr: int = Field(..., ge=0, le=23)
    stmn: int = Field(..., ge=0, le=59)
    edhr: int = Field(..., ge=0, le=23)
    edmn: int = Field(..., ge=0, le=59)
    inmn: int = Field(..., ge=0, le=99)
    dumn: int = Field(..., ge=0, le=99)
    rly_l: bytes = Field(..., max_length=1)
    rly_h: bytes = Field(..., max_length=1)

# BlockB: BlockBItemのリスト
class BlockB(BaseModel):
    ccm_items: List[BlockBItem]

# BlockC: 送信CCM情報（BlockBと同様）
class BlockC(BlockB):
    pass

# BlockDItem: 比較演算レコード
class BlockDItem(BaseModel):
    valid: bytes = Field(..., max_length=1)
    room: bytes = Field(..., max_length=1)
    region: bytes = Field(..., max_length=1)
    order: conint(ge=0)
    priority: bytes = Field(..., max_length=1)
    ccm_type: str = Field(..., min_length=1, max_length=20)
    cmpope: bytes = Field(..., max_length=2)
    fval: float

# BlockD: BlockDItemをリスト形式で返す
class BlockD(BaseModel):
    compare_items: List[BlockDItem]
