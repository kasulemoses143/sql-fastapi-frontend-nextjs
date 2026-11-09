BEGIN;
INSERT INTO students (full_name, email) VALUES
('Amina Demo', 'amina@example.com'), ('Brian Demo', 'brian@example.com'),
('Carol Demo', 'carol@example.com') ON CONFLICT (email) DO NOTHING;
INSERT INTO courses (code, title, credits) VALUES
('SQL101', 'Relational databases', 3), ('API101', 'Python web APIs', 3)
ON CONFLICT (code) DO NOTHING;
INSERT INTO enrollments (student_id, course_id)
SELECT s.id, c.id FROM students s CROSS JOIN courses c
WHERE s.email = 'amina@example.com' AND c.code = 'SQL101'
ON CONFLICT (student_id, course_id) DO NOTHING;
COMMIT;
