# Practical assessments and capstone marking

## How to assess

These are progression gates, not calendar assignments. Use notes during practical work, but require an independent explanation and a small change. Score each gate out of 20. A suggested pass is 16/20 and all critical requirements satisfied. Give feedback naming the failed concept, then repeat with changed fictional data. Self-study learners should hide the model answer until the task is attempted.

For a single course grade, a suggested weighting is the first seven gates combined 40 percent, deployed backend 20 percent, final capstone 30 percent and individual explanation/modification 10 percent. The deployed-backend task is gate 4 and is assessed separately for its deployment evidence; avoid counting the same evidence twice when adapting this scheme. Alternatively treat all gates as formative and use only the final rubric for summative marking.

## Gate 1 SQL foundations

**Checkpoint:** After Lesson 06.

**Task and marking:** Create the three constrained tables in a fresh development database (5). Insert fictional parent records and an enrollment (4). Read/filter/order selected columns (4). Change one intended row and demonstrate rollback (4). Explain one rejected duplicate or foreign-key write (3).

**Critical requirements:** Missing keys or an unrestricted parent relationship is a critical failure. Destructive writes without a verified target require remediation.

**Model answer and verification:** The schema should have generated primary keys, unique email/code, valid credit/status checks, two foreign keys and one unique enrollment pair. A safe update uses WHERE and a before/after SELECT; rollback restores the original value. Use actual returned IDs.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 2 Relational SQL and design

**Checkpoint:** After Lesson 12.

**Task and marking:** Draw the ERD with correct cardinalities (4). Return student and course labels with an enrollment join (4). Count enrollments per course including empty courses (4). Find students with no enrollments (4). Explain a reversible migration and why a model edit is not one (4).

**Critical requirements:** Joining unrelated id columns or omitting empty courses when explicitly required is a critical misunderstanding.

**Model answer and verification:** Join e.student_id=s.id and e.course_id=c.id. Use LEFT JOIN and COUNT(e.id) for zero-preserving reports. Use NOT EXISTS or LEFT JOIN ... WHERE e.id IS NULL for unmatched parents. A migration alters the actual schema; Python annotations alone do not.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 3 Persistent validated API

**Checkpoint:** After Lesson 19.

**Task and marking:** Run FastAPI and use /docs (3). Create/read a student with PostgreSQL persistence after restart (6). Show invalid email 422 and missing id 404 (4). Show duplicate email 409 followed by a successful different write (4). Explain session lifetime and rollback (3).

**Critical requirements:** An in-memory-only list does not pass persistence. Returning 200 for failed requests does not pass error behavior.

**Model answer and verification:** A POST with StudentWrite returns 201 and generated id; GET returns stored data. The row survives process restart. Validation precedes the handler; a unique conflict is rolled back. The dependency supplies one Session per request.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 4 Complete deployed backend

**Checkpoint:** After Lesson 24.

**Task and marking:** Demonstrate Student and Course CRUD over the deployed HTTPS API (5). Create/list/update/delete enrollment with joined labels and correct statuses (5). Demonstrate duplicate and parent-delete protection (4). Show test results and correct production schema/configuration (4). Explain the two platform responsibilities (2).

**Critical requirements:** The backend must actually run on Vercel and use persistent PostgreSQL provisioned through Marketplace. A local-only demo or missing relationship integrity does not pass.

**Model answer and verification:** Both resource CRUD patterns work; enrollments have one pair and protected parents. Source has no secrets and does not migrate tables on each request. Vercel runs the application; Neon is the database operator.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 5 TypeScript and browser foundations

**Checkpoint:** After Lesson 32.

**Task and marking:** Write a typed function with parameter/return types (4). Model Student and Status, explain an intentional type error (4). Filter/map records without mutation (4). Explain Promise/await and response.ok (4). Explain HTML labels and a network request record (4).

**Critical requirements:** Copying annotations without explaining runtime conversion or treating type assertions as validation requires remediation.

