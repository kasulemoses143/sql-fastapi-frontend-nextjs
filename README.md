# PostgreSQL FastAPI TypeScript and Next.js

A complete guided build for Python learners: design a PostgreSQL database, create and deploy a FastAPI CRUD backend, learn TypeScript from first principles, build a React interface with Next.js and Tailwind, connect the existing API, and deploy the complete application on Vercel.

The material works for self study and tutor-led teaching. It contains **48 sequential lessons**, complete source examples, installation procedures, expected results, exercises with answers, assessments and recovery checkpoints. No previous JavaScript or TypeScript experience is assumed. Advance after passing each result check.

## Follow this order

1. Read [how to use the course](docs/START-HERE.md).
2. Follow [installation and accounts](docs/SETUP.md).
3. Start [Lesson 01](docs/lessons/01.md), using [the full contents](docs/CONTENTS.md).
4. Tutors use [the scheme of work](docs/TEACHER-SCHEME.md) and [assessment guide](docs/ASSESSMENTS.md).
5. Consult [API and relational design](docs/API-CONTRACT.md), [testing](docs/TESTING.md), [deployment](docs/DEPLOYMENT.md) and [troubleshooting](docs/TROUBLESHOOTING.md) at the directed checkpoints.

## The system you build

```text
Browser
  → TypeScript React frontend using Next.js on Vercel
  → Python FastAPI backend on Vercel
  → PostgreSQL operated by Neon via Vercel Marketplace
```

Create, view, edit and delete students/courses. Enroll students, display joined names, change enrollment status and remove relationships. Enforce validation, uniqueness and foreign keys. Show loading, empty, failure and success states. Test and document the result.

Vercel is the sole application deployment platform. Neon operates the database as a third-party Marketplace provider. The frontend never connects directly to PostgreSQL. Two Vercel projects use this repository: root `backend` for FastAPI and root `frontend` for Next.js.

## Repository map

```text
backend/                 Finished Python reference API
  main.py                HTTP routes and CORS
  db.py                  Engine and request sessions
  models.py              SQLAlchemy relational mappings
  schemas.py             Pydantic request and response models
  sql/                   Schema, seed and practice queries
  tests/                 API and relationship regressions
frontend/                Finished TypeScript Next.js reference
  app/                   Home and resource pages using TSX
  lib/api.ts             Typed HTTP request helper
  lib/types.ts           Shared response types
  tsconfig.json          Strict TypeScript configuration
checkpoints/             Earlier complete source versions
scripts/checkpoint.py    Generate a fresh practice folder
.github/workflows/       PostgreSQL regression and frontend build
 docs/                   Setup, 48 lessons and teaching guides
```

The code is a fictional-data teaching demo with no login. It is not a real student-records service. Professional development continues through the independent projects and security/operations pathway in START-HERE.

See [official documentation sources](docs/SOURCES.md) and [verification evidence and limitations](docs/VERIFICATION.md). Exact package versions are recorded in the dependency files. No paid resources or real school data are needed to read these notes.

A portable reading copy is included as [COURSE-HANDBOOK.html](COURSE-HANDBOOK.html). Download it and open it in a browser; use its contents navigation or browser Find. The numbered Markdown notes remain the primary editable source.
