import useRoomTypes from "../../hooks/useRoomsTypes";

import GenericPage from "../GenericPage";
import { RoomTypeColumns } from "../../components/Table/RoomTypeColumnItems";
import RoomTypeForm from "../../components/Forms/RoomTypeForm";

// Room Types page
const ManageRoomTypes = () => {
  const module = "Room Type"; // Define the module type for room type
  const rowKey = "id"; // define row key for table

  return (
    <GenericPage
      module={module}
      useCustomHook={useRoomTypes}
      rowKey={rowKey}
      columnItems={RoomTypeColumns}
      CustomForm={RoomTypeForm}
    />
  );
};

export default ManageRoomTypes;