**Model answer and verification:** Use number/string/boolean and reusable object types. A literal union constrains status. map/filter produce arrays. async functions return Promises; fetch must be checked for non-2xx outcomes. Types disappear at runtime; external data still needs validation.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 6 Typed React and Next.js foundations

**Checkpoint:** After Lesson 40.

**Task and marking:** Create a typed component and pass props (4). Render a keyed list and update state immutably (4). Build a controlled form with a typed submit handler (5). Explain route folders and client/server boundary (4). Demonstrate typecheck and keyboard behavior (3).

**Critical requirements:** A page reload on each React submission or a render-time write loop is a critical failure.

**Model answer and verification:** TSX files contain typed JSX. Client Components handle state/events; app/page.tsx and route folders define pages. Submit prevents default navigation; field state is updated through setters. Derived counts come from rows.length.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 7 Complete local integration

**Checkpoint:** After Lesson 45.

**Task and marking:** Persist student/course form actions through the existing API (5). Use select IDs and joined enrollment labels (5). Show validation/conflict/network failure states (4). Demonstrate typed request helper and environment/CORS configuration (3). Verify keyboard and narrow-screen behavior (3).

**Critical requirements:** Frontend database credentials, direct browser SQL or fake local persistence do not pass.

**Model answer and verification:** The browser sends typed-contract JSON over HTTP to FastAPI, which accesses PostgreSQL. CORS allows exact frontend origins. Public configuration contains only API base URL. Input stays editable after failed saves and data persists after refresh.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Gate 8 Final deployed capstone

**Checkpoint:** After Lesson 48.

**Task and marking:** Run the complete scenario below (8). Show both deployed Vercel applications and PostgreSQL mapping (4). Present reproducible README and tests (4). Independently explain one route/handler and make a small change (4).

**Critical requirements:** Both application URLs must be usable under the intended access policy. The student must explain the implementation independently.

**Model answer and verification:** The scenario should complete using actual persisted records and visible error behavior. README includes exact setup and startup commands, variable names, migration steps, API contract, URLs, tests and limitations. Explain no-login and dataset limitations honestly.

**Retry:** use different fictional records and ask the learner to explain the previously failed concept before rerunning the operation. Self-study learners should record actual outputs and compare them with this expected evidence.

## Final capstone scenario

Create a uniquely named student and course. Enroll the student, refresh the page and show the same relationship. Change status to completed and verify again. Attempt the duplicate pair and show a readable conflict. Try deleting its course and show parent protection. Remove the enrollment, then delete the unreferenced parent records. Show the matching SQL join, a meaningful API test, the source commit and the two Vercel production URLs.

## Final rubric out of 100

| Criterion | Points | Full-credit evidence |
|---|---|---|
| Relational design and SQL | 20 | Correct keys/constraints, joins/reports, safe writes and schema explanation |
| FastAPI behavior and persistence | 25 | Required endpoints, validation, statuses, transactions and persistent PostgreSQL |
| TypeScript React Tailwind and Next.js | 20 | Typed props/state/forms, correct client boundary, readable working pages |
| Integration and user feedback | 15 | Real HTTP workflow, failure/pending/empty states and exact CORS configuration |
| Deployment tests and handover | 10 | Both Vercel projects, test evidence, correct environment mapping and reproducible README |
| Individual understanding | 10 | Clear trace of a request, diagnosis and independent small modification |

A pleasing interface cannot compensate for missing persistence or a broken data relationship. A functioning group project cannot replace the individual review. Apply a practical minimum of a working deployed CRUD path and no exposed credentials, then use the rubric to evaluate quality.

## Tutor question bank

Ask why a foreign key differs from a primary key; why COUNT(e.id) differs from COUNT(*) after a LEFT JOIN; why a duplicate can race a precheck; why rollback is needed; why GET /health does not test PostgreSQL; why a generic TypeScript result does not validate JSON; why a form number is initially a string; why state should be replaced immutably; why useEffect should not create a row; why a public variable needs a frontend rebuild; and why CORS is not authorization.
