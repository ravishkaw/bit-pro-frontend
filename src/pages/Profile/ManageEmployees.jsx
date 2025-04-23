import useEmployees from "../../hooks/profile/useEmployees";

import GenericPage from "../GenericPage";
import { employeeColumnItems } from "../../components/Table/EmployeeColumnItems";
import ProfileFormModal from "../../components/Modals/ProfileFormModal";
import ViewPerson from "../../components/DataDisplay/ViewPerson";

// Admin Manage Employees Page
const ManageEmployee = () => {
  const module = "Employee"; // Define the module for employees
  const rowKey = "empNo"; // define row key for table

  // Destructure functions and states
  const hookData = useEmployees();

  return (
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={employeeColumnItems}
      CustomForm={ProfileFormModal}
      showView={true}
      ViewObject={ViewPerson}
    />
  );
};

export default ManageEmployee;
