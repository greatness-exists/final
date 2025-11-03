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
        // Handle EmailJS and other error objects properly
        let error: Error;
        
        if (err instanceof Error) {
          error = err;
        } else if (typeof err === 'object' && err !== null) {
          // Handle error objects (like EmailJS errors) without stringifying them
          const errorObj = err as any;
          const message = errorObj.text || errorObj.message || options?.errorMessage || 'An error occurred';
          error = new Error(message);
          // Preserve the original error object for detailed handling
          (error as any).originalError = err;
        } else {
          error = new Error(String(err));
        }
        
        setError(error);
        
        // Pass the original error object if it exists, otherwise pass the Error
        const errorToHandle = (error as any).originalError || error;
        handleError(errorToHandle, { message: options?.errorMessage });
        
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