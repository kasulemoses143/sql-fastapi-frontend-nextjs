def student(client, name='Amina', email='amina@example.com'):
    response = client.post('/students', json={'full_name':name, 'email':email})
    assert response.status_code == 201
    return response.json()

def course(client):
    response = client.post('/courses', json={'code':'sql101', 'title':'SQL', 'credits':3})
    assert response.status_code == 201
    return response.json()

def test_health_and_student_crud(client):
    assert client.get('/health').json() == {'status':'ok'}
    s = student(client)
    assert client.get(f"/students/{s['id']}").json()['full_name'] == 'Amina'
    updated = client.put(f"/students/{s['id']}", json={'full_name':'Amina Demo','email':'AMINA@example.com'})
    assert updated.status_code == 200
    assert updated.json()['email'] == 'amina@example.com'
    assert len(client.get('/students').json()) == 1
    assert client.delete(f"/students/{s['id']}").status_code == 204
    assert client.get(f"/students/{s['id']}").status_code == 404

def test_validation_and_duplicate_recovery(client):
    student(client)
    assert client.post('/students', json={'full_name':'Other','email':'AMINA@example.com'}).status_code == 409
    assert student(client, 'Brian','brian@example.com')['id'] > 0
    for body in [dict(full_name=' ',email='ok@example.com'),dict(full_name='X',email='bad'),dict(full_name='X',email='x@example.com',id=1)]:
        assert client.post('/students',json=body).status_code == 422
    assert client.get('/students?limit=101').status_code == 422
    assert client.get('/students?offset=-1').status_code == 422

def test_course_crud(client):
    c = course(client)
    assert c['code'] == 'SQL101'
    assert client.get(f"/courses/{c['id']}").status_code == 200
    assert client.post('/courses',json={'code':'sql101','title':'Other','credits':3}).status_code == 409
    assert client.put(f"/courses/{c['id']}",json={'code':'API101','title':'API','credits':4}).status_code == 200
    assert client.post('/courses',json={'code':'BAD','title':'Bad','credits':7}).status_code == 422
    assert client.post('/courses',json={'code':'BAD','title':'Bad','credits':3.5}).status_code == 422
    assert client.delete(f"/courses/{c['id']}").status_code == 204
    assert client.get(f"/courses/{c['id']}").status_code == 404

def test_enrollment_integrity_and_join(client):
    s,c = student(client),course(client)
    body = {'student_id':s['id'], 'course_id':c['id']}
    r = client.post('/enrollments',json=body)
    assert r.status_code == 201
    e = r.json()
    assert e['enrolled_on'] and e['status'] == 'active'
    assert client.get(f"/enrollments/{e['id']}").status_code == 200
    assert client.post('/enrollments',json=body).status_code == 409
    assert client.delete(f"/students/{s['id']}").status_code == 409
    assert client.delete(f"/courses/{c['id']}").status_code == 409
    assert client.get('/enrollments').json()[0]['student_name'] == 'Amina'
    assert client.patch(f"/enrollments/{e['id']}",json={'status':'completed'}).status_code == 200
    assert client.patch(f"/enrollments/{e['id']}",json={'status':'wrong'}).status_code == 422
    assert client.delete(f"/enrollments/{e['id']}").status_code == 204
    assert client.delete(f"/students/{s['id']}").status_code == 204
    assert client.delete(f"/courses/{c['id']}").status_code == 204

def test_missing_records_and_pagination(client):
    assert client.get('/students/99999').status_code == 404
    assert client.post('/enrollments',json={'student_id':99999,'course_id':99999}).status_code == 404
    student(client)
    student(client,'Brian','brian@example.com')
    rows = client.get('/students?limit=1&offset=1').json()
    assert len(rows) == 1 and rows[0]['full_name'] == 'Brian'

def test_cors(client):
    headers={'Origin':'http://localhost:3000','Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type'}
    r = client.options('/students',headers=headers)
    assert r.status_code == 200
    assert r.headers['access-control-allow-origin'] == 'http://localhost:3000'
    headers['Origin'] = 'https://untrusted.example'
    r = client.options('/students',headers=headers)
    assert 'access-control-allow-origin' not in r.headers
