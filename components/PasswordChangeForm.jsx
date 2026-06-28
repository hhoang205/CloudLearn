"use client";

import { useState } from "react";
import { validatePasswordChange } from "@/lib/validation";
import { changePassword } from "@/services/userService";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PasswordChangeForm() {
  const router = useRouter(); //Khởi tạo router
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSaving, setSaving] = useState(false);

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validatePasswordChange(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setSaving(true);
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setValues(initialValues);
      setStatus("Đã cập nhật mật khẩu.");
      setTimeout(() => {
        router.push("/"); // Thay đổi thành đường dẫn trang login thực tế
      }, 1500);
    } catch (error) {
      setStatus(error.message || "Không thể cập nhật mật khẩu.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-apple-hairline bg-white p-6 shadow-sm xl:col-span-3">
      <h2 className="text-lg font-bold text-apple-text">Đổi mật khẩu</h2>
      <p className="mt-1 text-sm text-apple-muted">
        Khi thử luồng mẫu, mật khẩu hiện tại là password123.
      </p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FormInput
            id="currentPassword"
            name="currentPassword"
            label="Mật khẩu hiện tại"
            type="password"
            autoComplete="current-password"
            value={values.currentPassword}
            error={errors.currentPassword}
            onChange={updateValue}
            disabled={isSaving}
            required
          />
          <FormInput
            id="newPassword"
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            autoComplete="new-password"
            value={values.newPassword}
            error={errors.newPassword}
            onChange={updateValue}
            disabled={isSaving}
            required
          />
          <FormInput
            id="confirmNewPassword"
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={updateValue}
            disabled={isSaving}
            required
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-sm text-apple-muted"
            role={status ? "status" : undefined}
          >
            {status}
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-apple-dark px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1D1D1F] active:bg-black disabled:cursor-not-allowed disabled:bg-apple-hairline focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2"
          >
            {isSaving ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </section>
  );
}
