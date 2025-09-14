import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID using UUID v4
 */
export function generateId(): string {
  return uuidv4();
}

/**
 * Format a Date object to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Parse a date string to Date object
 */
export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date;
}

/**
 * Calculate average placement from an array of placements
 */
export function calculateAveragePlacement(placements: number[]): number {
  if (placements.length === 0) return 0;
  return placements.reduce((sum, placement) => sum + placement, 0) / placements.length;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input by trimming and removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Create a cursor for pagination
 */
export function createCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

/**
 * Parse a cursor back to ID
 */
export function parseCursor(cursor: string): string {
  try {
    return Buffer.from(cursor, 'base64').toString('utf-8');
  } catch (error) {
    throw new Error('Invalid cursor format');
  }
}

/**
 * Calculate pagination info
 */
export function calculatePaginationInfo(
  totalCount: number,
  first?: number,
  after?: string,
  last?: number,
  before?: string
): {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
} {
  const hasNextPage = totalCount > (first || 0);
  const hasPreviousPage = !!before;

  return {
    hasNextPage,
    hasPreviousPage,
    startCursor: after,
    endCursor: before,
  };
}

/**
 * Validate and normalize pagination input
 */
export function normalizePaginationInput(input: {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}): {
  limit: number;
  offset: number;
  cursor?: string;
} {
  const { first, after, last, before } = input;

  if (first && last) {
    throw new Error('Cannot specify both first and last');
  }

  if (after && before) {
    throw new Error('Cannot specify both after and before');
  }

  const limit = first || last || 10;
  const offset = after ? 1 : 0; // Simple offset for cursor-based pagination

  return {
    limit: Math.min(limit, 100), // Cap at 100 items
    offset,
    cursor: after || before,
  };
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  throw lastError!;
}
