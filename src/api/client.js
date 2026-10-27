const BASE_URL = process.env.REACT_APP_API_URL
const MAX_RETRIES_ON_429 = 3;
const MAX_RETRY_DELAY_MS = 10000;

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function retryDelay(res, attempt) {
  const seconds = Number(res.headers.get('Retry-After'));
  const ms = seconds > 0 ? seconds * 1000 : 1000 * 2 ** attempt;
  return Math.min(ms, MAX_RETRY_DELAY_MS);
}

export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  let res;
  for (let attempt = 0; ; attempt++) {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
    if (res.status !== 429 || attempt >= MAX_RETRIES_ON_429) break;
    await sleep(retryDelay(res, attempt));
  }

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
