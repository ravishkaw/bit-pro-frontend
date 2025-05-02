import { createApiService } from "./apiService";

const BILLING_BASE_URL = "/billing";
const PAYMENT_STATUS_URL = "/payment-status";
const PAYMENT_METHOD_URL = "/payment-methods";

// Generic API service for billing
export const billingService = createApiService(BILLING_BASE_URL);

// Generic API service for payment status
export const paymentStatusService = createApiService(PAYMENT_STATUS_URL);

// Generic API service for payment methods
export const paymentMethodService = createApiService(PAYMENT_METHOD_URL);
