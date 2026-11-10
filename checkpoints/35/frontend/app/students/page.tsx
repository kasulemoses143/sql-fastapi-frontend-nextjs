'use client';
import {useState} from 'react';
type Student = {id:number; full_name:string; email:string};
type Props = {student:Student; onRemove:(id:number) => void};
function StudentCard({student, onRemove}:Props) {
  return <article className="my-4 rounded-lg border border-slate-300 bg-white p-5"><h2 className="mb-3 text-xl font-semibold text-slate-900">{student.full_name}</h2>
    <p>{student.email}</p><button className="mr-2 my-1 cursor-pointer rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50" onClick={() => onRemove(student.id)}>Remove</button></article>;
}
export default function StudentsPage() {
  const [rows, setRows] = useState<Student[]>([
    {id:1, full_name:'Amina Demo', email:'amina@example.com'},
    {id:2, full_name:'Brian Demo', email:'brian@example.com'},
  ]);
  function remove(id:number) {setRows(current => current.filter(row => row.id !== id));}
  return <><h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900">Students</h1>{rows.map(row =>
    <StudentCard key={row.id} student={row} onRemove={remove} />)}</>;
}
