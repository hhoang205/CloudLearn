"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { loginUser, registerUser, socialLogin, logoutUser } from "@/services/authService";
import { updateProfile as updateProfileService } from "@/services/userService";

const AuthContext = createContext(null);

/**
 * Mock authentication provider.
 * Holds the current user + auth status in React state only.
 * Never stores raw passwords — those live in form state until submit, then are discarded.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    try {
      const { user: authedUser } = await loginUser(credentials);
      setUser(authedUser);
      return authedUser;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setIsAuthenticating(true);
    try {
      const { user: newUser } = await registerUser(payload);
      setUser(newUser);
      return newUser;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const loginWithProvider = useCallback(async (provider) => {
    setIsAuthenticating(true);
    try {
      const { user: authedUser } = await socialLogin(provider);
      setUser(authedUser);
      return authedUser;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  // Persist profile edits through the service and reflect them in context.
  const updateProfile = useCallback(async (updates) => {
    const updated = await updateProfileService(updates);
    setUser((prev) => ({ ...prev, ...updated }));
    return updated;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthenticating,
      login,
      register,
      loginWithProvider,
      logout,
      updateProfile,
    }),
    [user, isAuthenticating, login, register, loginWithProvider, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
