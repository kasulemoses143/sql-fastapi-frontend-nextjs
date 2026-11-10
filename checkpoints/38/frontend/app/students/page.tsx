'use client';
import {useState, type FormEvent} from 'react';
type Student = {id:string; full_name:string; email:string};
export default function StudentsPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState<Student[]>([]);
  const [error, setError] = useState('');
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName.trim()) {setError('Enter a full name.'); return;}
    setRows(current => [...current, {id:crypto.randomUUID(), full_name:fullName.trim(), email}]);
    setFullName(''); setEmail(''); setError('');
  }
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Students</h1>{error && <p className="my-4 rounded-md bg-red-100 p-4 text-red-900" role="alert">{error}</p>}
    <form className="my-6" onSubmit={submit}>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Full name<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" required value={fullName} onChange={e => setFullName(e.target.value)} /></label>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Email<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" required type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="submit">Add locally</button>
    </form><ul className="my-4 list-inside list-disc space-y-2">{rows.map(row => <li key={row.id}>{row.full_name} — {row.email}</li>)}</ul>
  </>;
}
