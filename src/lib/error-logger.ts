/**
 * Error Logging Utility
 * Centralized error logging with categorization and severity levels
 */

export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type ErrorSeverity = typeof ErrorSeverity[keyof typeof ErrorSeverity];

export const ErrorCategory = {
  NETWORK: 'network',
  API: 'api',
  VALIDATION: 'validation',
  RENDER: 'render',
  AUTH: 'auth',
  UNKNOWN: 'unknown',
} as const;

export type ErrorCategory = typeof ErrorCategory[keyof typeof ErrorCategory];

export interface ErrorLog {
  id: string;
  timestamp: number;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs: number = 100;

  /**
   * Log an error with context
   */
  log(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    context?: Record<string, any>
  ): void {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'object' ? error.stack : undefined,
      severity,
      category,
      context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    this.logs.push(errorLog);

    // Keep only recent logs to prevent memory leaks
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output with formatting
    this.consoleLog(errorLog);

    // In production, you would send critical errors to a monitoring service
    if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH) {
      this.sendToMonitoring(errorLog);
    }
  }

  /**
   * Get all logged errors
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Get logs by severity
   */
  getLogsBySeverity(severity: ErrorSeverity): ErrorLog[] {
    return this.logs.filter(log => log.severity === severity);
  }

  /**
   * Get logs by category
   */
  getLogsByCategory(category: ErrorCategory): ErrorLog[] {
    return this.logs.filter(log => log.category === category);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Generate unique ID for error log
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Format and output to console
   */
  private consoleLog(log: ErrorLog): void {
    const color = this.getSeverityColor(log.severity);
    const prefix = `[${log.category.toUpperCase()}] [${log.severity.toUpperCase()}]`;

    console.group(`%c${prefix}`, `color: ${color}; font-weight: bold;`);
    console.error(log.message);
    if (log.stack) {
      console.error('Stack:', log.stack);
    }
    if (log.context) {
      console.error('Context:', log.context);
    }
    console.error('Time:', new Date(log.timestamp).toISOString());
    console.error('URL:', log.url);
    console.groupEnd();
  }

  /**
   * Get color for severity level
   */
  private getSeverityColor(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.LOW:
        return '#3b82f6'; // blue
      case ErrorSeverity.MEDIUM:
        return '#f59e0b'; // orange
      case ErrorSeverity.HIGH:
        return '#ef4444'; // red
      case ErrorSeverity.CRITICAL:
        return '#dc2626'; // dark red
      default:
        return '#6b7280'; // gray
    }
  }

  /**
   * Send critical errors to monitoring service
   * In production, integrate with services like Sentry, LogRocket, etc.
   */
  private sendToMonitoring(log: ErrorLog): void {
    // Only in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Send to parent iframe for external monitoring
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: 'ERROR_LOG',
            log,
          },
          '*'
        );
      }
    } catch (error) {
      console.warn('Failed to send error to monitoring:', error);
    }

    // Here you would integrate with services like:
    // - Sentry: Sentry.captureException(error)
    // - LogRocket: LogRocket.captureException(error)
    // - Custom API: fetch('/api/errors', { method: 'POST', body: JSON.stringify(log) })
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();

// Convenience methods
export const logError = (
  error: Error | string,
  severity?: ErrorSeverity,
  category?: ErrorCategory,
  context?: Record<string, any>
) => errorLogger.log(error, severity, category, context);

export const logNetworkError = (error: Error | string, context?: Record<string, any>) =>
  errorLogger.log(error, ErrorSeverity.MEDIUM, ErrorCategory.NETWORK, context);

export const logApiError = (error: Error | string, context?: Record<string, any>) =>
  errorLogger.log(error, ErrorSeverity.MEDIUM, ErrorCategory.API, context);

export const logValidationError = (error: Error | string, context?: Record<string, any>) =>
  errorLogger.log(error, ErrorSeverity.LOW, ErrorCategory.VALIDATION, context);

export const logCriticalError = (error: Error | string, context?: Record<string, any>) =>
  errorLogger.log(error, ErrorSeverity.CRITICAL, ErrorCategory.UNKNOWN, context);