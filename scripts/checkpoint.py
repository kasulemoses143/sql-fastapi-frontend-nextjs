"""Create a NEW practice folder through a named lesson; never overwrite work."""
import shutil
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
VALID = {15,16,18,20,22,24,33,34,35,38,41,42,44,46,47,48}
if len(sys.argv) != 3:
    raise SystemExit('Usage: python scripts/checkpoint.py LESSON NEW_DESTINATION')
number = int(sys.argv[1])
if number not in VALID:
    raise SystemExit(f'Available checkpoints: {sorted(VALID)}')
target = Path(sys.argv[2]).resolve()
if target.exists():
    raise SystemExit('Destination exists. Choose a NEW folder; your work will not be overwritten.')
target.mkdir(parents=True)
def copy(relative, source=None):
    out = target / relative
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / (source or relative), out)
copy('.gitignore')
for name in ('requirements.txt','requirements-dev.txt','.env.example','.python-version','apply_sql.py'):
    copy('backend/' + name)
for path in (ROOT/'backend/sql').glob('*.sql'):
    copy('backend/sql/' + path.name)
if number < 18:
    copy('backend/main.py',f'checkpoints/{number}/backend/main.py')
else:
    for name in ('db.py','models.py','schemas.py','query_demo.py'):
        copy('backend/'+name)
    copy('backend/main.py',f'checkpoints/{number}/backend/main.py' if number in (18,20) else None)
    if number >= 22:
        for path in (ROOT/'backend/tests').glob('*.py'):
            copy('backend/tests/'+path.name)
if number >= 33:
    for name in ('package.json','package-lock.json','postcss.config.mjs','tsconfig.json','next-env.d.ts','.env.example','app/layout.tsx','app/page.tsx','app/globals.css'):
        copy('frontend/'+name)
    for name in ('students','courses','enrollments'):
        out = target / f'frontend/app/{name}/page.tsx'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(f'export default function Page() {{return <h1>{name.title()}</h1>;}}\n')
    if number == 34:
        copy('frontend/components/StudentSummary.tsx','checkpoints/34/frontend/components/StudentSummary.tsx')
        copy('frontend/app/students/page.tsx','checkpoints/34/frontend/app/students/page.tsx')
    if 35 <= number < 38:
        copy('frontend/app/students/page.tsx','checkpoints/35/frontend/app/students/page.tsx')
    if 38 <= number < 41:
        copy('frontend/app/students/page.tsx','checkpoints/38/frontend/app/students/page.tsx')
    if number >= 41:
        copy('frontend/lib/types.ts')
        copy('frontend/lib/api.ts')
        copy('frontend/app/students/page.tsx')
    if number >= 42:
        copy('frontend/app/courses/page.tsx')
    if number >= 44:
        copy('frontend/app/enrollments/page.tsx')
print(f'Created Lesson {number:02d} code at {target}')
print('Create .env files, install dependencies and configure an appropriate DEVELOPMENT database before running.')
