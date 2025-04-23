import { createApiService } from "./apiService";

const GUEST_BASE_URL = "/guests";
const ROOM_RESERVATION_BASE_URL = "/room-reservation";
const EVENT_RESERVATION_BASE_URL = "/event-reservation";
const ROOM_RESERVAION_AMENITY_URL = "/room-reservation-amenities";
const ROOM_RESERVAION_AMENITY_CATEGORIES_URL =
  "/room-reservation-amenity-categories";

// Generic API service for guests
export const guestService = createApiService(GUEST_BASE_URL);

// Generic API service for room reservations
export const roomReservationService = createApiService(
  ROOM_RESERVATION_BASE_URL
);

// Generic API service for event reservations
export const eventReservationService = createApiService(
  EVENT_RESERVATION_BASE_URL
);

// Generic API service for room reservation amenities
export const roomReservationAmenityService = createApiService(
  ROOM_RESERVAION_AMENITY_URL
);
// Generic API service for room reservation amenities
export const roomReservationAmenityCategoryService = createApiService(
  ROOM_RESERVAION_AMENITY_CATEGORIES_URL
);
