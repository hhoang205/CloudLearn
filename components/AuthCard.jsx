"use client";

import { useState } from "react";
import { AUTH_MODES } from "@/constants";
import AuthForm from "./AuthForm";

export default function AuthCard() {
  const [mode, setMode] = useState(AUTH_MODES.SIGN_IN);
  const isRegister = mode === AUTH_MODES.REGISTER;

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-apple-hairline bg-apple-surface shadow-apple lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-apple-dark p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-2xl font-bold">
              CL
            </div>
            <h1 className="text-4xl font-bold leading-tight">CloudLearn Tài liệu</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#E8E8ED]">
              Nền tảng gọn gàng để quản lý tài liệu học tập, hồ sơ cá nhân và dung
              lượng lưu trữ đám mây.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="font-semibold">5GB</p>
              <p className="mt-1 text-[#E8E8ED]">Dung lượng khởi đầu</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="font-semibold">An toàn</p>
              <p className="mt-1 text-[#E8E8ED]">Luồng đăng nhập mẫu</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#EAF4FF] text-lg font-bold text-apple-primary lg:mx-0">
              CL
            </div>
            <h2 className="text-2xl font-bold text-apple-text">
              {isRegister ? "Tạo tài khoản" : "Chào mừng trở lại"}
            </h2>
            <p className="mt-2 text-sm text-apple-muted">
              {isRegister
                ? "Thiết lập không gian CloudLearn của bạn trong vài giây."
                : "Đăng nhập để quản lý tài liệu học tập và tài khoản của bạn."}
            </p>
          </div>

          <div
            className="mb-6 grid grid-cols-2 rounded-full bg-apple-secondary p-1"
            role="tablist"
            aria-label="Chế độ xác thực"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === AUTH_MODES.SIGN_IN}
              onClick={() => setMode(AUTH_MODES.SIGN_IN)}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2 ${
                mode === AUTH_MODES.SIGN_IN
                  ? "bg-white text-apple-primary shadow-sm"
                  : "text-apple-muted hover:text-apple-text"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === AUTH_MODES.REGISTER}
              onClick={() => setMode(AUTH_MODES.REGISTER)}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-apple-primary focus:ring-offset-2 ${
                mode === AUTH_MODES.REGISTER
                  ? "bg-white text-apple-primary shadow-sm"
                  : "text-apple-muted hover:text-apple-text"
              }`}
            >
              Tạo tài khoản
            </button>
          </div>

          <AuthForm mode={mode} />
        </div>
      </div>
    </section>
  );
}
