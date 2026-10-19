const BASE_URL = process.env.REACT_APP_API_URL;

export class ApiError extends Error {
  constructor(message, code, details, status, requestId) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.status = status;
    this.requestId = requestId;
  }
}

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const requestId = res.headers.get('X-Request-ID');

  if (!res.ok) {
    let body = null;
    try { body = await res.json(); } catch {}
    const err = body?.error ?? {};
    throw new ApiError(
      err.message || `HTTP ${res.status}`,
      err.code,
      err.details,
      res.status,
      requestId
    );
  }

  if (res.status === 204) return null;
  return res.json();
}