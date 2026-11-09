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

@app.put('/students/{record_id}', response_model=StudentRead)
def update_student(record_id: int, body: StudentWrite, session: SessionDep):
    row = find_or_404(session, Student, record_id)
    row.full_name = body.full_name
    row.email = str(body.email)
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.delete('/students/{record_id}', status_code=204)
def delete_student(record_id: int, session: SessionDep):
    row = find_or_404(session, Student, record_id)
    session.delete(row)
    commit_or_conflict(session)
    return Response(status_code=204)

@app.get('/courses', response_model=list[CourseRead])
def list_courses(session: SessionDep, limit: Limit = 100, offset: Offset = 0):
    return session.scalars(select(Course).order_by(Course.id).limit(limit).offset(offset)).all()

@app.post('/courses', response_model=CourseRead, status_code=201)
def create_course(body: CourseWrite, session: SessionDep):
    row = Course(**body.model_dump())
    session.add(row)
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.get('/courses/{record_id}', response_model=CourseRead)
def get_course(record_id: int, session: SessionDep):
    return find_or_404(session, Course, record_id)

@app.put('/courses/{record_id}', response_model=CourseRead)
def update_course(record_id: int, body: CourseWrite, session: SessionDep):
    row = find_or_404(session, Course, record_id)
    row.code, row.title, row.credits = body.code, body.title, body.credits
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.delete('/courses/{record_id}', status_code=204)
def delete_course(record_id: int, session: SessionDep):
    row = find_or_404(session, Course, record_id)
    session.delete(row)
    commit_or_conflict(session)
    return Response(status_code=204)

@app.get('/enrollments', response_model=list[EnrollmentDetail])
def list_enrollments(session: SessionDep, limit: Limit = 100, offset: Offset = 0):
    query = (
        select(Enrollment, Student.full_name, Course.code, Course.title)
        .join(Student, Student.id == Enrollment.student_id)
        .join(Course, Course.id == Enrollment.course_id)
        .order_by(Enrollment.id).limit(limit).offset(offset)
    )
    return [dict(
        id=e.id, student_id=e.student_id, course_id=e.course_id,
        enrolled_on=e.enrolled_on, status=e.status,
        student_name=name, course_code=code, course_title=title,
    ) for e, name, code, title in session.execute(query).all()]

@app.post('/enrollments', response_model=EnrollmentRead, status_code=201)
def create_enrollment(body: EnrollmentWrite, session: SessionDep):
    find_or_404(session, Student, body.student_id)
    find_or_404(session, Course, body.course_id)
    row = Enrollment(**body.model_dump())
    session.add(row)
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.get('/enrollments/{record_id}', response_model=EnrollmentRead)
def get_enrollment(record_id: int, session: SessionDep):
    return find_or_404(session, Enrollment, record_id)

@app.patch('/enrollments/{record_id}', response_model=EnrollmentRead)
def update_enrollment(record_id: int, body: EnrollmentUpdate, session: SessionDep):
    row = find_or_404(session, Enrollment, record_id)
    row.status = body.status
    commit_or_conflict(session)
    session.refresh(row)
    return row

@app.delete('/enrollments/{record_id}', status_code=204)
def delete_enrollment(record_id: int, session: SessionDep):
    row = find_or_404(session, Enrollment, record_id)
    session.delete(row)
    commit_or_conflict(session)
    return Response(status_code=204)
