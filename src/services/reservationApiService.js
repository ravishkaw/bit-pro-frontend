import { createApiService } from "./apiService";

const GUEST_BASE_URL = "/guests";

// Generic API service for guests
export const guestService = createApiService(GUEST_BASE_URL);
