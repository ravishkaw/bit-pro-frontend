import useUsers from "../../hooks/system/useUsers";

import GenericPage from "../GenericPage";
import { userColumnItems } from "../../components/Table/UsersColumnItems";
import UserForm from "../../components/Forms/UserForm";

// Admin Manage Users Page
const ManageUsers = () => {
  const module = "User"; // Define the module type for users
  const rowKey = "username"; // define row key for table

  // Destructure functions and states
  const hookData = useUsers();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={userColumnItems}
      CustomForm={UserForm}
    />
  );
};

export default ManageUsers;
