from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

path = 'mysql+mysqldb://shima:uecs@uecs_navi_creator_db/uecs-db'

# Engine の作成
Engine = create_engine(
    path,
    # encoding="utf-8",
    echo=False
)

# SessionLocalの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=Engine)

Base = declarative_base()
