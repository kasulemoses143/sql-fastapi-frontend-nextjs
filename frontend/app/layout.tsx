import type {ReactNode} from 'react';
import Link from 'next/link';
import './globals.css';
export const metadata = { title: 'Student Course Manager', description: 'A classroom full-stack project' };
export default function RootLayout({ children }:{children:ReactNode}) {
  return <html lang="en"><body className="min-h-screen bg-slate-50 font-sans leading-relaxed text-slate-800">
    <header className="bg-slate-900 px-4 py-5 text-white"><nav className="mx-auto flex max-w-5xl flex-wrap gap-5 [&_a]:rounded [&_a]:px-1 [&_a]:py-2 [&_a:hover]:underline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-amber-400" aria-label="Main navigation">
      <Link href="/">Home</Link><Link href="/students">Students</Link>
      <Link href="/courses">Courses</Link><Link href="/enrollments">Enrollments</Link>
    </nav></header><main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
  </body></html>;
}
