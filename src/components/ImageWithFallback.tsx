import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
  alt: string;
  showErrorMessage?: boolean;
  retryCount?: number;
}

/**
 * Image component with error handling and fallback support
 * Automatically retries loading on failure and shows fallback on error
 */
export const ImageWithFallback = ({
  src,
  fallback,
  alt,
  showErrorMessage = false,
  retryCount = 2,
  className = '',
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setAttempts(0);
  }, [src]);

  const handleError = () => {
    if (attempts < retryCount) {
      // Retry loading the image
      setAttempts(prev => prev + 1);
      // Add timestamp to bust cache
      setImgSrc(`${src}?retry=${attempts + 1}`);
    } else if (fallback) {
      // Use fallback image
      setImgSrc(fallback);
      setError(false);
    } else {
      // Show error state
      setError(true);
      console.error(`Failed to load image: ${src}`);
    }
  };

  const handleLoad = () => {
    setError(false);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
        {...props}
      >
        <div className="text-center p-4">
          <ImageOff className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          {showErrorMessage && (
            <p className="text-sm text-muted-foreground">Failed to load image</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      {...props}
    />
  );
};
