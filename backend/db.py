import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, Session
from sqlalchemy.pool import NullPool

load_dotenv(Path(__file__).with_name('.env'))

class Base(DeclarativeBase):
    pass

def database_url(raw):
    url = make_url(raw)
    if url.drivername in ('postgres', 'postgresql'):
        url = url.set(drivername='postgresql+psycopg')
    return url

engine = create_engine(
    database_url(os.environ['DATABASE_URL']),
    poolclass=NullPool,
    connect_args={'connect_timeout': 10},
)

def get_session():
    with Session(engine) as session:
        yield session
