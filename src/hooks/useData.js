import { useEffect, useState } from "react";

/**
 * Hook genérico para cargar datos desde un fetcher.
 * @param {Function} fetcher Función async que retorna datos.
 * @param {Array} deps Dependencias para recargar datos.
 */
export function useData(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error };
}
