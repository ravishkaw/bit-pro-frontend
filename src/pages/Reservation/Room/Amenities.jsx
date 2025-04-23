import useRoomReservationAmenities from "../../../hooks/reservation/useRoomReservationAmenities";

import GenericPage from "../../GenericPage";
import RoomReservationAmenityForm from "../../../components/Forms/RoomReservationAmenityForm";
import { RoomReservationAmenityColumnItems } from "../../../components/Table/RoomReservationAmenityColumnItems";

const Amenities = () => {
  const module = "Room Reservation Amenity"; // Define the module for guest
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useRoomReservationAmenities();

  return (
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={RoomReservationAmenityColumnItems}
      CustomForm={RoomReservationAmenityForm}
    />
  );
};
export default Amenities;
