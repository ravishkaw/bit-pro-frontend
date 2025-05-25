import { PreventiveMaintenanceColumnItems } from "../../components/Table/PreventiveMaintenanceColumnItems";
import PreventiveMaintenanceForm from "../../components/Forms/PreventiveMaintenanceForm";

import GenericPage from "../GenericPage";
import useMaintenance from "../../hooks/room/useMaintenance";

const ManagePreventiveMaintenance = () => {
  const roomTaskModule = "Task";
  const rowKey = "id";
  const rooms = [];

  // Destructure functions and states
  const roomPreventiveMaintenancehookData = useMaintenance();

  return (
    <GenericPage
      module={roomTaskModule}
      hookData={roomPreventiveMaintenancehookData}
      rowKey={rowKey}
      columnItems={PreventiveMaintenanceColumnItems}
      CustomForm={(props) => (
        <PreventiveMaintenanceForm {...props} rooms={rooms} />
      )}
    />
  );
};

export default ManagePreventiveMaintenance;
