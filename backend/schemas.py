from datetime import date
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

class InputModel(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra='forbid')

class StudentWrite(InputModel):
    full_name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=254)
    @field_validator('email', mode='after')
    @classmethod
    def normalize_email(cls, value):
        return str(value).lower()

class StudentRead(StudentWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int

class CourseWrite(InputModel):
    code: str = Field(min_length=1, max_length=20)
    title: str = Field(min_length=1, max_length=120)
    credits: int = Field(ge=1, le=6, strict=True)
    @field_validator('code', mode='after')
    @classmethod
    def normalize_code(cls, value):
        return value.upper()

class CourseRead(CourseWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int

class EnrollmentWrite(InputModel):
    student_id: int = Field(gt=0, strict=True)
    course_id: int = Field(gt=0, strict=True)

class EnrollmentUpdate(InputModel):
    status: Literal['active', 'completed', 'withdrawn']

class EnrollmentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    student_id: int
    course_id: int
    enrolled_on: date
    status: str

class EnrollmentDetail(EnrollmentRead):
    student_name: str
    course_code: str
    course_title: str
