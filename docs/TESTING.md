# Verify the application

## API regression tests

Activate backend/.venv and run commands from backend:

```sh
python -m pip install -r requirements-dev.txt
python -m pytest -q
```

Expected: six tests pass. They cover CRUD, normalization, validation, missing resources, pagination, duplicate recovery, relationships, joined labels and CORS headers. Local default tests use an isolated in-memory SQLite database with foreign keys enabled. They do not connect to DATABASE_URL. This gives fast feedback on route behavior but does not establish PostgreSQL equivalence.

## PostgreSQL verification

Create a SEPARATE DISPOSABLE database/branch through the same Marketplace provider. Never use production or your valuable development data. The fixture drops and recreates the three course tables for isolation. Explicit reset authorization is required. It applies the handwritten PostgreSQL schema, so the routes are checked against the same structure used in deployment.

In macOS/Linux, replace the connection string with your disposable test URL:

```sh
export TEST_DATABASE_URL='postgresql+psycopg://USER:PASSWORD@TEST_HOST/TEST_DB?sslmode=require'
export ALLOW_TEST_DATABASE_RESET=yes
python -m pytest -q
unset TEST_DATABASE_URL
unset ALLOW_TEST_DATABASE_RESET
```

Windows PowerShell:

```powershell
$env:TEST_DATABASE_URL='postgresql+psycopg://USER:PASSWORD@TEST_HOST/TEST_DB?sslmode=require'
$env:ALLOW_TEST_DATABASE_RESET='yes'
python -m pytest -q
Remove-Item Env:TEST_DATABASE_URL
Remove-Item Env:ALLOW_TEST_DATABASE_RESET
```

Do not copy the fake URL literally. Keep any additional TLS parameters from your provider. Recheck the target branch before setting the reset flag. Expected: six passing tests against PostgreSQL. A missing reset flag deliberately stops the run.

The GitHub Actions workflow provisions an ephemeral PostgreSQL 17 service, applies schema, seed and practice SQL, and then runs API tests using the handwritten schema. It also builds Next.js separately. Open your repository's Actions tab, select Check course application, and inspect both jobs. A committed workflow is not proof it passed: record the actual run result. GitHub may require an explicit Actions enablement in a fork.

## Schema and model agreement

Compare models.py with 001_schema.sql for table names, columns, nullability, string lengths, checks, unique constraints, foreign keys, delete policy and defaults. The Python model's generated primary key maps to the existing PostgreSQL identity; it does not recreate it on import. Changes to model annotations alone do not alter deployed tables. Test SQL changes on a fresh database and through the actual API.

## Frontend checks

Inside frontend, run `npm ci`, `npm run typecheck` then `npm run build`. This verifies dependency installation, syntax, imports and production compilation. It does not exercise real browser writes or prove API configuration. `npm start` serves the resulting production build for a local rehearsal; rebuild after changing public environment variables.

## Manual acceptance matrix

| Action | Expected evidence |
|---|---|
| Empty lists | Clear empty message, no crash |
| Load records | Loading state followed by saved data |
| Add student/course | Success message, row visible, persists after refresh |
| Edit student/course | All editable fields sent; updated data persists |
| Duplicate email/code/pair | Visible 409 error, controls recover |
| Invalid email/credits/status | Browser or API validation; no invalid stored row |
| Enroll with valid IDs | Joined names and course code, active status and date |
| Change status | Correct PATCH, response 200, persists |
| Delete referenced parent | 409, parent remains |
| Delete relationship then parent | 204 responses, rows absent |
| Stop local API and refresh | Visible error, no false success |
| Wrong frontend API URL | Network failure visible, diagnosable |
| Allowed CORS origin | OPTIONS and write succeed with matching allow-origin |
| Unallowed CORS origin | No matching allow-origin header |
| Keyboard only | Reach inputs/buttons, visible focus, submit/cancel work |
| Narrow screen | Readable content and horizontal table scroll |
| Fresh deployed browser window | Same workflow works without provider dashboard session |

Record test name, environment, commit, expected/actual result and fix. Automated checks should assert behavior rather than merely repeat implementation details. Add a regression test when fixing a meaningful bug. Optional next step: browser automation for the entire create → enroll → change → remove flow, with isolated fixture data.
