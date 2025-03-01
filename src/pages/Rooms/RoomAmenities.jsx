import useAmenities from "../../hooks/useRoomAmenities";

import GenericPage from "../GenericPage";
import { AmenityColumnItems } from "../../components/Table/AmenityColumnItems";
import RoomAmenityForm from "../../components/Forms/RoomAmenityForm";

const ManageRoomAmenities = () => {
  const module = "Room Amenity"; // Define the module for amenity
  const rowKey = "id"; // define row key for table

  return (
    <GenericPage
      module={module}
      useCustomHook={useAmenities}
      rowKey={rowKey}
      columnItems={AmenityColumnItems}
      CustomForm={RoomAmenityForm}
    />
  );
};

export default ManageRoomAmenities;
