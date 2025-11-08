/**
 * Memory Monitor Utility
 * Tracks memory usage and prevents memory leaks
 */

interface MemoryStats {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  usagePercentage: number;
}

class MemoryMonitor {
  private monitoringInterval: number | null = null;
  private warningThreshold = 0.8; // 80%
  private criticalThreshold = 0.9; // 90%
  private listeners: ((stats: MemoryStats) => void)[] = [];

  /**
   * Check if performance.memory is available
   */
  private isMemoryAPIAvailable(): boolean {
    return (
      typeof performance !== 'undefined' &&
      'memory' in performance &&
      performance.memory !== null
    );
  }

  /**
   * Get current memory stats
   */
  getMemoryStats(): MemoryStats | null {
    if (!this.isMemoryAPIAvailable()) {
      return null;
    }

    const memory = (performance as any).memory;
    const usagePercentage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage,
    };
  }

  /**
   * Format bytes to human-readable format
   */
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Start monitoring memory usage
   */
  startMonitoring(intervalMs: number = 30000): void {
    if (!this.isMemoryAPIAvailable()) {
      console.warn('Memory monitoring not available in this browser');
      return;
    }

    if (this.monitoringInterval) {
      console.warn('Memory monitoring already started');
      return;
    }

    this.monitoringInterval = window.setInterval(() => {
      const stats = this.getMemoryStats();
      if (!stats) return;

      // Notify listeners
      this.listeners.forEach(listener => listener(stats));

      // Log warnings
      if (stats.usagePercentage >= this.criticalThreshold) {
        console.error(
          `[Memory Monitor] CRITICAL: Memory usage at ${(stats.usagePercentage * 100).toFixed(1)}%`,
          `(${this.formatBytes(stats.usedJSHeapSize)} / ${this.formatBytes(stats.jsHeapSizeLimit)})`
        );
      } else if (stats.usagePercentage >= this.warningThreshold) {
        console.warn(
          `[Memory Monitor] WARNING: Memory usage at ${(stats.usagePercentage * 100).toFixed(1)}%`,
          `(${this.formatBytes(stats.usedJSHeapSize)} / ${this.formatBytes(stats.jsHeapSizeLimit)})`
        );
      }
    }, intervalMs);

    console.log('[Memory Monitor] Started monitoring memory usage');
  }

  /**
   * Stop monitoring memory usage
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('[Memory Monitor] Stopped monitoring memory usage');
    }
  }

  /**
   * Subscribe to memory stats updates
   */
  subscribe(listener: (stats: MemoryStats) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Force garbage collection (only works in some environments)
   */
  forceGC(): void {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
      console.log('[Memory Monitor] Forced garbage collection');
    } else {
      console.warn('[Memory Monitor] Garbage collection not available');
    }
  }

  /**
   * Check for common memory leak patterns
   */
  detectPotentialLeaks(): string[] {
    const warnings: string[] = [];

    // Check for excessive event listeners
    const eventTarget = window as any;
    if (eventTarget._listeners) {
      const listenerCount = Object.keys(eventTarget._listeners).length;
      if (listenerCount > 100) {
        warnings.push(`High number of event listeners detected: ${listenerCount}`);
      }
    }

    // Check for excessive timers
    const timerCount = (window as any)._timerCount || 0;
    if (timerCount > 50) {
      warnings.push(`High number of active timers detected: ${timerCount}`);
    }

    // Check memory stats
    const stats = this.getMemoryStats();
    if (stats && stats.usagePercentage > this.warningThreshold) {
      warnings.push(
        `High memory usage: ${(stats.usagePercentage * 100).toFixed(1)}%`
      );
    }

    return warnings;
  }
}

// Export singleton instance
export const memoryMonitor = new MemoryMonitor();

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  memoryMonitor.startMonitoring();
}
