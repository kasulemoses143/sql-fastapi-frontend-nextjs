'use client';
import { useEffect, useState, type FormEvent } from 'react';
import type {Course} from '../../lib/types';
import { api } from '../../lib/api';
const emptyForm = { code: '', title: '', credits: '' };
export default function CoursesPage() {
  const [rows, setRows] = useState<Course[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function reload() { setRows(await api<Course[]>('/courses')); }
  useEffect(() => {
    let active = true;
    api<Course[]>('/courses').then(data => { if (active) setRows(data); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unexpected error'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function save(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await api(editingId ? `/courses/${editingId}` : '/courses', {
        method: editingId ? 'PUT' : 'POST', body: JSON.stringify({ ...form, credits: Number(form.credits) }),
      });
      setForm(emptyForm); setEditingId(null);
      setNotice('Saved.'); await reload();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unexpected error'); } finally { setBusy(false); }
  }
  async function remove(row:Course) {
    if (!window.confirm('Delete this course? Remove related enrollments first.')) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await api(`/courses/${row.id}`, {method: 'DELETE'});
      if (editingId === row.id) {setEditingId(null); setForm(emptyForm);}
      setNotice('Deleted.'); await reload();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unexpected error'); } finally { setBusy(false); }
  }
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Courses</h1>
    {error && <p className="my-4 rounded-md bg-red-100 p-4 text-red-900" role="alert">{error}</p>}{notice && <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">{notice}</p>}
    <form className="my-6" onSubmit={save}><fieldset className="rounded-lg border border-slate-300 bg-white p-4 sm:p-6" disabled={busy || loading}>
      <legend className="px-2 font-semibold text-slate-800">{editingId ? 'Edit course' : 'Add course'}</legend>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Code<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" name="code" type="text" required
        maxLength={20}
        value={form.code} onChange={e => setForm({...form, code: e.target.value})} /></label>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Title<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" name="title" type="text" required
        maxLength={120}
        value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></label>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Credits<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" name="credits" type="number" required
        min="1" max="6" step="1"
        value={form.credits} onChange={e => setForm({...form, credits: e.target.value})} /></label>
      <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="submit">{busy ? 'Saving…' : 'Save'}</button>
      {editingId && <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="button" onClick={() => {setEditingId(null); setForm(emptyForm);}}>Cancel edit</button>}
    </fieldset></form>
    {loading ? <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">Loading…</p> : rows.length === 0 ? (error ? <p>Records could not be loaded. Refresh to retry.</p> : <p>No courses yet.</p>) :
      <div className="overflow-x-auto rounded-lg border border-slate-300"><table className="w-full border-collapse bg-white text-sm sm:text-base"><caption className="p-3 text-left font-semibold text-slate-800">Courses saved in the database</caption>
        <thead className="bg-slate-100"><tr><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">ID</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Code</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Title</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Credits</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Actions</th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}><td className="border border-slate-300 px-3 py-3 align-top">{row.id}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.code}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.title}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.credits}</td><td className="border border-slate-300 px-3 py-3 align-top">
          <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" disabled={busy} onClick={() => {setEditingId(row.id); setForm({ code: String(row.code), title: String(row.title), credits: String(row.credits) });}}>Edit</button>
          <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" disabled={busy} onClick={() => remove(row)}>Delete</button>
        </td></tr>)}</tbody></table></div>}
    <p>Classroom dataset: up to 100 records per list. API pagination is available for larger datasets.</p>
  </>;
}
