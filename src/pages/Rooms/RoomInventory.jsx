import useRoomInventory from "../../hooks/room/useRoomInventory";

import GenericPage from "../GenericPage";
import { RoomInventoryColumnItems } from "../../components/Table/RoomInventoryColumnItems";
import RoomInventoryForm from "../../components/Forms/RoomInventoryForm";

const ManageRoomInventory = () => {
  const module = "Room Inventory"; // Define the module for room inventory
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useRoomInventory();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={RoomInventoryColumnItems}
      CustomForm={RoomInventoryForm}
    />
  );
};

export default ManageRoomInventory;
