// User profile service. Mock now, API-ready later.

import { mockUser } from "@/lib/mockData";
import { delay /*, request, API_ENDPOINTS */ } from "./apiClient";

// In-memory copy that mock mutations write to.
let currentUser = { ...mockUser };

export function setCurrentUser(user) {
  currentUser = { ...user };
}

/**
 * GET /api/users/me
 */
export async function getCurrentUser() {
  // Real: return request(API_ENDPOINTS.CURRENT_USER);
  await delay(400);
  return { ...currentUser };
}

/**
 * PUT /api/users/me
 * @param {{ fullName?: string, email?: string, role?: string, institution?: string }} updates
 */
export async function updateProfile(updates) {
  // Real: return request(API_ENDPOINTS.UPDATE_USER, { method: "PUT", body: updates });
  await delay();
  currentUser = { ...currentUser, ...updates };
  return { ...currentUser };
}

/**
 * PUT /api/users/change-password
 * Passwords are only handled here at call time, never persisted in app state.
 */
export async function changePassword({ currentPassword, newPassword }) {
  // Real: return request(API_ENDPOINTS.CHANGE_PASSWORD, { method: "PUT", body: { currentPassword, newPassword } });
  await delay();

  if (!currentPassword || !newPassword) {
    throw new Error("Vui lòng nhập cả mật khẩu hiện tại và mật khẩu mới.");
  }
  // Mock check: pretend the demo account's current password is "password123".
  if (currentPassword !== "password123") {
    throw new Error("Mật khẩu hiện tại không đúng.");
  }

  return { success: true };
}
