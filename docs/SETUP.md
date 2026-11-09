# Installation and account setup

Complete sections A–D before Lesson 01. Complete E in Lesson 13. Install Node and inspect the TypeScript tooling in Lesson 29; create the Next.js practice files in Lesson 33. The backend sequence comes before frontend teaching.

## A Accounts and tools

You need a computer with a modern browser, an editor such as [Visual Studio Code](https://code.visualstudio.com/download), internet access for package downloads and cloud services, and GitHub and Vercel accounts. Four GB RAM is a practical minimum; eight GB makes running development tools easier. Use the provider SQL editor so a local PostgreSQL installation is not required for the core course.

1. Install VS Code from the official download page for your operating system. Open it once. Choose File → Open Folder to open a project. Choose Terminal → New Terminal to run commands. Save files before running them. Enable visible file extensions in your file manager so `main.py` does not become `main.py.txt`.
2. Create or use your account at [GitHub](https://github.com). Verify your email and enable the account protections recommended by GitHub.
3. Create or use your account at [Vercel](https://vercel.com), signing in with GitHub. Authorize only the course repository when choosing repository access. You will create application projects later.
4. Choose a plan deliberately during provider setup; do not assume every account has identical quotas or that an account can never incur charges. Teacher: check the current plan, limits, required payment method and team access before class. This guide promises no fixed free allowance.

## B Git and the course folder

**Windows:** install Git from [git-scm.com/downloads](https://git-scm.com/downloads). Keep the option allowing Git from the command line. Close and reopen VS Code after installation.

**macOS:** install Git using the official Git download guidance or Apple's command line tools. If `git --version` opens Apple's installation prompt, complete it, then reopen the terminal.

**Ubuntu/Debian:** use the distribution packages: `sudo apt update` then `sudo apt install git python3 python3-venv python3-pip`. Check your Python version before continuing.

In any terminal, run:

```sh
git --version
git clone https://github.com/kasulemoses143/sql-fastapi-frontend-nextjs.git course-reference
cd course-reference
```

Expected: a Git version and a folder containing README.md, docs, backend and frontend. Do not type shell prompt symbols such as `$`. If `git` is unrecognized, reopen the terminal; if it still fails, repair the installation's PATH option. For private repositories, use GitHub's normal browser sign-in when prompted. Do not put tokens in the repository URL.

For your own work, create a new folder named `student-project` BESIDE `course-reference`, then open it in a second VS Code window. Create `backend` inside it. Copy `.gitignore` from the reference root to the student-project root. Initialize version control in the student-project terminal:

```sh
git init
git config user.name "Your Name"
git config user.email "your-verified-or-GitHub-noreply-address"
```

Replace the two example values. Create a new empty personal GitHub repository through GitHub's New repository screen, then use the exact remote URL shown there. Commit only after checking `git status`. To push your first checkpoint:

```sh
git add .
git commit -m "Complete first working checkpoint"
git branch -M main
git remote add origin YOUR_PERSONAL_REPOSITORY_URL
git push -u origin main
```

Replace the URL token with your repository's HTTPS URL. These commands run at student-project root, not inside backend. Subsequent updates use `git add .`, `git commit -m "Describe change"`, `git push`. Never commit `.env`, `.env.local` or `.venv`. A `.env.example` contains names and fake values only. If a secret was pushed, rotate it with the provider immediately; deleting the current file does not remove Git history.

## C Python

Use **Python 3.12** for the course and the same version on Vercel. Existing working Python 3.12 installations do not need replacing. Vercel's checked runtime documentation also lists 3.13 and 3.14, but changing versions requires rechecking the class dependencies. [Runtime documentation](https://vercel.com/docs/functions/runtimes/python).

**Windows:** obtain Python through [python.org/downloads/windows](https://www.python.org/downloads/windows/). With the Python install manager, run `py install 3.12` in a new terminal, then `py -3.12 --version`. If using the traditional installer, choose a supported 3.12 installer, select Add Python to PATH, finish the install and reopen the terminal. Do not download the embeddable distribution for this course. Follow [Python's Windows guidance](https://docs.python.org/3/using/windows.html) if the launcher is missing.

**macOS:** if Python 3.12 is already installed, confirm `python3.12 --version`. Otherwise use [Homebrew](https://brew.sh) from its official site: open Terminal, follow the installation command shown on that site, read its final Next steps and run the exact shell configuration lines it prints. Then run `brew --version` and `brew install python@3.12`. Open a NEW terminal and confirm `python3.12 --version`. If the versioned command is not on PATH, use `$(brew --prefix python@3.12)/bin/python3.12` for the venv command. Do not replace the operating system's Python.

**Ubuntu 24.04:** run `sudo apt update` then `sudo apt install python3.12 python3.12-venv python3-pip git`. Confirm `python3.12 --version`. Other Linux distributions have different package names: use their documented Python 3.12 packages and venv support. Do not replace a system interpreter or assume commands for Ubuntu work on every distribution.

Expected: `Python 3.12.x`. In Python lessons, activate the virtual environment so that the command `python` selects the project interpreter. Do not run `pip` with administrator permissions.

## D Provision PostgreSQL through Vercel Marketplace

A database stores persistent records. PostgreSQL is the database software. Neon is the external provider operating our managed PostgreSQL database; Vercel provides the Marketplace connection and application hosting. Vercel's former first-party Postgres product is no longer offered. [Vercel Postgres status](https://vercel.com/docs/postgres).

1. In Vercel open Marketplace and search Neon, or use [Neon on Vercel Marketplace](https://vercel.com/marketplace/neon). Choose Install, the intended account/team and an appropriate plan. Review any billing terms yourself.
2. Provision the database, choose a nearby supported region and a descriptive resource name such as `student-course-dev`. Record the region for the API deployment.
3. Open the provider dashboard from the integration. Create or select a DEVELOPMENT branch/database. It must contain only practice data. The integration's labels may change; the goal is a distinct development database, not a particular button name.
4. Open its SQL editor, select the intended branch/database and run `SELECT current_database(), current_user, version();`. Expected: one row describing PostgreSQL. Save a screenshot without connection details.
5. Find the provider's Connect screen. Copy the pooled connection string for application requests and the direct string for manual schema scripts. The pooled hostname normally contains `-pooler`. Keep the exact TLS query parameters supplied by the provider, including `sslmode=require` and any `channel_binding` parameter.
6. Later connect this integration resource to the Vercel BACKEND project, and verify which variable names the integration injected. This guide's app reads `DATABASE_URL`; if the provider uses another name, create DATABASE_URL using the intended pooled URL. Do not connect database secrets to the frontend project.

You may use the provider SQL editor throughout the SQL foundation lessons; do not install PostgreSQL locally just to run the first lesson. For an offline class, the teacher can prepare local PostgreSQL, but the deployed application still uses the Marketplace database.

Keep development, automated testing and production data separate. For production create a separate database/branch through this same integration. A preview database or branch is not automatically safe unless its environment mapping has been verified.

## E Python project environment in Lesson 13

Inside `student-project/backend`, copy `requirements.txt`, `requirements-dev.txt`, `.python-version` and `.env.example` from `course-reference/backend`. These are complete reproducible dependency lists; do not replace them with a screenshot or an abbreviated package list.

Windows PowerShell:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
Copy-Item .env.example .env
```

If PowerShell blocks script activation, keep its security policy and call the interpreter directly: `.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt`. Use that full interpreter path for later `python` commands in that terminal, or use Command Prompt with `.venv\Scripts\activate.bat`.

macOS/Linux:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
cp .env.example .env
```

Open `.env` in VS Code. Replace the fake values with DEVELOPMENT connection strings. DATABASE_URL accepts `postgresql://` or `postgresql+psycopg://`; db.py chooses psycopg 3 explicitly. DIRECT_DATABASE_URL must be the plain `postgresql://` direct URL because apply_sql.py uses psycopg directly. Keep passwords URL-encoded exactly as the provider supplies them. Do not hand-edit special characters in a password.

```dotenv
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@POOLED_HOST/DB?sslmode=require
DIRECT_DATABASE_URL=postgresql://USER:PASSWORD@DIRECT_HOST/DB?sslmode=require
CORS_ORIGINS=http://localhost:3000
```

The fake values above will NOT connect: substitute your own provider values. Verify your interpreter with `python -c "import sys; print(sys.executable)"`. Its path should contain `.venv`. Verify packages with `python -m pip check` (expected: no broken requirements). Python does not load `.env` automatically; db.py and apply_sql.py explicitly load it.

After creating db.py and query_demo.py in Lesson 13, run `python query_demo.py`. Expected: Amina's row from the seed. A missing DATABASE_URL means `.env` is absent or misnamed. Authentication errors mean the URL, branch, password or role is wrong. Keep TLS enabled for the provider connection.

## F Node and Next.js in Lesson 33

Install **Node.js 22 or 24 LTS**, matching frontend/package.json. Use [nodejs.org/en/download](https://nodejs.org/en/download) and choose the Windows `.msi` or macOS `.pkg` installer for your processor. Follow its prompts, retain npm and the PATH option, finish and reopen VS Code. Linux users should follow Node's official distribution/version-manager instructions for an LTS version; do not assume an old distribution package meets the requirement.

Run `node --version` and `npm --version`. Expect Node 22.x or 24.x and a numeric npm version. Next.js's documented minimum is 20.9; this course uses a newer LTS. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation).

For the type-along route create `student-project/frontend`. Copy `package.json`, `package-lock.json`, `postcss.config.mjs`, `tsconfig.json` AND `next-env.d.ts` from the reference frontend. Copy `.env.example` to `.env.local`. Run INSIDE frontend:

```sh
npm ci
npm run typecheck
npm run dev
```

Do not start the server until the Lesson 33 app files exist. Open `http://localhost:3000`. Keep this terminal running. In `.env.local`, use `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000` during local integration. Restart the dev server after changing this file.

For a fresh project outside the supplied scaffold, `npx create-next-app@latest frontend` opens a setup wizard. Choose customization, TypeScript Yes, App Router Yes, Tailwind Yes, src directory No, React Compiler No and Cache Components No if offered. These choices keep the course focused. The supplied package files are the reproducible course route; generating with latest may create a different layout and versions.

## G Teacher readiness check

Before class, rehearse from a clean folder and a fresh development database. Verify downloads on the school's network, Python and Node versions, package installation, the provider SQL editor, API docs, GitHub pushes and Vercel imports. Prepare the reference files offline, fictional seed data and a copy of each checkpoint. Do not store class-wide credentials in the notes. Pair students who need installation help and allow a separate setup clinic; do not consume the SQL foundation lessons repairing every laptop.

## H TypeScript foundation practice

Before writing React, open [TypeScript Playground](https://www.typescriptlang.org/play), choose a blank example and use strict checking. Type the examples from Lessons 25–30, read type errors, then Run and inspect Logs. Save study examples as .ts. Normal browser consoles execute JavaScript and do not accept TypeScript annotations.

For local checking use the supplied frontend package: npm ci installs the pinned TypeScript compiler and React/Node type packages. npm run typecheck runs tsc --noEmit. The .tsx extension is required for typed files containing JSX; .ts is used for plain typed modules such as lib/api.ts. Types do not validate remote data at runtime. Next.js compiles source and includes type checks in its build. See the official [React TypeScript guide](https://react.dev/learn/typescript).

## I Tailwind integration in Next.js

The course uses Tailwind 4 and the official Next.js PostCSS integration. The package lock already includes tailwindcss, @tailwindcss/postcss and postcss, so npm ci is the normal learner installation command. Copy postcss.config.mjs with the other frontend configuration files. In app/globals.css the only authored entry is `@import "tailwindcss";`, imported by app/layout.tsx. This is Tailwind's build entry, not a custom stylesheet exercise.

For a new project without the supplied lockfile, run `npm install -D tailwindcss @tailwindcss/postcss postcss` inside frontend, create postcss.config.mjs using the complete file in Lesson 33, add the Tailwind import and restart the dev server. Tailwind 4 does not require the old three @tailwind directives or a generated tailwind.config.js for this app. Do not mix instructions for older Tailwind versions. Follow [the official Next.js Tailwind guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

All styling in TSX uses className utilities. If the page renders unstyled, confirm the packages, PostCSS file, Tailwind entry import and root layout import, then restart/rebuild. See [TAILWIND.md](TAILWIND.md).
