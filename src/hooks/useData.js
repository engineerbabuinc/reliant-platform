import { useState, useEffect, useCallback } from 'react';

export function useData(fetcher) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load, setData };
}
