import { describe, it, expect } from 'vitest'
import {
  sanitizeInput,
  sanitizeObject,
  emailSchema,
  phoneSchema,
  nameSchema,
  messageSchema,
  contactFormSchema,
} from '../validation'

describe('sanitizeInput', () => {
  it('should remove HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello')
    expect(sanitizeInput('<div>Test</div>')).toBe('Test')
  })

  it('should remove event handlers', () => {
    expect(sanitizeInput('<div onclick="alert()">Test</div>')).toBe('Test')
  })

  it('should remove javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert()')).toBe('alert()')
  })

  it('should trim whitespace', () => {
    expect(sanitizeInput('  Hello  ')).toBe('Hello')
  })

  it('should handle empty strings', () => {
    expect(sanitizeInput('')).toBe('')
  })

  it('should handle non-string inputs', () => {
    expect(sanitizeInput(null as any)).toBe('')
    expect(sanitizeInput(undefined as any)).toBe('')
  })
})

describe('sanitizeObject', () => {
  it('should sanitize all string values', () => {
    const input = {
      name: '<script>alert()</script>John',
      email: 'test@example.com',
    }
    const result = sanitizeObject(input)
    expect(result.name).toBe('John')
    expect(result.email).toBe('test@example.com')
  })

  it('should handle nested objects', () => {
    const input = {
      user: {
        name: '<b>John</b>',
      },
    }
    const result = sanitizeObject(input)
    expect(result.user.name).toBe('John')
  })

  it('should handle arrays', () => {
    const input = {
      tags: ['<script>tag1</script>', 'tag2'],
    }
    const result = sanitizeObject(input)
    expect(result.tags).toEqual(['tag1', 'tag2'])
  })
})

describe('Email Schema', () => {
  it('should validate correct email', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(emailSchema.safeParse('invalid').success).toBe(false)
    expect(emailSchema.safeParse('@example.com').success).toBe(false)
    expect(emailSchema.safeParse('test@').success).toBe(false)
  })

  it('should reject empty email', () => {
    expect(emailSchema.safeParse('').success).toBe(false)
  })
})

describe('Phone Schema', () => {
  it('should validate international phone numbers', () => {
    expect(phoneSchema.safeParse('+233244375432').success).toBe(true)
    expect(phoneSchema.safeParse('+12125551234').success).toBe(true)
  })

  it('should reject invalid phone numbers', () => {
    expect(phoneSchema.safeParse('123').success).toBe(false)
    expect(phoneSchema.safeParse('abc').success).toBe(false)
  })
})

describe('Name Schema', () => {
  it('should validate correct names', () => {
    expect(nameSchema.safeParse('John Doe').success).toBe(true)
    expect(nameSchema.safeParse("O'Brien").success).toBe(true)
    expect(nameSchema.safeParse('Jean-Pierre').success).toBe(true)
  })

  it('should reject invalid names', () => {
    expect(nameSchema.safeParse('J').success).toBe(false) // too short
    expect(nameSchema.safeParse('John123').success).toBe(false) // contains numbers
    expect(nameSchema.safeParse('').success).toBe(false) // empty
  })
})

describe('Message Schema', () => {
  it('should validate correct messages', () => {
    expect(messageSchema.safeParse('This is a valid message.').success).toBe(true)
  })

  it('should reject short messages', () => {
    expect(messageSchema.safeParse('Short').success).toBe(false)
  })

  it('should reject empty messages', () => {
    expect(messageSchema.safeParse('').success).toBe(false)
  })
})

describe('Contact Form Schema', () => {
  it('should validate complete form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+233244375432',
      message: 'This is a test message.',
    }
    expect(contactFormSchema.safeParse(validData).success).toBe(true)
  })

  it('should reject incomplete form data', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      // missing phone and message
    }
    expect(contactFormSchema.safeParse(invalidData).success).toBe(false)
  })
})
