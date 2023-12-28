from sqlalchemy import Column, ForeignKey, Integer, Interval, String, Time
from pydantic import BaseModel, conint, Field,constr
from typing import List
from app.database.settings import Base
from sqlalchemy.orm import relationship


# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True)
#     mail = Column(String)
#     password = Column(String)


# class Uecs(Base):    
#     __tablename__ = 'uecs'
#     id = Column(Integer, primary_key=True)
#     node_name = Column(String)
#     model_number=Column(String)
#     vender_name=Column(String)
#     uecs_id=Column(String)
#     mac_address=Column(String)
#     parameters = relationship("Parameter", back_populates="uecs")  # 1対多リレーションシップの設定
    

# class User_Uecs(Base):
#     __tablename__ = 'user_uecs'
#     id = Column(Integer, primary_key=True) 
#     user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
#     uecs_id = Column(Integer, ForeignKey('uecs.id'), primary_key=True)

# class Parameter(Base):
#     __tablename__ = 'parameters'
#     id = Column(Integer, primary_key=True)
#     name = Column(String)
#     device_id=Column(Integer, ForeignKey('uecs.id'))
#     type=Column(String)
#     room=Column(Integer)
#     region=Column(char)
#     order=Column(Integer)
#     priority=Column(Integer)
#     data=Column(Integer)
#     unit=Column(Integer)
#     start = Column(Time)  # 時間型
#     end = Column(Time)    
#     duration = Column(Interval)  # 期間や間隔を表す
#     interval = Column(Interval)  
#     ipaddress=Column(String)
#     uecs = relationship("Uecs", back_populates="parameters") 
  


# EEPROMの割付
# EEPROMは大きく4ブロックに分かれる。

# (1) UECS IDを始めとした個体の識別情報を保存する。1レコード
# (2) 受信されるべきCCM属性を保存する。30レコード
# (3) 送信されるべきCCM属性を保存する。10レコード
# (4) 受信されて設定値と比較する方法を保存する。10レコード

# EEPROMの多くの初期値は0xffである。しかし、これを期待するものではない。

## Block-A

#   個体識別情報

class BlockA(BaseModel):
    uecsid: bytes = Field(..., max_length=6)
    macaddr: bytes = Field(..., max_length=6)
    fix_dhcp_flag: bytes = Field(..., max_length=1) # DHCPか固定IPかの指定(0xff:DHCP,0x00:固定IP)
    fixed_ipaddress: bytes = Field(..., max_length=4)
    fixed_netmask: bytes = Field(..., max_length=4)
    fixed_defgw: bytes = Field(..., max_length=4)
    fixed_dns: bytes = Field(..., max_length=4)
    vender_name: str= Field(..., max_length=16) # ベンダー名 (ASCIZ文字列)
    node_name: str= Field(..., max_length=16) #　ノード名 (ASCIZ文字列)
    
    # アドレス(番地)即値

#  stM304 Address
#define LC_UECS_ID        0x0000
#define LC_MAC            0x0006
#define FIX_DHCP_FLAG     0x000c
#define FIXED_IPADDRESS   0x0010
#define FIXED_NETMASK     0x0014
#define FIXED_DEFGW       0x0018
#define FIXED_DNS         0x001c
#define VENDER_NAME       0x0040
#define NODE_NAME         0x0050



#  受信CCM情報

class BlockBItem(BaseModel):
    block_a_id: int  # BlockAのIDを参照,ブロックAとブロックBのリレーション
    valid: bytes = Field(..., max_length=1)
    room: bytes = Field(..., max_length=1)
    region: bytes = Field(..., max_length=1)
    order: conint(ge=0)  # 0以上の整数,unsignedの代わり
    priority: bytes = Field(..., max_length=1)
    lv: int = Field(..., ge=1, le=10) #lvは1から10
    cast: bytes = Field(..., max_length=1)
    sr: str
    ccm_type: str = Field(..., min_length=1, max_length=20)
    unit: str = Field(..., min_length=1, max_length=10)
    sthr: int = Field(..., ge=0, le=23) #  反映時間帯開始時間 (0〜23)
    stmn: int = Field(..., ge=0, le=59)# 反映時間帯開始分 (0〜59)
    edhr: int= Field(..., ge=0, le=23) #反映時間帯終了時間 (0〜23)
    edmn: int= Field(..., ge=0, le=59) #反映時間帯終了分 (0〜59)
    inmn: int = Field(..., ge=0, le=99)#反映時間間隔 (0〜99)分
    dumn: int = Field(..., ge=0, le=99)#作用時間 (0~99)分 リレーがMAKEしている時間(分)
    rly_l: bytes = Field(..., max_length=1) #0x2d  RLY1〜4までのリレーのどれをMAKEするか
    rly_h: bytes = Field(..., max_length=1) #0x2e  RLY5〜8までのリレーのどれをMAKEするか (後述)

