from sqlalchemy import Column, Float, ForeignKey, Integer,String,LargeBinary,SmallInteger
from typing import List
from app.database.settings import Base
from sqlalchemy.orm import relationship

# EEPROMの割付
# EEPROMは大きく4ブロックに分かれる。

# (1) UECS IDを始めとした個体の識別情報を保存する。1レコード
# (2) 受信されるべきCCM属性を保存する。30レコード
# (3) 送信されるべきCCM属性を保存する。10レコード
# (4) 受信されて設定値と比較する方法を保存する。10レコード

# EEPROMの多くの初期値は0xffである。しかし、これを期待するものではない。

## Block-A

#   個体識別情報

class BlockA(Base):
    __tablename__ = 'block_a'
    uecsid = Column(Integer, primary_key=True) 
    macaddr = Column(LargeBinary)
    fix_dhcp_flag = Column(SmallInteger) # DHCPか固定IPかの指定(0xff:DHCP,0x00:固定IP)
    fixed_ipaddress = Column(LargeBinary)
    fixed_netmask = Column(LargeBinary)
    fixed_defgw = Column(LargeBinary)
    fixed_dns = Column(LargeBinary)
    vender_name= Column(String(16)) # ベンダー名 (ASCIZ文字列)
    node_name= Column(String(16)) #　ノード名 (ASCIZ文字列)
     # BlockBとのリレーションシップ(1対多)
    BlockB_BlockA= relationship("BlockB", back_populates="block_a")
     # BlockCとのリレーションシップ(1対多)
    BlockC_BlockA= relationship("BlockC", back_populates="block_a")
     # BlockDとのリレーションシップ(1対多)
    BlockD_BlockA= relationship("BlockD", back_populates="block_a")



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



class Block(Base):
    __tablename__ = 'blocks'
    id = Column(Integer, primary_key=True)
    type = Column(String(50))
        # id = Column(Integer, primary_key=True) 
    block_a_id = Column(Integer, ForeignKey('block_a.uecsid')) # BlockAのIDを参照,ブロックAとブロックBのリレーション
    block_a = relationship("BlockA", back_populates="BlockB_BlockA")
    valid = Column(SmallInteger)  
    room = Column(SmallInteger)   
    region = Column(LargeBinary)
    order = Column(Integer) # 0以上の整数,unsignedの代わり
    priority = Column(SmallInteger)
    lv = Column(Integer) #lvは1から10
    cast = Column(SmallInteger)  
    sr = Column(String)
    ccm_type = Column(String(20))
    unit = Column(String(10))
    sthr = Column(Integer) #  反映時間帯開始時間 (0〜23)
    stmn = Column(Integer)# 反映時間帯開始分 (0〜59)
    edhr = Column(Integer)#反映時間帯終了時間 (0〜23)
    edmn = Column(Integer)#反映時間帯終了分 (0〜59)
    inmn = Column(Integer)#反映時間間隔 (0〜99)分
    dumn = Column(Integer)#作用時間 (0~99)分 リレーがMAKEしている時間(分)
    rly_l = Column(SmallInteger) #0x2d  RLY1〜4までのリレーのどれをMAKEするか
    rly_h = Column(SmallInteger)  #0x2e  RLY5〜8までのリレーのどれをMAKEするか (後述)
    __mapper_args__ = {
        'polymorphic_identity':'block',
        'polymorphic_on':type
    }

#  受信CCM情報

class BlockB(Block):
    # __tablename__ = 'block_b'
    __mapper_args__ = {
        'polymorphic_identity':'block_b',
    }

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


# Block-Bとメンバーは同じである。
class BlockC(Block):
    # __tablename__ = 'block_c'
    
    __mapper_args__ = {
        'polymorphic_identity':'block_c',
    }

  

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


class BlockD(Base):
   __tablename__ = 'block_d'
   id = Column(Integer, primary_key=True)
   block_a_id = Column(Integer, ForeignKey('block_a.uecsid')) # BlockAのIDを参照,ブロックAとブロックDのリレーション
   block_a = relationship("BlockA", back_populates="BlockD_BlockA")
   valid = Column(SmallInteger)
   room = Column(SmallInteger)
   region = Column(SmallInteger)
   order= Column(Integer)  # 0以上の整数,unsignedの代わり
   priority = Column(SmallInteger)
   ccm_type=Column(String(20))
   cmpope = Column(LargeBinary)
   fval = Column(Float)





    