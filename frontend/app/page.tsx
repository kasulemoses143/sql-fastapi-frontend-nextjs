import Link from 'next/link';
export default function HomePage() {
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Student Course Manager</h1>
    <p>Use fictional records to practise managing students, courses, and enrollments.</p>
    <ol className="my-4 list-inside list-decimal space-y-2"><li><Link className="font-medium text-sky-800 underline underline-offset-4" href="/students">Create students</Link></li>
      <li><Link className="font-medium text-sky-800 underline underline-offset-4" href="/courses">Create courses</Link></li>
      <li><Link className="font-medium text-sky-800 underline underline-offset-4" href="/enrollments">Enroll a student in a course</Link></li></ol>
    <p>This teaching demo has no login. Do not enter real student information.</p>
  </>;
}
