// Shared constants for the CloudLearn frontend.
// Keeping these centralized makes future backend/role wiring straightforward.

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const ROLE_OPTIONS = [
  { value: USER_ROLES.STUDENT, label: "Sinh viên" },
  { value: USER_ROLES.TEACHER, label: "Giảng viên" },
  { value: USER_ROLES.ADMIN, label: "Quản trị viên" },
];

export const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: "Sinh viên",
  [USER_ROLES.TEACHER]: "Giảng viên",
  [USER_ROLES.ADMIN]: "Quản trị viên",
};

export const AUTH_MODES = {
  SIGN_IN: "signin",
  REGISTER: "register",
};

// Dashboard navigation sections.
export const DASHBOARD_SECTIONS = {
  PROFILE: "profile",
  DOCUMENTS: "documents",
  STORAGE: "storage",
  SUPPORT: "support",
  SETTINGS: "settings",
};

export const NAV_ITEMS = [
  { id: DASHBOARD_SECTIONS.PROFILE, label: "Hồ sơ", icon: "user" },
  { id: DASHBOARD_SECTIONS.DOCUMENTS, label: "Tài liệu của tôi", icon: "document" },
  { id: DASHBOARD_SECTIONS.STORAGE, label: "Dung lượng", icon: "cloud" },
  { id: DASHBOARD_SECTIONS.SUPPORT, label: "Chat Admin", icon: "chat" },
  { id: DASHBOARD_SECTIONS.SETTINGS, label: "Cài đặt", icon: "settings" },
];

// Validation rules shared between auth and account forms.
export const PASSWORD_MIN_LENGTH = 8;

// Future API endpoints (used today by the mock service layer as documentation,
// ready to be swapped for real fetch calls).
export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  CURRENT_USER: "/api/users/me",
  UPDATE_USER: "/api/users/me",
  CHANGE_PASSWORD: "/api/users/change-password",
  STORAGE_USAGE: "/api/storage/usage",
  DOCUMENTS: "/api/documents",
  DOCUMENT_UPLOAD_URL: "/api/documents/upload-url",
  DOCUMENT_COMPLETE_UPLOAD: "/api/documents/complete-upload",
};

export const AWS_STORAGE_CONFIG = {
  provider: "AWS S3",
  bucketName: "cloudlearn-gtvt-hcm-documents",
  region: "ap-southeast-1",
  encryption: "SSE-S3",
  accessPattern: "Presigned URL",
  versioning: "Enabled",
  lifecycle: "Move inactive files to S3 Standard-IA after 30 days",
};
