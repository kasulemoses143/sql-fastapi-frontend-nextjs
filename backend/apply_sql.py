"""Run a reviewed SQL file manually, using the direct provider connection."""
import os
import sys
from pathlib import Path
import psycopg
from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name('.env'))
if len(sys.argv) != 2:
    raise SystemExit('Usage: python apply_sql.py sql/001_schema.sql')
path = Path(sys.argv[1])
if not path.is_file():
    raise SystemExit(f'File not found: {path}')
# This URL uses postgresql://, not SQLAlchemy's postgresql+psycopg://.
with psycopg.connect(os.environ['DIRECT_DATABASE_URL'], autocommit=True) as connection:
    connection.execute(path.read_text(), prepare=False)
print(f'Applied {path.name}')
