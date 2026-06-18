// Document service. Mock S3 upload flow now, API-ready later.

import { AWS_STORAGE_CONFIG, API_ENDPOINTS } from "@/constants";
import { mockDocuments } from "@/lib/mockData";
import { delay /*, request */ } from "./apiClient";

let documents = [...mockDocuments];

function toMB(bytes) {
  return Math.max(bytes / (1024 * 1024), 0.01);
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * GET /api/documents
 */
export async function getDocuments() {
  // Real: return request(API_ENDPOINTS.DOCUMENTS);
  await delay(400);
  return [...documents];
}

/**
 * POST /api/documents/upload-url
 * PUT presignedUrl
 * POST /api/documents/complete-upload
 */
export async function uploadDocument(file, metadata, onProgress) {
  // Real flow:
  // 1. request(API_ENDPOINTS.DOCUMENT_UPLOAD_URL, { method: "POST", body: metadata })
  // 2. PUT file directly to AWS S3 with the returned presigned URL
  // 3. request(API_ENDPOINTS.DOCUMENT_COMPLETE_UPLOAD, { method: "POST", body: uploadedObject })
  if (!file) {
    throw new Error("Vui lòng chọn tệp cần tải lên.");
  }

  const folderSlug = slugify(metadata.folder || "tai-lieu");
  const fileSlug = slugify(file.name.replace(/\.[^/.]+$/, ""));
  const extension = file.name.includes(".") ? file.name.split(".").pop() : "file";
  const s3Key = `students/mock-user/${folderSlug}/${fileSlug}.${extension}`;

  for (const progress of [12, 28, 44, 63, 81, 100]) {
    await delay(180);
    onProgress?.(progress);
  }

  const uploaded = {
    id: `doc_${Date.now()}`,
    name: file.name,
    course: metadata.course || "Điện toán đám mây",
    folder: metadata.folder || "Tài liệu mới",
    sizeMB: Number(toMB(file.size).toFixed(2)),
    storageClass: metadata.storageClass || "S3 Standard",
    status: "Đã đồng bộ",
    uploadedAt: new Date().toLocaleDateString("vi-VN"),
    s3Key,
    cloudProvider: AWS_STORAGE_CONFIG.provider,
    apiEndpoint: API_ENDPOINTS.DOCUMENT_COMPLETE_UPLOAD,
  };

  documents = [uploaded, ...documents];
  return uploaded;
}

export async function getCloudStorageConfig() {
  await delay(200);
  return { ...AWS_STORAGE_CONFIG };
}
