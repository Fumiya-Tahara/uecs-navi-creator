# schemas.py
from pydantic import BaseModel
# from typing import List, Optional
from datetime import time, timedelta

class UecsCreator(BaseModel):
    node_name: str
    model_number: str
    vender_name: str
    uecs_id: str
    mac_address: str

class ParameterCreator(BaseModel):
    name: str
    device_id: int
    type: str
    room: int
    region: int
    order: int
    priority: int
    data: int
    unit: int
    start: time
    end: time
    duration: timedelta
    interval: timedelta
    ipaddress: str