# dummyの部分に後述する条件部分の記述が反映される。現状検討中
# 受信CCMは0x1000番地から0x40ステップで配置される。
# 受信CCMは30レコード存在する。
# 使う分だけ、valid=0x01とする。

#  アドレスとオフセット(担当外)
#define LC_SCH_START 0x1000
#define   LC_VALID        0x00 // Valid Flag (0x01:valid, 0xff:invalid)
#define   LC_ROOM         0x01
#define   LC_REGION       0x02
#define   LC_ORDER        0x03
#define   LC_PRIORITY     0x05
#define   LC_LV           0x06 // reference LV define
#define   LC_CAST         0x07
#define   LC_SR           0x08
#define   LC_CCMTYPE      0x09 // char[20]
#define   LC_UNIT         0x1d // char[10]
#define   LC_STHR         0x27 // Start of time (Hour) and validation flag
#define   LC_STMN         0x28 // Start of time (minute)
#define   LC_EDHR         0x29 // End of time (hour)
#define   LC_EDMN         0x2a // End of time (minute)
#define   LC_INMN         0x2b // Interval time (mins)
#define   LC_DUMN         0x2c // During time (mins)
#define   LC_RLY_L        0x2d // RLY 1..4
#define   LC_RLY_H        0x2e // RLY 5..8
#define LC_SCH_REC_SIZE   0x40 // reserve to 0x3f step by 0x40

### LV define

#define LV_A1S0    1      // A-1S-0
#define LV_A1S1    2      // A-1S-1
#define LV_A10S0   3      // A-10S-0
#define LV_A10S1   4      // A-10S-1
#define LV_A1M0    5      // A-1M-0
#define LV_A1M1    6      // A-1M-1
#define LV_B0      7      // B-0
#define LV_B1      8      // B-1
#define LV_S1S0    9      // S-1S-0
#define LV_S1M0   10      // S-1M-0

### リレーの指定方法

# RLYあたり2bitを使ってMAKE/BREAK/DONT CARE/の３種類の操作を表現する。

# * 00: DON'T CARE
# * 01: NOT ASSIGNED
# * 10: BREAK
# * 11: MAKE

# ただし、現状で用いているのはBREAK/MAKEだけである


class BlockB(BaseModel):
    ccm_items: List[BlockBItem]
    
class BlockB(BaseModel):
    ccm_items: List[BlockBItem]

class BlockA_BlockB(BaseModel):
    block_a: BlockA
    block_b_list: List[BlockB]    

class BlockC(BlockB):
#  送信CCM情報

# Block-Bとメンバーは同じである。
    pass

class BlockA_BlockC(BaseModel):
    block_a: BlockA
    block_c_list: List[BlockC]    

# * sr は、S固定
# * rly_l,rly_hは、無視

# 格納EEPROMアドレスは、
# #define LC_SEND_START 0x3000   // CCM for data sending
# 後のオフセットは受信CCMと同じ

# 比較演算レコード

# #define LC_CMPOPE_START 0x5000 // Compare Operators
#define LC_CMPOPE_REC_SIZE 0x20 //
#define   LC_COPE_VALID    0x00
#define   LC_COPE_ROOM     0x01
#define   LC_COPE_REGION   0x02
#define   LC_COPE_ORDER    0x03
#define   LC_COPE_PRIORITY 0x05
#define   LC_COPE_CCMTYPE  0x06
#define   LC_COPE_OPE      0x1a
#define   LC_COPE_FVAL     0x1b

# Relational Operators

#define R_NULL   0
#define R_EQ     1  // == Equal
#define R_GT     2  // >  Greater Than
#define R_LT     3  // <  Less Than
#define R_GE     4  // >= Greater Than Equal
#define R_LE     5  // <= Less Than Equal
#define R_AND    6  // &  Logical AND
#define R_OR     7  // |  Logical OR


class BlockDItem(BaseModel):
    valid: bytes = Field(..., max_length=1)
    room: bytes = Field(..., max_length=1)
    region: bytes = Field(..., max_length=1)
    order: conint(ge=0)  # 0以上の整数,unsignedの代わり
    priority: bytes = Field(..., max_length=1)
    ccm_type: str = Field(..., min_length=1, max_length=20)
    cmpope: bytes = Field(..., max_length=2)
    fval: float

class BlockD(BaseModel):
    compare_items: List[BlockDItem]
    

class BlockA_BlockD(BaseModel):
    block_a: BlockA
    block_b_list: List[BlockD]    
    