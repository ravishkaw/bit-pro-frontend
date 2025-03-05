import { createApiService } from "./apiService";

const Inventory_BASE_URL = "/inventory";

// Generic API service for inventory
export const inventoryService = createApiService(Inventory_BASE_URL);
