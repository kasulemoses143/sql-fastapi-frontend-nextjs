-- Read only exercises. Run after 001 and 002.
SELECT id, full_name, email FROM students ORDER BY id;
SELECT code, title FROM courses WHERE credits >= 3 ORDER BY code;
SELECT s.full_name, c.code, e.status
FROM enrollments e JOIN students s ON s.id=e.student_id
JOIN courses c ON c.id=e.course_id ORDER BY s.full_name;
SELECT c.code, COUNT(e.id) AS enrollment_count
FROM courses c LEFT JOIN enrollments e ON e.course_id=c.id
GROUP BY c.id, c.code ORDER BY c.code;
-- Safe demonstration: change then undo.
BEGIN;
UPDATE courses SET credits=4 WHERE code='SQL101';
SELECT code, credits FROM courses WHERE code='SQL101';
ROLLBACK;
