// Cloud storage + documents service. Mock now, API-ready later.

import { mockStorageUsage } from "@/lib/mockData";
import { delay /*, request, API_ENDPOINTS */ } from "./apiClient";
import { getDocuments as getMockDocuments } from "./documentService";

/**
 * GET /api/storage/usage
 * @returns {Promise<{ usedGB, limitGB, documentCount, folderCount }>}
 */
export async function getStorageUsage() {
  // Real: return request(API_ENDPOINTS.STORAGE_USAGE);
  await delay(400);
  return { ...mockStorageUsage };
}

/**
 * GET /api/documents
 * Placeholder for the future document management module.
 */
export async function getDocuments() {
  // Real: return request(API_ENDPOINTS.DOCUMENTS);
  return getMockDocuments();
}
