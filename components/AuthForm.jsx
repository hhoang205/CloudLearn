"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_MODES } from "@/constants";
import { validateRegister, validateSignIn } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";
import FormInput from "./FormInput";
import SocialLoginButton from "./SocialLoginButton";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthForm({ mode }) {
  const router = useRouter();
  const { login, register, loginWithProvider, isAuthenticating } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const isRegister = mode === AUTH_MODES.REGISTER;

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = isRegister ? validateRegister(values) : validateSignIn(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setFormError("");
      if (isRegister) {
        await register({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        });
      } else {
        await login({ email: values.email, password: values.password });
      }

      setValues(initialValues);
      router.push("/dashboard");
    } catch (error) {
      setFormError(error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  }

  async function handleSocial(provider) {
    try {
      setFormError("");
      await loginWithProvider(provider);
      router.push("/dashboard");
    } catch (error) {
      setFormError(error.message || `Không thể tiếp tục với ${provider}.`);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {isRegister && (
        <FormInput
          id="fullName"
          name="fullName"
          label="Họ và tên"
          autoComplete="name"
          value={values.fullName}
          error={errors.fullName}
          onChange={updateValue}
          disabled={isAuthenticating}
          required
        />
      )}

      <FormInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={updateValue}
        disabled={isAuthenticating}
        required
      />

      <FormInput
        id="password"
        name="password"
        label="Mật khẩu"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        value={values.password}
        error={errors.password}
        onChange={updateValue}
        disabled={isAuthenticating}
        required
      />

      {isRegister && (
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={updateValue}
          disabled={isAuthenticating}
          required
        />
      )}

      {formError && (
        <p className="rounded-2xl border border-[#F5B7B7] bg-[#FFF2F2] px-4 py-3 text-sm text-apple-error" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isAuthenticating}
        className="w-full rounded-full bg-apple-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-apple-link active:bg-[#0055B8] disabled:cursor-not-allowed disabled:bg-apple-hairline focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2"
      >
        {isAuthenticating ? "Đang xử lý..." : isRegister ? "Tạo tài khoản" : "Đăng nhập"}
      </button>

      <div className="flex items-center gap-3 py-2">
        <div className="h-px flex-1 bg-apple-hairline" />
        <span className="text-xs font-medium text-apple-muted">hoặc tiếp tục với</span>
        <div className="h-px flex-1 bg-apple-hairline" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialLoginButton provider="Google" onClick={() => handleSocial("Google")} disabled={isAuthenticating} />
        <SocialLoginButton provider="GitHub" onClick={() => handleSocial("GitHub")} disabled={isAuthenticating} />
      </div>
    </form>
  );
}
