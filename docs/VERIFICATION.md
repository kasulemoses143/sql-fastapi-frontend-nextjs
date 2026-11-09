# Verification evidence and limitations

## Checks performed on the reference code

The Python application was installed into an isolated Python 3.12 environment using the resolved dependencies. The six API regression tests passed using the in-memory relational test fixture. They also passed through psycopg against a disposable PGlite PostgreSQL runtime using the handwritten PostgreSQL schema. Schema and seed application through apply_sql.py succeeded.

PGlite executes PostgreSQL in WebAssembly and was used only as a local verification aid; it is not the course's deployed database provider. Its socket/concurrency behavior differs from a native PostgreSQL service. The repository's CI workflow uses a native PostgreSQL 17 service and should be checked in GitHub Actions after publishing. A successful PGlite run does not prove Neon TLS, Marketplace environment mapping or native PostgreSQL CI success. [PGlite socket documentation](https://pglite.dev/docs/pglite-socket).

The TypeScript and Tailwind frontend passed strict tsc --noEmit checking and a Next.js production build. The checked versions are Next.js 16.4.5, React 19.3.1 and TypeScript 7.0.2 with Tailwind 4.3.5 and its PostCSS integration. Exact dependencies are recorded in package-lock.json. The key backend packages are FastAPI 0.162.2, SQLAlchemy 2.1.8, psycopg 3.3.8 and Pydantic 2.14.3; see requirements.txt for all packages.

A local browser check connected the TypeScript frontend to the Python API and disposable PostgreSQL runtime. Creating a student, creating a course, enrolling that student, changing enrollment status, retaining data across refresh and displaying a duplicate-enrollment conflict were checked. The automated tests also cover updates/deletions, validation, parent protection, missing IDs, pagination and CORS headers.

The complete notes were checked for broken local links, Python block syntax and unwanted course schedule labels. Fresh intermediate practice folders were generated and their TypeScript stages checked with the compiler. These checks reduce missing-file and copy-order mistakes; they do not eliminate the need for learner result checks and tutor rehearsal.

## Remaining environment-specific checks

No real Vercel application or Neon database was created as part of preparing the notes. The deployment guide follows the linked official documentation, but account permissions, chosen plans, regions, production URLs, provider TLS and environment mappings must be verified during the actual deployment lesson. Run the production smoke checklist after each release.

The full GitHub Actions run is separate evidence and must be inspected in the repository's Actions tab. Do not describe an unrun workflow as passing. Test the setup on the actual classroom Windows/macOS/Linux machines, including network restrictions and installation policies.

The local API tests emit a dependency deprecation warning about TestClient's httpx transport with the pinned framework versions. The tests pass. Treat a future dependency upgrade as maintenance: re-run regression, typecheck, build and deployment checks before distributing changed lockfiles.

## Explicit project limits

This is a fictional-data learning application with no authentication or authorization, no real student privacy workflow and a core UI list window of 100 records. TypeScript response generics express the known API contract; they are not runtime response validation. The SQL and API enforce the documented relational rules. Professional deployment with real records requires the security, migration, recovery and operations extensions described in START-HERE.
