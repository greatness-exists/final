/**
 * Performance Monitor Utility
 * Tracks page load times, component render times, and user interactions
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'navigation' | 'resource' | 'measure' | 'custom';
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 500;
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
    this.measurePageLoad();
  }

  /**
   * Initialize Performance Observer
   */
  private initializeObserver(): void {
    if (typeof PerformanceObserver === 'undefined') {
      console.warn('PerformanceObserver not available');
      return;
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric({
            name: entry.name,
            value: entry.duration || entry.startTime,
            timestamp: Date.now(),
            category: entry.entryType as any,
          });
        }
      });

      // Observe various performance entry types
      this.observer.observe({
        entryTypes: ['navigation', 'resource', 'measure', 'paint'],
      });
    } catch (error) {
      console.warn('Failed to initialize PerformanceObserver:', error);
    }
  }

  /**
   * Measure page load metrics
   */
  private measurePageLoad(): void {
    if (typeof window === 'undefined' || !window.performance) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          this.recordMetric({
            name: 'DNS Lookup',
            value: navigation.domainLookupEnd - navigation.domainLookupStart,
            timestamp: Date.now(),
            category: 'navigation',
          });

          this.recordMetric({
            name: 'TCP Connection',
            value: navigation.connectEnd - navigation.connectStart,
            timestamp: Date.now(),
            category: 'navigation',
          });

          this.recordMetric({
            name: 'Request Time',
            value: navigation.responseStart - navigation.requestStart,
            timestamp: Date.now(),
            category: 'navigation',
          });

          this.recordMetric({
            name: 'Response Time',
            value: navigation.responseEnd - navigation.responseStart,
            timestamp: Date.now(),
            category: 'navigation',
          });

          // Handle DOM Processing timing (compatible with both old and new APIs)
            const domProcessingTime =
            'domLoading' in navigation
            ? (navigation as any).domComplete - (navigation as any).domLoading
            : navigation.domComplete - navigation.responseEnd;

        this.recordMetric({
            name: 'DOM Processing',
            value: domProcessingTime,
            timestamp: Date.now(),
            category: 'navigation',
            });


          this.recordMetric({
            name: 'Page Load Complete',
            value: navigation.loadEventEnd - navigation.fetchStart,
            timestamp: Date.now(),
            category: 'navigation',
          });
        }

        // First Contentful Paint
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        if (fcp) {
          this.recordMetric({
            name: 'First Contentful Paint',
            value: fcp.startTime,
            timestamp: Date.now(),
            category: 'paint' as any,
          });
        }

        // Log summary
        this.logPerformanceSummary();
      }, 0);
    });
  }

  /**
   * Record a performance metric
   */
  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only recent metrics to prevent memory leaks
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && metric.value > 1000) {
      console.warn(
        `[Performance] Slow operation detected: ${metric.name} took ${metric.value.toFixed(2)}ms`
      );
    }
  }

  /**
   * Mark a custom performance point
   */
  mark(name: string): void {
    if (typeof performance === 'undefined' || !performance.mark) return;

    try {
      performance.mark(name);
    } catch (error) {
      console.warn('Failed to create performance mark:', error);
    }
  }

  /**
   * Measure time between two marks
   */
  measure(name: string, startMark: string, endMark: string): number | null {
    if (typeof performance === 'undefined' || !performance.measure) return null;

    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      return measure ? measure.duration : null;
    } catch (error) {
      console.warn('Failed to measure performance:', error);
      return null;
    }
  }

  /**
   * Track custom metric
   */
  trackCustomMetric(name: string, value: number): void {
    this.recordMetric({
      name,
      value,
      timestamp: Date.now(),
      category: 'custom',
    });
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by category
   */
  getMetricsByCategory(category: PerformanceMetric['category']): PerformanceMetric[] {
    return this.metrics.filter(m => m.category === category);
  }

  /**
   * Get average metric value by name
   */
  getAverageMetric(name: string): number {
    const metrics = this.metrics.filter(m => m.name === name);
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  /**
   * Log performance summary
   */
  logPerformanceSummary(): void {
    const navigation = this.getMetricsByCategory('navigation');
    
    console.group('%c[Performance Summary]', 'color: #10b981; font-weight: bold;');
    
    navigation.forEach(metric => {
      const color = metric.value > 1000 ? '#ef4444' : metric.value > 500 ? '#f59e0b' : '#10b981';
      console.log(
        `%c${metric.name}:`,
        `color: ${color}`,
        `${metric.value.toFixed(2)}ms`
      );
    });

    console.groupEnd();
  }

  /**
   * Clean up
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper function to measure async operations
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    performanceMonitor.trackCustomMetric(name, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    performanceMonitor.trackCustomMetric(`${name} (failed)`, duration);
    throw error;
  }
}
