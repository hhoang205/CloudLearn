"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const quickReplies = [
  "Tôi cần hỗ trợ tài khoản",
  "Tôi muốn hỏi về dung lượng",
  "Tôi gặp lỗi tải tài liệu",
];

export default function AdminChat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "admin",
      text: "Xin chào, mình là Admin CloudLearn. Bạn cần hỗ trợ gì hôm nay?",
      time: "09:00",
    },
  ]);
  const [isReplying, setReplying] = useState(false);

  const userInitial = useMemo(() => user?.fullName?.trim()?.slice(0, 1).toUpperCase() || "U", [user]);

  function sendMessage(text = message) {
    const cleanText = text.trim();
    if (!cleanText || isReplying) return;

    const now = new Date();
    const time = now.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: cleanText,
        time,
      },
    ]);
    setMessage("");
    setReplying(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `admin-${Date.now()}`,
          sender: "admin",
          text: "Admin đã nhận được tin nhắn. Đây là phản hồi mẫu, sau này có thể kết nối API chat thật.",
          time: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setReplying(false);
    }, 800);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <section className="rounded-[28px] border border-apple-hairline bg-white shadow-sm xl:col-span-3">
      <div className="border-b border-apple-hairline p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-apple-primary">
          Hỗ trợ trực tuyến
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-apple-text">Chat với Admin</h2>
            <p className="mt-1 text-sm text-apple-muted">
              Gửi câu hỏi về tài khoản, tài liệu, dung lượng hoặc lỗi sử dụng.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF7EA] px-3 py-1 text-xs font-bold text-apple-success">
            <span className="h-2 w-2 rounded-full bg-apple-success" />
            Admin đang trực tuyến
          </span>
        </div>
      </div>

      <div className="max-h-[460px] space-y-4 overflow-y-auto bg-apple-secondary p-5">
        {messages.map((item) => {
          const isUser = item.sender === "user";
          return (
            <div
              key={item.id}
              className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-apple-dark text-xs font-bold text-white">
                  AD
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-[22px] px-4 py-3 text-sm shadow-sm ${
                  isUser
                    ? "bg-apple-primary text-white"
                    : "border border-apple-hairline bg-white text-apple-text"
                }`}
              >
                <p className="leading-6">{item.text}</p>
                <p className={`mt-1 text-[11px] ${isUser ? "text-white/75" : "text-apple-muted"}`}>
                  {item.time}
                </p>
              </div>
              {isUser && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-xs font-bold text-apple-primary">
                  {userInitial}
                </div>
              )}
            </div>
          );
        })}

        {isReplying && (
          <div className="flex items-end gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-apple-dark text-xs font-bold text-white">
              AD
            </div>
            <div className="rounded-[22px] border border-apple-hairline bg-white px-4 py-3 text-sm text-apple-muted shadow-sm">
              Admin đang nhập...
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => sendMessage(reply)}
              disabled={isReplying}
              className="rounded-full border border-apple-hairline bg-white px-4 py-2 text-xs font-bold text-apple-text transition hover:bg-apple-secondary disabled:cursor-not-allowed disabled:text-apple-muted"
            >
              {reply}
            </button>
          ))}
        </div>

        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="admin-chat-message">
            Nhập tin nhắn cho Admin
          </label>
          <input
            id="admin-chat-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Nhập tin nhắn..."
            disabled={isReplying}
            className="min-h-12 flex-1 rounded-full border border-apple-hairline bg-white px-5 py-3 text-sm text-apple-text outline-none transition placeholder:text-[#A1A1A6] focus:border-apple-primary focus:ring-2 focus:ring-[#0071E3]/20 disabled:cursor-not-allowed disabled:bg-apple-secondary"
          />
          <button
            type="submit"
            disabled={!message.trim() || isReplying}
            className="rounded-full bg-apple-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-apple-link active:bg-[#0055B8] disabled:cursor-not-allowed disabled:bg-apple-hairline"
          >
            Gửi
          </button>
        </form>
      </div>
    </section>
  );
}
