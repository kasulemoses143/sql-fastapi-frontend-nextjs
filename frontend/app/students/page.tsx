'use client';
import { useEffect, useState, type FormEvent } from 'react';
import type {Student} from '../../lib/types';
import { api } from '../../lib/api';
const emptyForm = { full_name: '', email: '' };
export default function StudentsPage() {
  const [rows, setRows] = useState<Student[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function reload() { setRows(await api<Student[]>('/students')); }
  useEffect(() => {
    let active = true;
    api<Student[]>('/students').then(data => { if (active) setRows(data); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unexpected error'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function save(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await api(editingId ? `/students/${editingId}` : '/students', {
        method: editingId ? 'PUT' : 'POST', body: JSON.stringify(form),
      });
      setForm(emptyForm); setEditingId(null);
      setNotice('Saved.'); await reload();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unexpected error'); } finally { setBusy(false); }
  }
  async function remove(row:Student) {
    if (!window.confirm('Delete this student? Remove related enrollments first.')) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await api(`/students/${row.id}`, {method: 'DELETE'});
      if (editingId === row.id) {setEditingId(null); setForm(emptyForm);}
      setNotice('Deleted.'); await reload();
    } catch (err) { setError(err instanceof Error ? err.message : 'Unexpected error'); } finally { setBusy(false); }
  }
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Students</h1>
    {error && <p className="my-4 rounded-md bg-red-100 p-4 text-red-900" role="alert">{error}</p>}{notice && <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">{notice}</p>}
    <form className="my-6" onSubmit={save}><fieldset className="rounded-lg border border-slate-300 bg-white p-4 sm:p-6" disabled={busy || loading}>
      <legend className="px-2 font-semibold text-slate-800">{editingId ? 'Edit student' : 'Add student'}</legend>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Full name<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" name="full_name" type="text" required
        maxLength={100}
        value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} /></label>
      <label className="my-3 block max-w-xl font-medium text-slate-800">Email<input className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" name="email" type="email" required
        maxLength={254}
        value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></label>
      <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="submit">{busy ? 'Saving…' : 'Save'}</button>
      {editingId && <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" type="button" onClick={() => {setEditingId(null); setForm(emptyForm);}}>Cancel edit</button>}
    </fieldset></form>
    {loading ? <p className="my-4 rounded-md bg-emerald-100 p-3 text-emerald-900" role="status">Loading…</p> : rows.length === 0 ? (error ? <p>Records could not be loaded. Refresh to retry.</p> : <p>No students yet.</p>) :
      <div className="overflow-x-auto rounded-lg border border-slate-300"><table className="w-full border-collapse bg-white text-sm sm:text-base"><caption className="p-3 text-left font-semibold text-slate-800">Students saved in the database</caption>
        <thead className="bg-slate-100"><tr><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">ID</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Full name</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Email</th><th className="border border-slate-300 px-3 py-3 text-left font-semibold" scope="col">Actions</th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.id}><td className="border border-slate-300 px-3 py-3 align-top">{row.id}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.full_name}</td><td className="border border-slate-300 px-3 py-3 align-top">{row.email}</td><td className="border border-slate-300 px-3 py-3 align-top">
          <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" disabled={busy} onClick={() => {setEditingId(row.id); setForm({ full_name: String(row.full_name), email: String(row.email) });}}>Edit</button>
          <button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" disabled={busy} onClick={() => remove(row)}>Delete</button>
        </td></tr>)}</tbody></table></div>}
    <p>Classroom dataset: up to 100 records per list. API pagination is available for larger datasets.</p>
  </>;
}
