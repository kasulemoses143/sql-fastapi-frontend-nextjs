from fastapi import FastAPI
app = FastAPI(title='Student Course Enrollment API')

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.get('/practice/students/{student_id}')
def practice_student(student_id: int, include_email: bool = False):
    return {'student_id': student_id, 'include_email': include_email}
