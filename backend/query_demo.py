from sqlalchemy import text
from db import engine
# Bind data separately from SQL. Do not use f-strings to build queries.
with engine.connect() as connection:
    rows = connection.execute(
        text('SELECT id, full_name FROM students WHERE email = :email'),
        {'email': 'amina@example.com'},
    )
    for row in rows:
        print(dict(row._mapping))
