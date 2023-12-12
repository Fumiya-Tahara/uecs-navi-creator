from sqlalchemy import Column, ForeignKey, Integer, Interval, String, Time

from app.database.settings import Base

from sqlalchemy.orm import relationship




# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True)
#     mail = Column(String)
#     password = Column(String)


     
class Uecs(Base):    
    __tablename__ = 'uecs'
    id = Column(Integer, primary_key=True)
    node_name = Column(String)
    model_number=Column(String)
    vender_name=Column(String)
    uecs_id=Column(String)
    mac_address=Column(String)
    parameters = relationship("Parameter", back_populates="uecs")  # 1対多リレーションシップの設定
    

# class User_Uecs(Base):
#     __tablename__ = 'user_uecs'
#     id = Column(Integer, primary_key=True) 
#     user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
#     uecs_id = Column(Integer, ForeignKey('uecs.id'), primary_key=True)

class Parameter(Base):
    __tablename__ = 'parameters'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    device_id=Column(Integer, ForeignKey('uecs.id'))
    type=Column(String)
    room=Column(Integer)
    region=Column(Integer)
    order=Column(Integer)
    priority=Column(Integer)
    data=Column(Integer)
    unit=Column(Integer)
    start = Column(Time)  # 時間型
    end = Column(Time)    
    duration = Column(Interval)  # 期間や間隔を表す
    interval = Column(Interval)  
    ipaddress=Column(String)
    uecs = relationship("Uecs", back_populates="parameters") 
     
