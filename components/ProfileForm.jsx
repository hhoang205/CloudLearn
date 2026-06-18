"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ROLE_LABELS, ROLE_OPTIONS } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { validateProfile } from "@/lib/validation";
import FormInput from "./FormInput";

const MAX_AVATAR_SIZE_MB = 2;
const MAX_AVATAR_SIZE_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;

export default function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    role: "student",
    institution: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {
    if (user) {
      setValues({
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "student",
        institution: user.institution || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus("");
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Vui lòng chọn tệp ảnh hợp lệ.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setAvatarError(`Ảnh đại diện không được vượt quá ${MAX_AVATAR_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValues((current) => ({ ...current, avatarUrl: String(reader.result) }));
      setAvatarError("");
      setStatus("Ảnh đại diện đã sẵn sàng. Nhấn lưu để cập nhật.");
    };
    reader.onerror = () => {
      setAvatarError("Không thể đọc ảnh. Vui lòng thử lại.");
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateProfile(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setSaving(true);
      setStatus("");
      await updateProfile(values);
      setStatus("Đã lưu hồ sơ.");
    } catch (error) {
      setStatus(error.message || "Không thể lưu hồ sơ.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;

  return (
    <section className="rounded-[28px] border border-apple-hairline bg-white p-6 shadow-sm xl:col-span-2">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={values.avatarUrl || user.avatarUrl}
            alt={`Ảnh đại diện của ${user.fullName}`}
            width={96}
            height={96}
            unoptimized
            className="h-24 w-24 rounded-[28px] border-4 border-[#EAF4FF] object-cover"
          />
          <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-apple-primary text-xs font-bold text-white shadow">
            {ROLE_LABELS[user.role]?.slice(0, 1) || "U"}
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-apple-text">{user.fullName}</h2>
          <p className="truncate text-sm text-apple-muted">{user.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#EAF7EA] px-3 py-1 text-xs font-bold text-apple-success">
              Tài khoản {ROLE_LABELS[user.role]}
            </span>
            <span className="rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-bold text-apple-primary">
              {user.institution}
            </span>
          </div>

          <div className="mt-4">
            <label
              htmlFor="avatar-upload"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-apple-hairline bg-white px-4 py-2 text-sm font-bold text-apple-text transition hover:bg-apple-secondary focus-within:ring-2 focus-within:ring-apple-primary focus-within:ring-offset-2"
            >
              Tải ảnh đại diện
            </label>
            <input
              id="avatar-upload"
              name="avatar"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarChange}
              disabled={isSaving}
              className="sr-only"
            />
            <p className="mt-2 text-xs text-apple-muted">
              Hỗ trợ PNG, JPG, WEBP hoặc GIF. Tối đa {MAX_AVATAR_SIZE_MB}MB.
            </p>
            {avatarError && (
              <p className="mt-2 text-sm text-apple-error" role="alert">
                {avatarError}
              </p>
            )}
          </div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            id="profile-fullName"
            name="fullName"
            label="Họ và tên"
            value={values.fullName}
            error={errors.fullName}
            onChange={updateValue}
            disabled={isSaving}
            required
          />
          <FormInput
            id="profile-email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={updateValue}
            disabled={isSaving}
            required
          />
          <FormInput
            id="profile-institution"
            name="institution"
            label="Trường/Tổ chức"
            value={values.institution}
            error={errors.institution}
            onChange={updateValue}
            disabled={isSaving}
            required
          />

          <div>
            <label htmlFor="profile-role" className="mb-1.5 block text-sm font-semibold text-apple-text">
              Vai trò
            </label>
            <select
              id="profile-role"
              name="role"
              value={values.role}
              onChange={updateValue}
              disabled={isSaving}
              className="w-full rounded-2xl border border-apple-hairline bg-white px-4 py-3 text-sm text-apple-text outline-none transition hover:border-[#B8B8BD] disabled:cursor-not-allowed disabled:bg-apple-secondary disabled:text-apple-muted focus:border-apple-primary focus:ring-2 focus:ring-[#0071E3]/20"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-apple-muted" role={status ? "status" : undefined}>
            {status}
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-apple-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-apple-link active:bg-[#0055B8] disabled:cursor-not-allowed disabled:bg-apple-hairline focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2"
          >
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </section>
  );
}
