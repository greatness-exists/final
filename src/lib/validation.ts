import { z } from 'zod';

/**
 * Common validation schemas using Zod
 */

// Email validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(255, 'Email is too long');

// Phone validation (international format)
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(
    /^\+?[1-9]\d{1,14}$/,
    'Invalid phone number. Use international format (e.g., +233244375432)'
  );

// Name validation
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');

// Message validation
export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message is too long');

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous characters and HTML tags
 * 
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Limit length to prevent memory issues
    .slice(0, 10000);
}

/**
 * Sanitize an entire object recursively
 * 
 * @param obj - The object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item =>
        typeof item === 'string' ? sanitizeInput(item) : item
      ) as T[keyof T];
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key as keyof T] = sanitizeObject(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }

  return sanitized;
}

/**
 * Validate and sanitize form data
 * 
 * @param schema - Zod schema for validation
 * @param data - Form data to validate
 * @returns Validated and sanitized data, or null if validation fails
 */
export function validateAndSanitize<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> | null {
  try {
    // First sanitize the data
    const sanitized = typeof data === 'object' && data !== null
      ? sanitizeObject(data as Record<string, any>)
      : data;

    // Then validate with schema
    const validated = schema.parse(sanitized);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation errors:', error.issues);
    }
    return null;
  }
}

/**
 * Safe parse with error handling
 * 
 * @param schema - Zod schema
 * @param data - Data to parse
 * @returns Result with success flag and data/errors
 */
export function safeParse<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: string[] } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((err: z.ZodIssue) => err.message),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
}