# Official documentation and implementation choices

These sources support the platform guidance. Recheck the linked pages before teaching a deployment because provider interfaces and supported runtimes can change. Course examples and sequencing are teaching choices; they are not claims that a vendor requires this curriculum.

| Source | What to verify |
|---|---|
| [Vercel FastAPI framework guide](https://vercel.com/docs/frameworks/backend/fastapi) | Supported app entrypoints, framework detection and Vercel Function deployment |
| [Vercel FastAPI deployment walkthrough](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) | Git import and local/deployed application setup |
| [Vercel Python runtime](https://vercel.com/docs/functions/runtimes/python) | Python versions, dependencies and function behavior |
| [Postgres on Vercel](https://vercel.com/docs/postgres) | Discontinued former Postgres product and external Marketplace integrations |
| [Vercel Marketplace storage](https://vercel.com/docs/marketplace-storage) | Provider provisioning and injected configuration |
| [Neon Marketplace listing](https://vercel.com/marketplace/neon) | External Neon integration and provider-specific features |
| [Neon SQLAlchemy connection guide](https://neon.com/docs/guides/sqlalchemy) | psycopg 3, explicit driver URLs and TLS |
| [Neon connection pooling](https://neon.com/docs/connect/connection-pooling) | Pooled serverless connections and direct schema connections |
| [PostgreSQL foreign keys](https://www.postgresql.org/docs/current/tutorial-fk.html) | Database-enforced referential integrity |
| [SQLAlchemy PostgreSQL dialect](https://docs.sqlalchemy.org/en/20/dialects/postgresql.html) | Driver and PostgreSQL integration behavior |
| [FastAPI relational databases](https://fastapi.tiangolo.com/tutorial/sql-databases/) | Database integration patterns and request-scoped sessions |
| [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/) | Origins, middleware and preflight behavior |
| [FastAPI testing](https://fastapi.tiangolo.com/tutorial/testing/) | TestClient-based API tests |
| [TypeScript for new programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) | Language foundations and relationship to JavaScript |
| [TypeScript Playground](https://www.typescriptlang.org/play) | Browser-based typed examples and checking |
| [React with TypeScript](https://react.dev/learn/typescript) | Typed props/hooks/events and TSX extension |
| [Thinking in React](https://react.dev/learn/thinking-in-react) | Components, state and data flow |
| [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) | Node requirements, App Router and scaffold choices |
| [Next.js TypeScript configuration](https://nextjs.org/docs/app/api-reference/config/typescript) | Built-in TS support and compiler configuration |
| [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables) | NEXT_PUBLIC exposure and build-time substitution |
| [Vercel monorepos](https://vercel.com/docs/monorepos) | Separate project roots from one repository |
| [Vercel deployment protection](https://vercel.com/docs/deployment-protection) | Access policy and protected deployment behavior |
| [Python on Windows](https://docs.python.org/3/using/windows.html) | Python installation and launchers |
| [Node downloads](https://nodejs.org/en/download) | Supported Node LTS installation |

## Choices made for this course

The backend uses SQLAlchemy 2-style mappings and Pydantic 2 directly. FastAPI's introductory database tutorial uses SQLModel, but it does not require that ORM. We use handwritten PostgreSQL DDL before ORM mapping so the learner understands the relational database rather than treating Python classes as a substitute for SQL.

The backend uses normal def routes with synchronous psycopg/SQLAlchemy and one session per request. NullPool plus a provider-pooled URL is a small-serverless-workload teaching design. The direct endpoint is used for explicit manual schema work. These choices should be re-evaluated for high traffic or different transaction needs.

The frontend uses strict TypeScript and TSX, with type definitions for API records, props, form events and state. TypeScript describes expected shapes at compile time; the API remains responsible for runtime request/response validation. The complete app uses no any-based state shortcuts.

The course uses two Vercel application projects, not another application host. Neon is the database operator. Vercel Marketplace may provision and bill the integration, but that does not make PostgreSQL a Vercel-operated first-party database. Labels in a provider dashboard may evolve; teach the connection, database target and environment mapping explicitly.

## Dependency policy

The reference frontend records exact Next.js, React, TypeScript and type-package versions in package.json/package-lock.json. Python requirements files pin the resolved packages. Learners install those files with npm ci or python -m pip install -r. Updating to latest is a deliberate maintenance task requiring a fresh typecheck, build, API regression and deployment rehearsal; do not update mid-example without rechecking the notes.

## Tailwind sources

The frontend styling uses Tailwind 4 with the Next.js PostCSS integration. The app entry stylesheet only imports Tailwind; utility classes supply the authored styling. Check [Next.js installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [responsive design](https://tailwindcss.com/docs/responsive-design) and [interactive variants](https://tailwindcss.com/docs/hover-focus-and-other-states) for the current syntax. The course does not use Tailwind 3 configuration/init instructions.
