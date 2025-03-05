import useRoomFacilities from "../../hooks/useRoomFacilities";

import GenericPage from "../GenericPage";
import { RoomFacilitiesColumnItems } from "../../components/Table/RoomFacilitiesColumnItems";
import RoomFacilityForm from "../../components/Forms/RoomFacilityForm";

const RoomFacilities = () => {
  const module = "Room Facility"; // Define the module for room facilities
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useRoomFacilities();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={RoomFacilitiesColumnItems}
      CustomForm={RoomFacilityForm}
    />
  );
};

export default RoomFacilities;
