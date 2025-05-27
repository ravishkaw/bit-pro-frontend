import { PreventiveMaintenanceColumnItems } from "../../components/Table/PreventiveMaintenanceColumnItems";
import PreventiveMaintenanceForm from "../../components/Forms/PreventiveMaintenanceForm";

import GenericPage from "../GenericPage";
import useMaintenance from "../../hooks/tasks/useMaintenance";

const ManagePreventiveMaintenance = () => {
  const taskModule = "Task";
  const rowKey = "id";

  // Destructure functions and states
  const hookData = useMaintenance();

  return (
    <GenericPage
      module={taskModule}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={PreventiveMaintenanceColumnItems}
      CustomForm={PreventiveMaintenanceForm}
    />
  );
};

export default ManagePreventiveMaintenance;
