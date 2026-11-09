from datetime import date
from sqlalchemy import CheckConstraint, Date, ForeignKey, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column
from db import Base

class Student(Base):
    __tablename__ = 'students'
    __table_args__ = (
        CheckConstraint("length(trim(full_name)) > 0", name='student_name_not_blank'),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(254), unique=True)

class Course(Base):
    __tablename__ = 'courses'
    __table_args__ = (
        CheckConstraint('credits BETWEEN 1 AND 6', name='credits_range'),
        CheckConstraint("length(trim(title)) > 0", name='course_title_not_blank'),
        CheckConstraint("length(trim(code)) > 0", name='course_code_not_blank'),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(20), unique=True)
    title: Mapped[str] = mapped_column(String(120))
    credits: Mapped[int]

class Enrollment(Base):
    __tablename__ = 'enrollments'
    __table_args__ = (
        UniqueConstraint('student_id', 'course_id', name='one_enrollment_per_pair'),
        CheckConstraint("status IN ('active', 'completed', 'withdrawn')", name='enrollment_status'),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey('students.id', ondelete='RESTRICT'), index=True)
    course_id: Mapped[int] = mapped_column(ForeignKey('courses.id', ondelete='RESTRICT'), index=True)
    enrolled_on: Mapped[date] = mapped_column(Date, server_default=func.current_date())
    status: Mapped[str] = mapped_column(String(20), server_default='active')
