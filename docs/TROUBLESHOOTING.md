# Troubleshooting by symptom

Work from the first failing layer: installation → process → route → configuration → database → browser policy → UI. Preserve the actual error, but remove passwords before sharing it.

| Symptom | First check | Fix or next evidence |
|---|---|---|
| git/python/node unrecognized | New terminal and installation PATH | Reopen editor; use exact Python launcher; verify version |
| Python imports missing | sys.executable points at .venv | Activate correct environment; python -m pip install -r requirements-dev.txt |
| PowerShell activation blocked | Activation policy | Use .venv\Scripts\python.exe directly; no policy weakening required |
| Can't import main | Current folder and filename | Run Uvicorn inside backend; file is main.py, not main.py.txt |
| Port already in use | Another dev server terminal | Stop that server; or choose another port and update frontend/CORS consistently |
| DATABASE_URL KeyError | backend/.env name and location | Copy .env.example to .env, fill actual values; restart process |
| Invalid SQLAlchemy driver | URL scheme and installed package | Use postgresql+psycopg; db.py normalizes provider postgresql URLs |
| Raw psycopg rejects URL | DIRECT_DATABASE_URL scheme | Use plain postgresql:// with direct hostname |
| Password/SSL connection error | Provider branch, role, exact URL | Copy the current provider string; preserve TLS; never print URL |
| Relation does not exist | Selected database and initial schema | Apply 001 once to intended fresh database; do not seed before schema |
| Relation already exists | Initial schema rerun | Do not rerun 001; use a new development database or a reviewed migration |
| Current transaction aborted | Earlier SQL statement error | ROLLBACK, fix the first statement, retry intentionally |
| 422 from API | Response detail and JSON types | Check required keys, integer values, email format and ranges |
| 409 from API | Duplicate or referenced parent | Choose unique values or remove enrollment before deleting parent |
| 404 from API | Exact path and actual returned id | No /api prefix; root paths are /students etc.; id may have gaps |
| Connection refused | Uvicorn or Next.js stopped | Start correct process; leave its terminal open |
| Frontend request is CORS blocked | Origin, OPTIONS response, API logs | Add exact frontend origin to backend allowlist, redeploy/restart |
| /docs works but UI fails | Network URL and response | Verify frontend base URL and CORS; /docs uses the API origin |
| Preview API returns login page | Deployment protection | Use intended accessible API deployment; no public bypass secrets |
| Frontend still uses old URL | Public variable was built earlier | Restart dev server or rebuild/redeploy production |
| Unexpected end of JSON on delete | 204 body is empty | Use api.ts handling; do not parse JSON after 204 |
| Form refreshes entire page | onSubmit handler | Call event.preventDefault; buttons that don't submit use type=button |
| React UI does not update | Direct array mutation | Set a new array/object using state setter |
| Infinite React renders | Setter invoked during render | Pass a function to handlers; review effect dependencies |
| Duplicate development GETs | Strict Mode effect behavior | Keep initial effects read-only and clean up; don't place POST in mount effect |
| Dropdown misses a new parent | Options loaded at page mount | Refresh enrollment page after adding records elsewhere |
| Only 100 rows display | Classroom list limit | Use limit/offset API and implement pagination for larger data |
| Vercel detects wrong framework | Project root | backend → FastAPI; frontend → Next.js; check dependency file |
| Build passes but deployed writes fail | Runtime logs and environment scope | Check DB URL, schema, TLS and frontend Production URL |
| Data disappears after restart | Temporary local React state or Python list | Use persistent PostgreSQL routes; do not confuse training stage with final app |

## A repeatable debugging routine

State the exact action and expected result. Find the actual request in the browser Network panel. Record method, URL, payload, status and response. A missing network request usually means the UI handler did not run; a failed network connection means the process/URL is wrong; a 4xx response points to input or access rules; a 5xx response needs backend logs. Check the database row with SELECT when needed. Change one cause at a time and rerun the same case.

## Recovery without losing work

Commit or copy your current project first. Generate a new checkpoint folder using scripts/checkpoint.py; never overwrite your only copy. Compare one file at a time. Checkpoints contain code only, so create the required environment files, install dependencies and use an appropriate fresh development database. Do not reset an existing database just because the reference code differs.
