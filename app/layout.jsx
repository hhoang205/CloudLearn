import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "CloudLearn Tài liệu",
  description: "Giao diện quản lý tài liệu học tập trên nền tảng đám mây",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-apple-secondary text-apple-text antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
