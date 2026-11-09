import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
# The application engine is never used by tests: dependency overrides supply a test session.
os.environ.setdefault('DATABASE_URL', 'postgresql+psycopg://unused:unused@localhost/unused')
os.environ['CORS_ORIGINS'] = 'http://localhost:3000'
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool
from db import Base, get_session, database_url
from main import app

@pytest.fixture
def client():
    raw = os.getenv('TEST_DATABASE_URL')
    if raw:
        if os.getenv('ALLOW_TEST_DATABASE_RESET') != 'yes':
            raise RuntimeError('Use a disposable database and set ALLOW_TEST_DATABASE_RESET=yes')
        engine = create_engine(database_url(raw))
    else:
        engine = create_engine('sqlite://', connect_args={'check_same_thread':False}, poolclass=StaticPool)
        @event.listens_for(engine, 'connect')
        def foreign_keys(connection, _):
            connection.execute('PRAGMA foreign_keys=ON')
    # The reset flag is explicit because this removes the course tables.
    Base.metadata.drop_all(engine)
    if raw:
        schema = Path(__file__).resolve().parents[1] / 'sql/001_schema.sql'
        with engine.connect() as connection:
            connection.exec_driver_sql(schema.read_text())
            connection.commit()
    else:
        Base.metadata.create_all(engine)
    def override():
        with Session(engine) as session:
            yield session
    app.dependency_overrides[get_session] = override
    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(engine)
        engine.dispose()
