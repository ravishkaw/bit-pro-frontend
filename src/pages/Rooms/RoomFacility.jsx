import useRoomFacilities from "../../hooks/room/useRoomFacilities";
import GenericPage from "../GenericPage";
import { RoomFacilitiesColumnItems } from "../../components/Table/RoomFacilitiesColumnItems";
import RoomFacilityForm from "../../components/Forms/RoomFacilityForm";

const RoomFacility = () => {
  let roomFacilityModule = "Room Facility";
  const rowKey = "id";

  const roomFacilityhookData = useRoomFacilities();

  return (
    <GenericPage
      module={roomFacilityModule}
      hookData={roomFacilityhookData}
      rowKey={rowKey}
      columnItems={RoomFacilitiesColumnItems}
      CustomForm={RoomFacilityForm}
    />
  );
};
export default RoomFacility;
