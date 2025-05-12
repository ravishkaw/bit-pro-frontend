import { checkRoomReservationPricing } from "../services/reservationApiService";

// calculate room reservation pricing
export const calculateRoomReservationPrice = async (
  roomId,
  checkInDate,
  checkOutDate,
  selectedAmenities,
  selectedPackage,
  setPricingLoading,
  setPricingInformation
) => {
  setPricingLoading(true);
  try {
    // Validate required data
    if (!roomId || !checkInDate || !checkOutDate || !selectedPackage) {
      console.error("Missing required reservation details");
      setPricingLoading(false);
      return null;
    }

    // Format dates
    const formattedCheckInDate =
      checkInDate.hour() !== 0 || checkInDate.minute() !== 0
        ? checkInDate.format("YYYY-MM-DDTHH:mm:ss")
        : checkInDate.format("YYYY-MM-DD") + "T14:00:00";

    const formattedCheckOutDate =
      checkOutDate.hour() !== 0 || checkOutDate.minute() !== 0
        ? checkOutDate.format("YYYY-MM-DDTHH:mm:ss")
        : checkOutDate.format("YYYY-MM-DD") + "T10:00:00";

    // Process amenities
    const formattedAmenities = selectedAmenities.map((amenity) => ({
      amenityId: amenity.amenityId || amenity.id,
      quantity: amenity.quantity,
    }));

    // Call API through the hook function
    const resp = await checkRoomReservationPricing({
      roomId: roomId,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      amenities: formattedAmenities,
      roomPackageId: selectedPackage,
    });

    // Update state with pricing data
    setPricingInformation(resp);
    return resp;
  } catch (error) {
    console.error("Error calculating pricing:", error);
    return null;
  } finally {
    setPricingLoading(false);
  }
};
