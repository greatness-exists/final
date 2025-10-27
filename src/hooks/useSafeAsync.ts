import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';

/**
 * Safe async operation hook with loading and error states
 */
export function useSafeAsync<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { handleError } = useErrorHandler();

  const execute = useCallback(
    async (
      asyncFn: () => Promise<T>,
      options?: {
        errorMessage?: string;
        onSuccess?: (data: T) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFn();
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        handleError(error, { message: options?.errorMessage });
        options?.onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [handleError]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
}
