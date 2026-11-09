type ValidationIssue = {loc:(string | number)[]; msg:string};
type ApiError = {detail?:string | ValidationIssue[]};
const base = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function api<T = void>(path:string, options:RequestInit = {}):Promise<T> {
  if (!base) throw new Error('Set NEXT_PUBLIC_API_BASE_URL and restart or rebuild the frontend.');
  const response = await fetch(`${base.replace(/\/$/, '')}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
    cache: 'no-store',
  });
  if (!response.ok) {
    const body:ApiError = await response.json().catch(() => ({}));
    const detail = Array.isArray(body.detail)
      ? body.detail.map(item => `${item.loc.join('.')}: ${item.msg}`).join('; ')
      : body.detail;
    throw new Error(detail || `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
