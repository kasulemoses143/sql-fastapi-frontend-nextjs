# Deploy both applications on Vercel

## A Architecture and environment policy

Use one GitHub repository and **two Vercel application projects**. Project `student-course-api` has root directory `backend`; project `student-course-web` has root directory `frontend`. Both applications run on Vercel. PostgreSQL is operated by the external provider Neon and provisioned via Vercel Marketplace. Vercel's old Postgres offering is discontinued; do not follow older tutorials installing @vercel/postgres. [Vercel Postgres status](https://vercel.com/docs/postgres).

Vercel also documents combined frontend/backend Services. This course deliberately teaches two projects to expose the HTTP boundary and practice CORS; a combined deployment is an optional later exercise. [Vercel FastAPI guide](https://vercel.com/docs/frameworks/backend/fastapi).

Decide on separate development and production databases/branches before deployment. Create them through the Marketplace resource/provider dashboard. A test database must also be disposable and separate. Preview deployments must point at a nonproduction backend/database. Do not assume automatic branching or environment injection has selected the database you intended.

## B Prepare production PostgreSQL

1. Open your Neon integration in Vercel Marketplace and its provider dashboard. Create/select the intended PRODUCTION database/branch. Confirm its name before running SQL. It contains fictional demo records only.
2. Open its SQL editor and run backend/sql/001_schema.sql ONCE on the fresh database. Run backend/sql/002_seed.sql if you want the sample records. Run a simple SELECT on each table to confirm success.
3. Alternatively run apply_sql.py from your own computer with DIRECT_DATABASE_URL explicitly set to the intended direct endpoint. This is a manual migration action, not a Vercel request/startup hook. For the first deployment the provider editor is easier to verify.
4. Copy the production pooled URL for the backend. Preserve TLS query parameters. Neon recommends pooled connections for serverless request workloads; use the direct connection for schema changes. [Neon pooling](https://neon.com/docs/connect/connection-pooling).
5. Keep application and database regions close when supported. Record which integration resource and database branch serve production without recording the password.

## C Deploy FastAPI

1. At the root of your OWN student repository run git status. Confirm that backend/main.py, db.py, models.py, schemas.py, requirements.txt, .python-version and sql files are tracked, while .env and .venv are absent. Commit and push.
2. In Vercel choose Add New → Project, select the intended GitHub account/team and import your repository. If it is missing, adjust the GitHub integration's repository selection through its normal settings.
3. Edit Root Directory to `backend`. Confirm FastAPI detection/preset. The `main.py` file exports `app = FastAPI(...)`, which is a supported entrypoint. Keep Vercel's detected build/install defaults. Do not configure Next.js, a static output folder or an always-running Uvicorn start command for this project. [FastAPI deployment documentation](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel).
4. Connect the Marketplace database integration to this BACKEND project. Check the injected environment variables. Add or correct `DATABASE_URL` to the intended pooled production string, using postgresql:// or postgresql+psycopg://; db.py normalizes the driver. This variable is server-only.
5. Set `CORS_ORIGINS` for the current allowed frontend origins. Initially `http://localhost:3000` allows testing the deployed API from local Next.js later. There are no spaces inside an origin; comma-separated entries are trimmed by the code.
6. The deployment does not need DIRECT_DATABASE_URL because schema application is manual. Keep direct credentials on the teacher's local environment or in a restricted manual migration process. Never expose them through the frontend.
7. Deploy. Read build logs if it fails. Once Ready, copy the STABLE production domain, for example `https://student-course-api.vercel.app`. These names are examples; use the actual domain assigned to your project.
8. Visit `<actual-api-url>/health` and `/docs`. Confirm HTTP 200. A health response proves routing only. Use /docs to create a new student with a unique fictional email, list it, update it and delete it. Confirm it exists after separate requests before deleting it.
9. If you change project environment variables, redeploy the backend so the new configuration is applied. If a database call fails, inspect runtime logs, schema presence, TLS and the selected database; do not “fix” it by removing TLS.

The Vercel Python runtime documentation currently supports 3.12, 3.13 and 3.14. This repository uses `.python-version` = 3.12. Review [runtime support](https://vercel.com/docs/functions/runtimes/python) before changing the version.

## D Deploy Next.js

1. Finish the local integration first. In frontend run npm ci, npm run typecheck and npm run build. Resolve failures before deployment. Commit frontend/package-lock.json as well as package.json.
2. In Vercel create ANOTHER project from the same GitHub repository. Set Root Directory to `frontend`. Confirm the Next.js framework preset and keep its defaults. Never set this project's root to the repository root containing both applications.
3. Add `NEXT_PUBLIC_API_BASE_URL` in the Production environment, using the stable HTTPS backend domain WITHOUT a path such as /docs or /students. Do not put localhost here. No database URL belongs in this project.
4. Deploy, record the stable frontend production origin, and open the home page. The first API requests may fail until the next CORS step; this identifies the remaining configuration task rather than a successful integration.
5. Open the backend project's Production environment variables. Set CORS_ORIGINS to the exact frontend origin, optionally alongside localhost during development. Example: `http://localhost:3000,https://student-course-web.vercel.app`. No trailing slash and no path. Redeploy the backend.
6. Open the deployed frontend in a fresh window. Complete the full smoke workflow below. If the API base URL changes, update the frontend environment variable and REBUILD/REDEPLOY: NEXT_PUBLIC values are embedded in browser bundles during the build. [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).

## E Environment variable checklist

| Variable | Local file | Vercel location | Secret | Purpose |
|---|---|---|---|---|
| DATABASE_URL | backend/.env | backend project, correct Production or Preview scope | yes | pooled PostgreSQL connection |
| DIRECT_DATABASE_URL | backend/.env only for manual migrations | normally not needed by deployed app | yes | direct manual schema connection |
| CORS_ORIGINS | backend/.env | backend project, environment-specific | no | allowed browser origins |
| NEXT_PUBLIC_API_BASE_URL | frontend/.env.local | frontend project, correct environment | no | public API base URL, build-time |
| TEST_DATABASE_URL | test terminal/CI only | not in application deployment | yes outside CI disposable service | isolated test database |
| ALLOW_TEST_DATABASE_RESET | test terminal/CI only | never needed by app | no | explicit permission for test table reset |

`.env.example` files use fake values and are tracked. Real .env files are ignored. Vercel does not obtain your local .env simply because you pushed code. Marketplace variable names can vary; inspect them rather than assuming the old POSTGRES_URL name.

## F CORS and previews

An origin is scheme + hostname + port. http://localhost:3000 differs from http://localhost:3001 and from https://localhost:3000. The CORSMiddleware in main.py allows an explicit list of origins and the methods used by the app. JSON writes may trigger an OPTIONS preflight. The browser checks the returned CORS headers before allowing frontend code to read the response. [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/).

For class preview testing, choose a particular frontend preview URL, add its exact origin to the corresponding NONPRODUCTION backend allowlist and redeploy that backend. Set the frontend Preview API variable to that nonproduction backend. If using one stable preview alias, configure and verify that alias explicitly. Avoid broad `*.vercel.app` allowlists: they can trust unrelated deployments. Remove obsolete preview origins later.

Deployment protection may return an authentication page or 401 instead of API JSON, which can look like CORS failure. Inspect Network before changing CORS. For this fictional unauthenticated demo, use a production API URL accessible to the frontend under the project's intended access policy. Do not ship a protection bypass token in NEXT_PUBLIC configuration. A real protected application needs an intentional authentication/server-proxy architecture beyond this demo. [Vercel deployment protection](https://vercel.com/docs/deployment-protection).

CORS does not stop a nonbrowser caller from writing data. This app has no login. Keep all records fictional; implement authentication and authorization before real school use.

## G Production smoke workflow

1. Load all pages over HTTPS from a fresh browser window. Inspect Network for requests to the intended API origin.
2. Create a uniquely named student and course. Note their returned IDs, not assumed sequential numbers.
3. Enroll that student; refresh; confirm names, date and active status persist. Change status to completed and refresh again.
4. Repeat the same enrollment and observe 409 shown in the UI. Try to delete its course and observe the relationship conflict.
5. Delete the enrollment. Delete the student and course; verify they disappear after refresh. A repeated detail GET should return 404.
6. Check a validation error and a missing-resource response in /docs. Check that an unallowed Origin receives no allow-origin header. CORS and authentication are separate.
7. Record the source commit, both project roots, API URL, frontend URL, database resource/branch names, test results and unresolved limitations. Keep credentials out of this record.

## H Operations and migrations

Check current project limits, plan quotas, runtime duration and database connection limits before class; avoid hardcoding changing free-plan promises. Keep requests short, close sessions and use external persistent storage. Do not rely on local files or Python globals for saved records. Do not run schema migrations inside every cold start or request.

For a schema change, back up data, test the migration on a separate database, apply one reviewed incremental migration, deploy compatible code and smoke-test. A code rollback does not undo a destructive database migration. Practise restores on disposable data before treating a database as important. Provider backup availability depends on the chosen plan.
