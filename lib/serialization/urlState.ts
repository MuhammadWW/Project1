export function encodeState(obj: unknown): string {
  return encodeURIComponent(Buffer.from(JSON.stringify(obj)).toString('base64'));
}

export function decodeState<T>(value?: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(Buffer.from(decodeURIComponent(value), 'base64').toString('utf8')) as T;
  } catch {
    return null;
  }
}
