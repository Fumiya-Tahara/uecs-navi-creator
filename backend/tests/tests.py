import sqlalchemy
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app, get_db  
from app.database.settings import Base  
# from app.database.models import Uecs, Parameter  

# テスト用データベースの設定
# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

SQLALCHEMY_DATABASE_URL = mysql+mysqldb://shima:uecs@uecs_navi_creator_db/uecs-db

engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


    # node_name: str
    # model_number: str
    # vender_name: str
    # uecs_id: str
    # mac_address: str

def test_create_uecs():
    # 例：UECSエンティティの作成をテスト
    response = client.post("/uecs/create", json={"node_name": "Test UECS", "model_number": "A test UECS","vendor_name":"test","uecs_id":"test","mac_address":"test"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test UECS"
    assert "id" in data


