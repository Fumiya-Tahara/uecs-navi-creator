from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# .env ファイルを読み込む
# load_dotenv()

# 環境変数からデータベース接続情報を取得
DATABASE_USER = os.getenv("MYSQL_USER")
DATABASE_PASSWORD = os.getenv("MYSQL_PASSWORD")
DATABASE_HOST = os.getenv("DATABASE_HOST", "uecs_navi_creator_db") 
DATABASE_NAME = os.getenv("MYSQL_DATABASE")

# 接続URLの組み立て
path = f"mysql+mysqldb://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"


# Engine の作成
Engine = create_engine(
    path,
    # encoding="utf-8",
    echo=False
)

# SessionLocalの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=Engine)

Base = declarative_base()
