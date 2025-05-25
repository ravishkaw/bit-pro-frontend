
import GenericPage from "../GenericPage";
import { childColumnItems } from "../../components/Table/ChildColumnItems";
import ChildForm from "../../components/Forms/ChildForm";
import useChildren from "../../hooks/profile/useChildren";

const ManageChildren = () => {
  const childModule = "Child"; // Define the module for child
  const rowKey = "id"; // define row key for table

  const childHookData = useChildren();

  return (
    <GenericPage
      module={childModule}
      rowKey={rowKey}
      hookData={childHookData}
      columnItems={childColumnItems}
      CustomForm={ChildForm}
    />
  );
};

export default ManageChildren;
