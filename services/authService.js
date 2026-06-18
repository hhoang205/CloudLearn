// Authentication service.
// Mock implementations now; real fetch calls (see commented examples) later.

import { API_ENDPOINTS, USER_ROLES } from "@/constants";
import { mockCredentials, mockUser } from "@/lib/mockData";
import { clearAuthToken, delay, setAuthToken /*, request, USE_MOCK */ } from "./apiClient";
import { setCurrentUser } from "./userService";

function makeToken() {
  return `mock.${Math.random().toString(36).slice(2)}.${Date.now()}`;
}

/**
 * POST /api/auth/login
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function loginUser({ email, password }) {
  // Real: return request(API_ENDPOINTS.LOGIN, { method: "POST", body: { email, password } });
  await delay();

  const match = mockCredentials.find(
    (cred) => cred.email === email.trim().toLowerCase() && cred.password === password
  );

  if (!match) {
    throw new Error("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
  }

  const token = makeToken();
  setAuthToken(token);
  const user = { ...mockUser, email: email.trim().toLowerCase() };
  setCurrentUser(user);
  return { user, token };
}

/**
 * POST /api/auth/register
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function registerUser({ fullName, email, password }) {
  // Real: return request(API_ENDPOINTS.REGISTER, { method: "POST", body: { fullName, email, password } });
  await delay();

  const normalizedEmail = email.trim().toLowerCase();

  if (mockCredentials.some((cred) => cred.email === normalizedEmail)) {
    throw new Error("Email này đã được dùng để tạo tài khoản.");
  }

  mockCredentials.push({ email: normalizedEmail, password });

  const token = makeToken();
  setAuthToken(token);

  const user = {
    ...mockUser,
    id: `usr_${Math.random().toString(36).slice(2, 8)}`,
    fullName: fullName.trim(),
    email: normalizedEmail,
    role: USER_ROLES.STUDENT,
    storageUsedGB: 0,
  };

  setCurrentUser(user);
  return { user, token };
}

/**
 * Social auth placeholder (Google / GitHub). Real flow would redirect to an OAuth URL.
 */
export async function socialLogin(provider) {
  await delay(500);
  const token = makeToken();
  setAuthToken(token);
  const user = { ...mockUser, provider };
  setCurrentUser(user);
  return { user, token };
}

export async function logoutUser() {
  // Real: await request("/api/auth/logout", { method: "POST" });
  clearAuthToken();
}

export { API_ENDPOINTS };
