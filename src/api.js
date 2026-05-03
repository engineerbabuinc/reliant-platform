const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '');

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} → ${res.status}: ${msg}`);
  }
  return res.json();
}

export const api = {
  pipeline: {
    list:         ()        => req('/api/pipeline'),
    update:       (stage, d)=> req(`/api/pipeline/${encodeURIComponent(stage)}`, { method:'PUT', body:JSON.stringify(d) }),
  },
  deals: {
    list:         (qs='')   => req('/api/deals' + qs),
    get:          (id)      => req(`/api/deals/${id}`),
    create:       (d)       => req('/api/deals',      { method:'POST', body:JSON.stringify(d) }),
    update:       (id, d)   => req(`/api/deals/${id}`, { method:'PUT',  body:JSON.stringify(d) }),
    remove:       (id)      => req(`/api/deals/${id}`, { method:'DELETE' }),
  },
  issues: {
    list:         (qs='')   => req('/api/issues' + qs),
    get:          (id)      => req(`/api/issues/${id}`),
    create:       (d)       => req('/api/issues',      { method:'POST', body:JSON.stringify(d) }),
    update:       (id, d)   => req(`/api/issues/${id}`, { method:'PUT',  body:JSON.stringify(d) }),
    addComment:   (id, d)   => req(`/api/issues/${id}/comments`, { method:'POST', body:JSON.stringify(d) }),
  },
  team: {
    list:         ()        => req('/api/team'),
    create:       (d)       => req('/api/team',        { method:'POST', body:JSON.stringify(d) }),
    update:       (id, d)   => req(`/api/team/${id}`,   { method:'PUT',  body:JSON.stringify(d) }),
    remove:       (id)      => req(`/api/team/${id}`,   { method:'DELETE' }),
  },
  landParcels: {
    list:         ()        => req('/api/land-parcels'),
    create:       (d)       => req('/api/land-parcels',      { method:'POST', body:JSON.stringify(d) }),
    update:       (id, d)   => req(`/api/land-parcels/${id}`, { method:'PUT',  body:JSON.stringify(d) }),
    remove:       (id)      => req(`/api/land-parcels/${id}`, { method:'DELETE' }),
  },
  notifications: {
    list:         ()        => req('/api/notifications'),
    create:       (d)       => req('/api/notifications', { method:'POST', body:JSON.stringify(d) }),
  },
};
