import { createApiService } from "./apiService";
import axiosInstance from "./axiosInstance";

const GUEST_BASE_URL = "/guests";
const ROOM_RESERVATION_BASE_URL = "/room-reservation";
const EVENT_RESERVATION_BASE_URL = "/event-reservation";
const ROOM_RESERVAION_AMENITY_URL = "/room-reservation-amenities";
const ROOM_RESERVAION_AMENITY_CATEGORIES_URL =
  "/room-reservation-amenity-categories";
const ROOM_RESERVATION_STATUS_URL = "/room-reservation-status";
const ROOM_RESERVATION_TYPE_URL = "/room-reservation-types";
const ROOM_RESERVATION_SOURCE_URL = "/room-reservation-sources";

// Generic API service for guests
export const guestService = createApiService(GUEST_BASE_URL);

// Generic API service for room reservations
export const getReservationsToAStatus = async (params) => {
  const response = await axiosInstance.get(ROOM_RESERVATION_BASE_URL, {
    params: {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder === "descend" ? "desc" : "asc",
      searchQuery: params.searchQuery,
      status: params.status,
    },
  });
  return response.data;
};

export const roomReservationService = createApiService(
  ROOM_RESERVATION_BASE_URL
);

export const checkRoomReservationPricing = async (params) => {
  const requestData = {
    roomId: params.roomId,
    checkInDate: params.checkInDate,
    checkOutDate: params.checkOutDate,
    amenities: params.amenities,
    roomPackageId: params.roomPackageId,
    taxId: [1],
  };
  const response = await axiosInstance.post(
    `${ROOM_RESERVATION_BASE_URL}/calculate-pricing`,
    requestData
  );

  return response.data;
};

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

// Generic API service for room reservation status
export const roomReservationStatusService = createApiService(
  ROOM_RESERVATION_STATUS_URL
);

// Generic API service for room reservation types
export const roomReservationTypeService = createApiService(
  ROOM_RESERVATION_TYPE_URL
);

// Generic API service for room reservation sources
export const roomReservationSourceService = createApiService(
  ROOM_RESERVATION_SOURCE_URL
);
