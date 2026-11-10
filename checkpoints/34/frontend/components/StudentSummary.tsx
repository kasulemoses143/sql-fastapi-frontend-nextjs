type Props = {name:string; enrolled:boolean};
export default function StudentSummary({name, enrolled}:Props) {
  return <article className="my-4 rounded-lg border border-slate-300 bg-white p-5"><h2 className="mb-3 text-xl font-semibold text-slate-900">{name}</h2><p>{enrolled ? 'Enrolled' : 'No enrollment yet'}</p></article>;
}
