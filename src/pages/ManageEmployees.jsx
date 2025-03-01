import useEmployees from "../hooks/useEmployees";

import GenericPage from "./GenericPage";
import { employeeColumnItems } from "../components/Table/EmployeeColumnItems";
import ProfileFormModal from "../components/Modals/ProfileFormModal";
import ViewPerson from "../components/Descriptions/ViewPerson";

// Admin Manage Employees Page
const ManageEmployee = () => {
  const module = "Employee"; // Define the module for employees
  const rowKey = "empNo"; // define row key for table

  return (
    <GenericPage
      module={module}
      useCustomHook={useEmployees}
      rowKey={rowKey}
      columnItems={employeeColumnItems}
      CustomForm={ProfileFormModal}
      showView={true}
      ViewObject={ViewPerson}
    />
  );
};

export default ManageEmployee;
