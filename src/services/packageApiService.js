import { createApiService } from "./apiService";

const ROOM_PACKAGES_BASE_URL = "/room-packages";
const EVENT_PACKAGES_BASE_URL = "/event-packages";

// Generic API service for room packages
export const roomPackageService = createApiService(ROOM_PACKAGES_BASE_URL);

// Generic API service for event packages
export const eventPackageService = createApiService(EVENT_PACKAGES_BASE_URL);
