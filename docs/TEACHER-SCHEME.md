# Tutor scheme of work

## Teaching approach

Teach one coherent Student Course Enrollment application from its first SQL query through deployment. Students know Python but do not need prior frontend experience. Follow the numbered sequence and assess understanding at the gates; there are no prescribed durations or calendar divisions.

For each lesson: retrieve the previous concept, explain the vocabulary, ask learners to predict the example, demonstrate the complete procedure, let them reproduce it, check the result, attempt independent practice, and discuss the answer. Each learner should explain one decision and diagnose one deliberate error. The learner notes contain the exact complete files; this guide records the lesson-specific objectives, practice and observable evidence.

Tutor preparation: rehearse installation on the supported student operating systems, test school network access, download the reference repository, prepare fictional records and development credentials held privately, and create a recovery checkpoint for the next implementation. Rehearse both Vercel project imports before teaching deployment. Keep screenshots and logs free of credentials.

Support learners by reducing the number of sample records, drawing the request/data path and comparing one file at a time. Do not skip TypeScript fundamentals to get a React screen working. Faster learners can explain edge cases and extend the independent task. Keep advanced features as separate tested extensions.

## Assessment gates and capstone milestones

| Gate | Required evidence | Proceed to |
|---|---|---|
| SQL foundations | Three constrained tables, safe CRUD, seed and query explanations | Relational reports |
| Relational SQL | ERD, correct joins/aggregation/existence reports and safe migration exercise | Python database access |
| Persistent API | Validated Student read/create survives process restart, readable errors | Full resource API |
| Backend completion | All required routes, tests, PostgreSQL integrity and deployed FastAPI on Vercel | TypeScript foundations |
| TypeScript foundations | Typed functions/objects/unions, async explanation and browser fundamentals | Typed React/Next.js |
| UI foundations | Components, props, controlled forms, state and effect reasoning | API integration |
| Local integration | Complete Student/Course/Enrollment workflow with failure states | Frontend deployment |
| Final capstone | Both Vercel URLs, persistent workflow, test evidence, README and individual modification | Independent projects |

Use the tasks and marking guide in [ASSESSMENTS.md](ASSESSMENTS.md). A suggested readiness threshold is 16/20 with no failed critical requirement. Give targeted feedback and a retry using a changed record/query; do not let a copied successful screen conceal missing understanding.

## Lesson plans

## SQL and relational design

### Lesson 01 From Python data to relational tables

