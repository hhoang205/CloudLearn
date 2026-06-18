# CloudLearn Docs - Next.js + Tailwind CSS

Đây là bản UI dùng framework chạy trên Node.js: **Next.js + React + Tailwind CSS**.

## Cách chạy trên Windows / VS Code

Sau khi giải nén, mở đúng thư mục có file `package.json`, rồi chạy:

```bash
npm install
npm run dev
```

Sau đó mở trình duyệt:

```bash
http://localhost:3000
```

## Chức năng có sẵn

- Authentication View:
  - Toggle giữa `Sign In` và `Create Account`
  - Email, Password, Confirm Password
  - Social login buttons: Google, GitHub

- Account Management View:
  - Sidebar: Profile, My Documents, Storage, Settings
  - Avatar người dùng
  - Form chỉnh sửa thông tin cá nhân
  - Form đổi mật khẩu
  - Cloud storage indicator: 2GB / 5GB, progress bar 40%
  - Responsive layout cho desktop và mobile
  - Có aria-label, label/input rõ ràng để hỗ trợ accessibility

## Cấu trúc thư mục

```text
cloudlearn_nextjs_fixed/
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
├── public/
├── user-flow.mmd
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```
