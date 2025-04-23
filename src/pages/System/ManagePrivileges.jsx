import usePrivileges from "../../hooks/system/usePrivileges";

import GenericPage from "../GenericPage";
import PrivilegeColumnItems from "../../components/Table/PrivilegeColumnItems";
import PrivilegeForm from "../../components/Forms/PrivilegeForm";

// Admin Manage Privileges Page
const ManagePrivileges = () => {
  const module = "Privilege"; // Define the module for privileges
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = usePrivileges();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={PrivilegeColumnItems}
      CustomForm={PrivilegeForm}
    />
  );
};

export default ManagePrivileges;
