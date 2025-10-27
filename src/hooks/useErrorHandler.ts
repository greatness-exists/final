import { useCallback } from 'react';
import { handleApiError } from '@/lib/api-utils';
import { logError, ErrorSeverity, ErrorCategory } from '@/lib/error-logger';

/**
 * Custom hook for consistent error handling across components
 */
export function useErrorHandler() {
  const handleError = useCallback(
    (
      error: unknown,
      options?: {
        message?: string;
        severity?: ErrorSeverity;
        category?: ErrorCategory;
        silent?: boolean;
        context?: Record<string, any>;
      }
    ) => {
      const {
        message,
        severity = ErrorSeverity.MEDIUM,
        category = ErrorCategory.UNKNOWN,
        silent = false,
        context,
      } = options || {};

      // Log the error
      if (error instanceof Error) {
        logError(error, severity, category, context);
      } else {
        logError(String(error), severity, category, context);
      }

      // Show user-friendly message unless silent
      if (!silent) {
        handleApiError(error, message);
      }
    },
    []
  );

  return { handleError };
}