**Objectives:** Explain database, table, row and column; identify a primary key; connect to a development PostgreSQL database.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 01](lessons/01.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** List three entities in a library system. Give each a key and two attributes. Diagnostic: write a Python function that returns the emails in a list of dictionaries.

**Evidence and assessment:** One row identifies the database and user; the version contains PostgreSQL. Each drawn student has a different id.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 02 Choose data types and translate business rules

**Objectives:** Choose PostgreSQL types; distinguish null from blank values; turn requirements into constraints.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 02](lessons/02.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Choose types for invoice amount, course title, registration number and enrollment date. State one rule for each.

**Evidence and assessment:** All statements return one row. Missing, blank and zero are different concepts, even when their simple checks each return true.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 03 Create tables and enforce rules

**Objectives:** Create three related tables; explain SQL types and constraints; reject invalid records.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 03](lessons/03.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why enrollments needs two foreign keys and a unique pair. Draw the keys without looking at the schema.

**Evidence and assessment:** Three tables exist. An invalid credits value and an enrollment referring to missing parents are rejected.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 04 Insert select update and delete safely

**Objectives:** Perform SQL CRUD; filter and sort records; use transactions to undo a change.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 04](lessons/04.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Write a SELECT showing only course code and title ordered by code. Change API101 credits to 4 inside a transaction, inspect it, then undo it.

**Evidence and assessment:** The seed gives 3 students, 2 courses and 1 enrollment. SQL101 credits return to 3 after rollback. Repeat seeding leaves the same logical data.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 05 Filter sort and search records accurately

**Objectives:** Combine predicates; use ILIKE and IN; handle NULL correctly; make result ordering explicit.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 05](lessons/05.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Find courses whose title contains API or whose code starts with SQL, while requiring credits=3.

**Evidence and assessment:** The first query finds Amina; the third skips one ordered row and returns the next rows; unknown_result is NULL.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 06 Transactions safe writes and database errors

**Objectives:** Use rollback for safe experiments; inspect affected rows with RETURNING; diagnose constraint errors.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 06](lessons/06.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why wrapping DELETE without WHERE in a transaction is still risky. What should you inspect before committing?

**Evidence and assessment:** The update returns Brian Changed inside the transaction; the later SELECT returns Brian Demo.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 07 Read relationships using joins

**Objectives:** Use INNER JOIN and LEFT JOIN; explain which unmatched records remain; trace an enrollment through keys.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 07](lessons/07.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Write a query showing every student and their enrollment id, including students with no courses.

**Evidence and assessment:** The first query includes Amina Demo, SQL101 and active. The second includes API101 even if no enrollment matches.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 08 Many to many relationships and outer join practice

**Objectives:** Explain relationship attributes; detect unmatched parents; avoid accidental Cartesian products.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 08](lessons/08.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Find courses with no enrolled students. Would a withdrawn record count as a relationship under the current model?

**Evidence and assessment:** The seeded CROSS JOIN creates six combinations; the actual seed has only one enrollment. Brian and Carol have no enrolled relationship initially.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 09 Count summarize and reason about transactions

**Objectives:** Aggregate related rows accurately; use GROUP BY and HAVING; explain all-or-nothing operations.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 09](lessons/09.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Find students who have not enrolled in any course. Explain two correct approaches.

**Evidence and assessment:** Every course is represented in the report, including zero-enrollment courses. The temporary course disappears after rollback.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 10 Subqueries existence and useful reports

**Objectives:** Use EXISTS and NOT EXISTS; separate row filters from group filters; write reports from requirements.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 10](lessons/10.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why does `WHERE e.status='active'` after a LEFT JOIN remove courses with no matching rows?

**Evidence and assessment:** Initial results include Amina as enrolled, API101 as empty, and zero for the empty course in the active-count report.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 11 Indexes explain and incremental schema changes

**Objectives:** Explain why indexes help selected queries; inspect a plan; practise a reversible ALTER TABLE migration.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 11](lessons/11.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Would an index on a boolean active flag always help? Why should schema rollback and application rollback be planned separately?

**Evidence and assessment:** The phone column appears inside the transaction and is absent after rollback. The original capstone schema remains intact.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 12 Database design workshop and SQL assessment

**Objectives:** Design the capstone ERD independently; apply constraints to a new case; explain parameterized queries before Python integration.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 12](lessons/12.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Adapt the model to books, members and loans. Where should due_date live? Can a member borrow a book twice at different times?

**Evidence and assessment:** Your ERD matches the stated business rules, and you can justify each constraint without copying it.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

## Python PostgreSQL and FastAPI

### Lesson 13 Connect Python to PostgreSQL

**Objectives:** Create a virtual environment; load environment variables; execute a bound SQL query using Python.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 13](lessons/13.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Replace the bound value with an email containing an apostrophe. Predict what happens. Explain why the query cannot execute that input as SQL.

**Evidence and assessment:** The script prints a dictionary containing Amina's id and full_name. Brian's address returns Brian's row; an unknown email returns no rows.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 14 Python types modules and resource cleanup

**Objectives:** Read the Python typing used by FastAPI; explain imports, generators and context managers; practise cleanup without a database.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 14](lessons/14.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Add a deliberate ValueError inside the with block and observe cleanup. What must you avoid putting in a public error response?

**Evidence and assessment:** The output order is open, practice, close. Cleanup still runs if the block raises an exception.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 15 Your first HTTP API

**Objectives:** Explain client, server, request and response; start FastAPI locally; inspect OpenAPI docs.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 15](lessons/15.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain main:app in the launch command. Add GET /about returning {"course":"full-stack"}, test it, then remove it before the next checkpoint.

**Evidence and assessment:** GET /health returns status 200 and {"status":"ok"}. /docs shows the health route. /missing returns 404.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 16 Paths queries bodies and HTTP status codes

**Objectives:** Distinguish path/query/body data; test FastAPI validation; read generated OpenAPI documentation.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 16](lessons/16.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Classify /students/7, ?limit=10 and {"full_name":"Amina"} by where the data belongs.

**Evidence and assessment:** The valid request returns id 7 and include_email true. A noninteger id returns 422 before the handler runs.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 17 Pydantic validation and separate input output models

**Objectives:** Validate structured data; forbid unexpected keys; distinguish client input from server-generated fields.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 17](lessons/17.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why should StudentRead include id while StudentWrite does not? Does a type annotation alone stop an unauthorized user?

**Evidence and assessment:** The first payload prints a trimmed name and valid email; the second produces validation errors.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 18 Validated requests and persistent student records

**Objectives:** Map SQL tables to Python classes; validate incoming JSON; create and read persistent students.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 18](lessons/18.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Trace one request from JSON → StudentWrite → Student → SQL INSERT → database row → StudentRead → JSON. What does rollback fix?

**Evidence and assessment:** A valid POST returns 201 with a generated id. Reads return 200. Invalid input returns 422, duplicate email 409, missing id 404. Data survives restarting Python.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 19 Sessions transactions and predictable error recovery

**Objectives:** Trace session lifetime; distinguish validation and integrity errors; verify successful requests after conflicts.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 19](lessons/19.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why is checking for an existing email before INSERT insufficient by itself under concurrency?

**Evidence and assessment:** The duplicate report returns no rows, and the valid request after a conflict succeeds.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 20 Finish student and course CRUD

**Objectives:** Update and delete records; reproduce the student pattern for courses; return consistent HTTP outcomes.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 20](lessons/20.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why does a PUT containing only full_name return 422? What should the frontend send when editing a student?

**Evidence and assessment:** Updates return 200; unreferenced deletions return 204 and an empty body. The following GET returns 404. Course codes are uppercase and credits range from 1 to 6.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 21 Organize the API and document its contract

**Objectives:** Explain module responsibilities; document each route; avoid unnecessary abstraction while learning.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 21](lessons/21.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Where would you change a course title maximum length? Is changing only the frontend enough?

**Evidence and assessment:** Your contract entry matches the implemented route, and you can name the responsible module for each step.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 22 Enrollment relationships and meaningful tests

**Objectives:** Create relationships using IDs; return joined labels; protect referenced records; run regression tests.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 22](lessons/22.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Add a test checking GET /courses/99999 returns 404. Explain why testing only /health is insufficient.

**Evidence and assessment:** All six test functions pass. The API preserves relationships, displays joined names and recovers after a conflict.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 23 Test isolation and backend deployment readiness

**Objectives:** Use disposable test data; distinguish regression checks from production smoke tests; prepare reproducible dependencies.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 23](lessons/23.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why is a passing /health endpoint insufficient evidence for database CRUD deployment?

**Evidence and assessment:** Package checks and API regression tests pass. PostgreSQL test evidence names the disposable target without exposing its credentials.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 24 Deploy and assess the working backend

**Objectives:** Deploy FastAPI on Vercel; use separate production configuration; verify persistent CRUD over HTTPS.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 24](lessons/24.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why a working local API can return 500 on Vercel. Find which log and configuration you would check first.

**Evidence and assessment:** A public or appropriately accessible HTTPS API supports real CRUD with persistent PostgreSQL data. There is no frontend deliverable this stage.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

## TypeScript and browser foundations

### Lesson 25 TypeScript from Python values variables and types

**Objectives:** Use TypeScript values, variables, comparisons and functions; translate small Python examples.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 25](lessons/25.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Write isPassing(mark:number):boolean and test 49, 50 and 80. Try passing a string and explain the editor error.

**Evidence and assessment:** The Playground reports no type errors. The logs include Amina (7), 5, and 1 followed by number. An intentional string assignment to count produces a type error.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 26 Typed functions conditions and loops

**Objectives:** Declare parameter/return types; use conditionals; distinguish number conversion from a type assertion.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 26](lessons/26.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why `"3" as unknown as number` is misleading. What is its runtime type?

**Evidence and assessment:** The logs show 3, 4 and a readable validation error. The function returns only valid numeric credits.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 27 Arrays objects modules and JSON

**Objectives:** Transform arrays with map and filter; read object properties; distinguish TypeScript objects from JSON.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 27](lessons/27.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Use filter to remove id=1 without changing the original array. What does a missing object property evaluate to?

**Evidence and assessment:** The names array contains Amina and Brian; updated changes the first name without changing the original object. JSON round-tripping reconstructs the data.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 28 Object types unions narrowing and immutable updates

**Objectives:** Define reusable shapes; use literal unions; update data without mutation; narrow optional values.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 28](lessons/28.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** What is the difference between `value || fallback` and `value ?? fallback` when value is 0?

**Evidence and assessment:** Original status is active, new status is completed, and absent note displays No note.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 29 Modules tooling and compile time versus runtime

**Objectives:** Understand exports/imports; explain package manifests and lockfiles; run strict TypeScript checks.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 29](lessons/29.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why should someone cloning the course use npm ci rather than npm install next@latest?

**Evidence and assessment:** The reference frontend has no type errors. noEmit means the checker verifies types without writing compiled output files.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 30 Promises async await and safe error handling

**Objectives:** Explain asynchronous execution; return typed Promises; distinguish HTTP errors from network failures.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 30](lessons/30.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** What happens if you call getName without awaiting it and try to use toUpperCase on the result?

**Evidence and assessment:** The logs show start, requested and then AMINA. The awaited continuation occurs after the synchronous calls.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 31 Semantic HTML and Tailwind foundations

**Objectives:** Read semantic HTML, preview Tailwind utilities and explain responsive, hover and keyboard-focus variants.

**Demonstration and resources:** Use the complete example and procedure in [Lesson 31](lessons/31.md) with Tailwind Play, then connect it to [the setup guide](TAILWIND.md). Explain HTML class versus TSX className.

**Independent task:** Add a second action and responsive spacing without authoring custom CSS rules.

**Evidence and assessment:** A styled readable panel, working focus indicator and correct explanation of utility classes and the build requirement.

**Feedback and differentiation:** Let supported learners explain spacing and typography first; ask confident learners to compare state and breakpoint variants. Require each learner to reproduce and explain the example.

### Lesson 32 Fetch JSON inspect network traffic and handle failures

**Objectives:** Build a basic HTML form; explain Tailwind utility classes; use async/await with fetch and handle HTTP errors.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 32](lessons/32.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why `const data = fetch("/students")` is not yet a student array. What does await response.json() do?

**Evidence and assessment:** A readable labeled form appears. The console logs a real students array or a caught HTTP status for an invalid path.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

## Typed React and Next.js

### Lesson 33 Start Next.js and render React components

**Objectives:** Install Node dependencies; explain components and JSX; create App Router pages and shared navigation.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 33](lessons/33.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Change the home heading and add a paragraph. Explain why editing layout affects every page.

**Evidence and assessment:** The home page and three placeholder routes render without a console error. Shared navigation stays visible.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 34 Typed components JSX and reusable props

**Objectives:** Define component props; render expressions and conditional content; distinguish HTML from JSX syntax.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 34](lessons/34.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Add an optional courseCode prop with a fallback label. Why should the child not modify name?

**Evidence and assessment:** The page displays Amina Demo and Enrolled. A string in the boolean prop is rejected by type checking.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 35 React props state and list rendering

**Objectives:** Pass props; render an array with keys; change state using event handlers without mutating data.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 35](lessons/35.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Add a student count above the list. Why is `rows.length` preferable to a separate count state?

**Evidence and assessment:** Two cards render. Removing a card updates the page; reloading restores both because no database was written.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 36 State design immutable updates and derived data

**Objectives:** Choose minimal state; use functional setters; derive counts from rows; distinguish state from a database.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 36](lessons/36.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** If you call setCount(count+1) twice in the same handler, why might it add only one? What is the reliable alternative?

**Evidence and assessment:** The original name remains Amina while the new array contains Amina Demo. Removing a card updates the derived count.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 37 Form events input types and validation boundaries

**Objectives:** Type form handlers; understand string input values; preserve user input after a failed operation.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 37](lessons/37.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** What should happen when the server returns 409 on a form submission? Should a generic catch discard entered data?

**Evidence and assessment:** The logs distinguish a string value, a converted number, zero from an empty string and NaN from invalid text.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 38 Controlled forms and local validation

**Objectives:** Control input values with state; prevent default form navigation; render submitted data and validation messages.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 38](lessons/38.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Add a Cancel button that clears the form without submitting it. Explain why calling a setter during rendering is wrong.

**Evidence and assessment:** A valid submit adds a local list row; blank names are rejected; refresh resets the local list.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 39 Effects server client boundaries and data lifecycle

**Objectives:** Distinguish initial loading effects from event writes; understand cleanup; keep secrets out of browser bundles.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 39](lessons/39.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why is storing DATABASE_URL in NEXT_PUBLIC_DATABASE_URL unsafe even when a page is a Server Component?

**Evidence and assessment:** The learner can identify where initial reads, explicit writes, errors and cleanup belong before connecting the API.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 40 Type checking accessibility and UI failure states

**Objectives:** Check the reference UI systematically; distinguish compiler evidence from behavior evidence; prepare an integration test plan.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 40](lessons/40.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why does a test asserting that a Save button exists fail to establish that saving works?

**Evidence and assessment:** The reference frontend typechecks/builds, and the learner has a written behavior checklist for the API connection.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

## Integration testing and deployment

### Lesson 41 Connect the student interface to FastAPI

**Objectives:** Configure the public API URL; fetch data in an effect; submit CRUD requests; distinguish loading, empty and error states.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 41](lessons/41.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Use a deployed API URL with the local frontend. What must change in the backend CORS setting? What must be rebuilt for a deployed frontend URL change?

**Evidence and assessment:** Students loaded from PostgreSQL appear; writes survive refresh. Duplicate and network errors are visible, and saving disables controls temporarily.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 42 Build course management and trace errors

**Objectives:** Apply the CRUD UI pattern to courses; convert numeric input intentionally; diagnose API vs browser failures.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 42](lessons/42.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Explain why the server must still validate credits when the input has min=1 and max=6. Show a failing request in /docs.

**Evidence and assessment:** Course writes persist. Invalid inputs cannot create invalid database records. Errors are visible and buttons recover after a failed request.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 43 Read request contracts pagination and honest UI limits

**Objectives:** Trace typed API requests; understand limit/offset; distinguish static type expectations from runtime JSON.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 43](lessons/43.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why should page ordering include a stable unique key? What changes if rows are added between offset requests?

**Evidence and assessment:** API windows return ordered bounded results, and the learner can state the current UI dataset limit accurately.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 44 Connect enrollments and complete integration

**Objectives:** Load related resources; use select controls with IDs; display joined labels; update status and remove relationships.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 44](lessons/44.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why should the enrollment request send student_id rather than student_name? What happens if two students have the same name?

**Evidence and assessment:** The complete local workflow works across all three pages, and database constraints produce useful UI errors.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 45 Responsive usability security and release review

**Objectives:** Check the integrated app on small screens; understand authentication vs CORS; prepare release evidence.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 45](lessons/45.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** A caller uses curl to POST a student from an unapproved origin. Does CORS guarantee rejection? What would enforce access?

**Evidence and assessment:** The integrated app is usable with keyboard and narrow screens, and the release checklist contains no secret values.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 46 Deploy the frontend and configure both origins

**Objectives:** Deploy Next.js on Vercel; connect it to the existing API; verify production CORS and environment mappings.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 46](lessons/46.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Why can a 401 or login page from deployment protection look like a CORS error? Where should a bypass token never be placed?

**Evidence and assessment:** The deployed frontend can create, read, edit and delete fictional records through the deployed API and PostgreSQL.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 47 Test debug and prepare a handover

**Objectives:** Run regression checks; verify accessibility and failure behavior; write a reproducible project README.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 47](lessons/47.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Find one misleading error and improve its message without exposing internal SQL or secrets. Add a regression test if behavior changes.

**Evidence and assessment:** Another learner can follow the README, and final regression/manual checks have dated evidence.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

### Lesson 48 Demonstrate the capstone and plan independent work

**Objectives:** Demonstrate an end-to-end workflow; explain the architecture independently; diagnose one failure and identify next learning goals.

**Demonstration and resources:** Rehearse the numbered worked procedure and complete file blocks in [Lesson 48](lessons/48.md). Show the expected result, then introduce a deliberate input/path/type error relevant to that concept and diagnose it using the stated check.

**Independent task:** Choose one advanced feature and write an acceptance test in plain language before implementing it.

**Evidence and assessment:** All required features are deployed and demonstrable, and each student can explain and modify the system independently.

**Feedback and differentiation:** Use the lesson's answer and reasoning. Ask a supported learner to explain the smallest working example; ask a confident learner to justify a boundary case and its test. Collect an individual explanation and a working result before advancing.

## Remediation and transfer

When a learner is stuck, identify the earliest failed prerequisite: Python data access, SQL keys, HTTP contract, TypeScript shape, React state or environment configuration. Revisit that lesson and use a fresh checkpoint folder to compare complete code without losing the learner's work. A code checkpoint does not reset or migrate a database.

Keep the same capstone through the common build so support is consistent. Require an independent second domain only after the common workflow is understood. Simplify optional styling and reports if necessary; preserve data integrity, tests, TypeScript foundations and deployment verification.

The final individual review should select a route and a TSX event handler without advance notice, ask the learner to trace the request and request a small modification. Assess explanation, debugging and reproducibility alongside visible features. Do not promise expertise solely from completing the common app.
