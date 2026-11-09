'use client';
import {useEffect, useState, type FormEvent} from 'react';
import type {Student, Course, EnrollmentDetail} from '../../lib/types';
import {api} from '../../lib/api';
export default function EnrollmentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [rows, setRows] = useState<EnrollmentDetail[]>([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function reload() {setRows(await api<EnrollmentDetail[]>('/enrollments'));}
  useEffect(() => {
    let active = true;
    Promise.all([api<Student[]>('/students'), api<Course[]>('/courses'), api<EnrollmentDetail[]>('/enrollments')])
      .then(([s,c,e]) => {if (active) {setStudents(s); setCourses(c); setRows(e);}})
      .catch(err => {if (active) setError(err instanceof Error ? err.message : 'Unexpected error');})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, []);
  async function mutate(path:string, options:RequestInit) {
    setBusy(true); setError(''); setNotice('');
    try {await api(path, options); setNotice('Saved.'); await reload();}
    catch (err) {setError(err instanceof Error ? err.message : 'Unexpected error');} finally {setBusy(false);}
  }
  async function enroll(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutate('/enrollments', {method:'POST', body:JSON.stringify({
      student_id:Number(studentId), course_id:Number(courseId),
    })});
  }
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Enrollments</h1>
    {error && <p className="my-4 rounded-md bg-red-100 p-4 text-red-900" role="alert">{error}</p>}{notice && <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">{notice}</p>}
    {loading ? <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">Loading…</p> : error && rows.length === 0 && students.length === 0 ? <p>Records could not be loaded. Refresh to retry.</p> : <>
    {students.length === 0 || courses.length === 0 ? <p>Create at least one student and one course first.</p> :
      <form className="my-6" onSubmit={enroll}><fieldset className="rounded-lg border border-slate-300 bg-white p-4 sm:p-6" disabled={busy}><legend className="px-2 font-semibold text-slate-800">Enroll a student</legend>
        <label className="my-3 block max-w-xl font-medium text-slate-800">Student<select className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" required value={studentId} onChange={e => setStudentId(e.target.value)}>
          <option value="">Choose a student</option>{students.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
        </select></label>
        <label className="my-3 block max-w-xl font-medium text-slate-800">Course<select className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" required value={courseId} onChange={e => setCourseId(e.target.value)}>
          <option value="">Choose a course</option>{courses.map(c => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
        </select></label><button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="submit">{busy ? 'Saving…' : 'Enroll'}</button>
      </fieldset></form>}
    {rows.length === 0 ? <p>No enrollments yet.</p> : <div className="overflow-x-auto rounded-lg border border-slate-300"><table className="w-full border-collapse bg-white text-sm sm:text-base">
      <caption className="p-3 text-left font-semibold text-slate-800">Student course enrollments</caption><thead className="bg-slate-100"><tr><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Student</th>
        <th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Course</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Date</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Status</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Action</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}><td className="border border-slate-300 px-3 py-3 align-top">{row.student_name}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.course_code}</td>
        <td className="border border-slate-300 px-3 py-3 align-top">{row.enrolled_on}</td><td className="border border-slate-300 px-3 py-3 align-top"><select className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" aria-label={`Status for ${row.student_name} in ${row.course_code}`}
          disabled={busy} value={row.status} onChange={e => mutate(`/enrollments/${row.id}`, {
            method:'PATCH', body:JSON.stringify({status:e.target.value}),
          })}><option value="active">Active</option><option value="completed">Completed</option>
          <option value="withdrawn">Withdrawn</option></select></td>
        <td className="border border-slate-300 px-3 py-3 align-top"><button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" disabled={busy} onClick={() => {
          if (window.confirm('Delete this enrollment?')) mutate(`/enrollments/${row.id}`, {method:'DELETE'});
        }}>Delete</button></td></tr>)}</tbody></table></div>}
    </>}
    <p>Classroom dataset: up to 100 records per list. Refresh this page after adding students or courses elsewhere.</p>
  </>;
}
