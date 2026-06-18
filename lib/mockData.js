import { USER_ROLES } from "@/constants";

// Mock user matching the agreed data model:
// { id, fullName, email, role, institution, avatarUrl, storageUsedGB, storageLimitGB }
export const mockUser = {
  id: "usr_001",
  fullName: "Nguyễn Minh Anh",
  email: "minhanh@student.edu",
  role: USER_ROLES.STUDENT,
  institution: "Đại học GTVT TP HCM",
  avatarUrl: "https://i.pravatar.cc/160?img=32",
  storageUsedGB: 2,
  storageLimitGB: 5,
};

// Credentials accepted by the mock login. Any registered user is appended at runtime.
export const mockCredentials = [
  { email: "minhanh@student.edu", password: "password123" },
  { email: "alex@student.edu", password: "password123" },
];

// Mock storage summary used by the Storage section.
export const mockStorageUsage = {
  usedGB: 2,
  limitGB: 5,
  documentCount: 124,
  folderCount: 18,
};

export const mockDocuments = [
  {
    id: "doc_001",
    name: "Bao-cao-dien-toan-dam-may.pdf",
    course: "Điện toán đám mây",
    folder: "Bài tập lớn",
    sizeMB: 8.4,
    storageClass: "S3 Standard",
    status: "Đã đồng bộ",
    uploadedAt: "18/06/2026",
    s3Key: "students/usr_001/bai-tap-lon/bao-cao-dien-toan-dam-may.pdf",
  },
  {
    id: "doc_002",
    name: "Slide-AWS-S3-EC2.pdf",
    course: "Điện toán đám mây",
    folder: "Tài liệu học",
    sizeMB: 12.1,
    storageClass: "S3 Standard",
    status: "Đã đồng bộ",
    uploadedAt: "17/06/2026",
    s3Key: "students/usr_001/tai-lieu-hoc/slide-aws-s3-ec2.pdf",
  },
];
