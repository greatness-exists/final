import { toast } from 'sonner';

/**
 * API Error Class
 * Extends native Error with additional HTTP-specific properties
 */
export class ApiError extends Error {
  status?: number;
  statusText?: string;
  data?: any;

  constructor(message: string, status?: number, statusText?: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}


/**
 * Retry Configuration
 */
export interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  retryableStatuses?: number[];
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  onRetry: () => {},
};

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Safe fetch wrapper with error handling, retries, and timeout
 * 
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param retryConfig - Retry configuration
 * @returns Promise with response data
 */
export async function safeFetch<T = any>(
  url: string,
  options: RequestInit = {},
  retryConfig: RetryConfig = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          response.statusText,
          errorData
        );
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (error) {
      lastError = error as Error;

      // Don't retry if it's the last attempt
      if (attempt === config.maxRetries) {
        break;
      }

      // Check if error is retryable
      const isRetryable =
        error instanceof ApiError &&
        error.status &&
        config.retryableStatuses.includes(error.status);

      const isNetworkError =
        error instanceof TypeError || // Network failures
        (error as any).name === 'AbortError'; // Timeout

      if (isRetryable || isNetworkError) {
        config.onRetry(attempt + 1, error as Error);
        await sleep(config.retryDelay * (attempt + 1)); // Exponential backoff
        continue;
      }

      // Non-retryable error, throw immediately
      break;
    }
  }

  // All retries exhausted or non-retryable error
  throw lastError;
}

/**
 * Handle API errors with user-friendly messages
 * 
 * @param error - The error to handle
 * @param customMessage - Optional custom error message
 */
export function handleApiError(error: unknown, customMessage?: string): void {
  console.error('API Error:', error);

  let message = customMessage || 'An unexpected error occurred';

  if (error instanceof ApiError) {
    // Use server error message if available
    message = error.message;

    // Add specific handling for common HTTP errors
    switch (error.status) {
      case 400:
        message = customMessage || 'Invalid request. Please check your input.';
        break;
      case 401:
        message = 'You need to be logged in to do that.';
        break;
      case 403:
        message = 'You don\'t have permission to do that.';
        break;
      case 404:
        message = 'The requested resource was not found.';
        break;
      case 429:
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        message = 'Server error. Please try again later.';
        break;
    }
  } else if (error instanceof TypeError) {
    message = 'Network error. Please check your internet connection.';
  } else if ((error as any).name === 'AbortError') {
    message = 'Request timeout. Please try again.';
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null) {
    // Handle plain objects (like EmailJS errors)
    const errorObj = error as any;
    if (errorObj.text) {
      message = errorObj.text;
    } else if (errorObj.message) {
      message = errorObj.message;
    } else if (errorObj.status) {
      message = `Error: ${errorObj.status}`;
    } else {
      message = customMessage || 'An unexpected error occurred';
    }
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message);
}

/**
 * Safe async operation wrapper
 * Catches errors and prevents crashes
 * 
 * @param fn - The async function to execute
 * @param errorHandler - Optional custom error handler
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      handleApiError(error);
    }
    return null;
  }
}

/**
 * Cache for API responses to reduce load and provide offline fallback
 */
const responseCache = new Map<string, { data: any; timestamp: number }>();

/**
 * Get cached data if available and not expired
 * 
 * @param key - Cache key
 * @param maxAge - Maximum age in milliseconds (default: 5 minutes)
 */
export function getCachedData<T>(key: string, maxAge: number = 5 * 60 * 1000): T | null {
  const cached = responseCache.get(key);
  if (!cached) return null;

  const age = Date.now() - cached.timestamp;
  if (age > maxAge) {
    responseCache.delete(key);
    return null;
  }

  return cached.data as T;
}

/**
 * Set cached data
 * 
 * @param key - Cache key
 * @param data - Data to cache
 */
export function setCachedData(key: string, data: any): void {
  responseCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Fetch with caching support
 * 
 * @param url - URL to fetch
 * @param options - Fetch options
 * @param cacheKey - Cache key (optional)
 * @param maxAge - Cache max age in ms (optional)
 */
export async function cachedFetch<T = any>(
  url: string,
  options: RequestInit = {},
  cacheKey?: string,
  maxAge?: number
): Promise<T> {
  const key = cacheKey || url;

  // Try to get from cache first
  const cached = getCachedData<T>(key, maxAge);
  if (cached) {
    return cached;
  }

  try {
    // Fetch fresh data
    const data = await safeFetch<T>(url, options);
    setCachedData(key, data);
    return data;
  } catch (error) {
    // If fetch fails, try to return stale cache as fallback
    const staleCache = responseCache.get(key);
    if (staleCache) {
      console.warn('Using stale cache due to fetch failure');
      toast.info('Showing cached data. You may be offline.');
      return staleCache.data as T;
    }
    throw error;
  }
}