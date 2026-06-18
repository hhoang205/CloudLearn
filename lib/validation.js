import { PASSWORD_MIN_LENGTH } from "@/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Field-level validators (return an error string or null) ---

export function validateRequired(value, fieldLabel = "This field") {
  if (!value || String(value).trim() === "") {
    return `${fieldLabel} là bắt buộc.`;
  }
  return null;
}

export function validateEmail(value) {
  if (!value || String(value).trim() === "") {
    return "Email là bắt buộc.";
  }
  if (!EMAIL_REGEX.test(String(value).trim())) {
    return "Vui lòng nhập địa chỉ email hợp lệ.";
  }
  return null;
}

export function validatePassword(value) {
  if (!value) {
    return "Mật khẩu là bắt buộc.";
  }
  if (String(value).length < PASSWORD_MIN_LENGTH) {
    return `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`;
  }
  return null;
}

export function validateMatch(value, compareTo, fieldLabel = "Mật khẩu") {
  if (value !== compareTo) {
    return `${fieldLabel} không khớp.`;
  }
  return null;
}

// Utility: strip null entries so callers can check `Object.keys(errors).length`.
function compact(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => Boolean(v)));
}

// --- Form-level validators (return an errors map) ---

export function validateSignIn({ email, password }) {
  return compact({
    email: validateEmail(email),
    password: validatePassword(password),
  });
}

export function validateRegister({ fullName, email, password, confirmPassword }) {
  return compact({
    fullName: validateRequired(fullName, "Họ và tên"),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword:
      validateRequired(confirmPassword, "Xác nhận mật khẩu") ||
      validateMatch(password, confirmPassword),
  });
}

export function validateProfile({ fullName, email, institution }) {
  return compact({
    fullName: validateRequired(fullName, "Họ và tên"),
    email: validateEmail(email),
    institution: validateRequired(institution, "Trường/Tổ chức"),
  });
}

export function validatePasswordChange({ currentPassword, newPassword, confirmPassword }) {
  return compact({
    currentPassword: validateRequired(currentPassword, "Mật khẩu hiện tại"),
    newPassword: validatePassword(newPassword),
    confirmPassword:
      validateRequired(confirmPassword, "Xác nhận mật khẩu") ||
      validateMatch(newPassword, confirmPassword, "Mật khẩu mới"),
  });
}
