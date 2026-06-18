// Central API client. Today it powers the mock services; when a backend is ready,
// flip USE_MOCK to false and the `request()` helper will issue real fetch calls.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const USE_MOCK = true;

const TOKEN_KEY = "cloudlearn.token";

// --- Auth token handling (prepared for real JWT/session tokens) ---

export function setAuthToken(token) {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  setAuthToken(null);
}

// Simulates network latency for mock calls so loading states are visible.
export function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Real-backend request helper. Not used while USE_MOCK is true, but kept here so
 * services can switch to it without changing their public signatures.
 */
export async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
