import os
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from db import get_session
from models import Student, Course, Enrollment
from schemas import (
    StudentWrite, StudentRead, CourseWrite, CourseRead,
    EnrollmentWrite, EnrollmentUpdate, EnrollmentRead, EnrollmentDetail,
)

app = FastAPI(title='Student Course Enrollment API', version='1.0.0')
origins = [x.strip() for x in os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',') if x.strip()]
app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=False,
    allow_methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allow_headers=['Content-Type'],
)
SessionDep = Annotated[Session, Depends(get_session)]
Limit = Annotated[int, Query(ge=1, le=100)]
Offset = Annotated[int, Query(ge=0)]

def find_or_404(session, model, record_id):
    row = session.get(model, record_id)
    if row is None:
        raise HTTPException(404, 'Record not found')
    return row

def commit_or_conflict(session):
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        raise HTTPException(409, 'Conflict with an existing record or relationship')

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.get('/students', response_model=list[StudentRead])
def list_students(session: SessionDep, limit: Limit = 100, offset: Offset = 0):
    return session.scalars(select(Student).order_by(Student.id).limit(limit).offset(offset)).all()

@app.post('/students', response_model=StudentRead, status_code=201)
def create_student(body: StudentWrite, session: SessionDep):
    row = Student(**body.model_dump())
    session.add(row)
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.get('/students/{record_id}', response_model=StudentRead)
def get_student(record_id: int, session: SessionDep):
    return find_or_404(session, Student, record_id)
