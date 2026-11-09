# How to use this course

## Intended learning outcomes

Design a relational schema, write useful SQL, build and test a persistent Python API, create typed React forms with Next.js, connect the two applications over HTTP and deploy both on Vercel. Explain a real request end to end and reproduce the setup on another computer.

You should already understand Python variables, collections, functions, modules, classes and exceptions. No SQL, frontend language, Tailwind, React or deployment knowledge is assumed. The first lesson includes a Python diagnostic. Review functions and dictionaries if those are still difficult.

This course builds a substantial foundation. Expertise requires repeated independent projects, security, testing, performance work and operating systems in practice. Do not treat completion of copied code as professional mastery.

## Learning sequence

First learn SQL and data modeling. Next connect Python to PostgreSQL, build and test FastAPI, and deploy a complete working backend. Only after that checkpoint begin TypeScript fundamentals. Then learn React and Next.js, connect the existing API, verify the complete workflow and deploy the frontend. See CONTENTS for all 48 lessons.

Each lesson includes vocabulary, conceptual explanation, exact procedures, complete file content where code is introduced, expected results, exercises, answers and tutor/self-study guidance. Later lessons may replace a whole earlier file: commit working code before replacing it. Do not paste a fragment into a location the lesson did not specify.

## Keep reference and practice separate

Clone this repository into a folder named course-reference. Create a sibling folder student-project for the files you type. Both folders should be visible in your editor or file manager. Paths such as backend/main.py in a lesson are relative to student-project. Terminal commands explicitly name their working folder.

The finished backend and frontend in course-reference let a tutor rehearse the end result. They are also useful for comparison, but learners should follow the sequential notes and explain each stage.

## Recovery checkpoints

From course-reference run `python scripts/checkpoint.py 18 ../checkpoint-18` (use python3 or py -3.12 if appropriate before activating a virtual environment). This creates a NEW practice folder with the working code through Lesson 18. It refuses to overwrite any existing destination. Use a different destination each time.

Available source checkpoints: 15, 16, 18, 20, 22, 24, 33, 34, 35, 38, 41, 42, 44, 46, 47 and 48. No checkpoint contains credentials, installed packages or database records. Follow SETUP to create .env files, install dependencies and initialize an appropriately fresh DEVELOPMENT database. Intermediate checkpoints may intentionally lack later routes.

Compare your work with the checkpoint one file at a time. Fix the cause, explain the difference and repeat the test. A successful comparison is a learning aid, not a substitute for understanding.

## Completion gates

Pass the SQL foundations and relational-query assessments before the API stage. Pass the backend CRUD/testing/deployment gate before frontend work. Pass TypeScript foundations before typed React. Finish local integration before production frontend deployment. The assessment guide gives tasks, expected evidence, marking and remediation.

For each lesson, predict the result, perform the action, inspect the evidence, reproduce it without copying and commit the working change. Keep a debugging journal with expected/actual results and fixes. Pair learners should alternate roles, but each must independently explain code and make a small change.

## Scope and progression

Core scope: Student/Course/Enrollment management, relational constraints, SQL joins/reports, SQLAlchemy, Pydantic, FastAPI, TypeScript basics, React props/state/forms/effects, Tailwind styling, Next.js App Router, HTTP integration, CORS, tests, environment variables, Vercel deployments and a reproducible handover.

The classroom UI displays up to 100 records per list. The API supports limit/offset; UI pagination is a further task. The demo has no login or authorization and must contain only fictional data. Authentication, role-based permissions, payments, uploads, WebSockets, advanced caching and background jobs are not silently claimed as finished features.

For further professional practice:

1. Add server-enforced authentication and role permissions, with denied-access tests.
2. Introduce Alembic migrations, backup/restore rehearsal and deployment-compatible schema changes.
3. Add pagination/search, query plans and measured indexes on larger datasets.
4. Add browser regression automation, protected secrets and CI deployment gates.
5. Add monitoring, structured logs, recovery procedures and an operational owner.
6. Build a second domain independently, such as inventory or library loans, with its own business rules and tests.

All application deployments remain on Vercel. PostgreSQL remains an external Marketplace database. Add complexity only when you can explain the preceding implementation.
