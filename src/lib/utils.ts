import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return 'https://placehold.co/600x400?text=No+Image';
if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;  
   // Clean URL to ensure no double slashes or leading slash
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;
  
  // In production, we use relative paths from the root
  // In development, Vite serves from /
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${cleanPath}`;
}
