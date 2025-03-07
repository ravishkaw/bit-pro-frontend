import useGuests from "../../hooks/useGuests";

import GenericPage from "../GenericPage";
import { guestColumnItems } from "../../components/Table/GuestColumnItems";
import ProfileFormModal from "../../components/Modals/ProfileFormModal";
import ViewPerson from "../../components/Descriptions/ViewPerson";

const ManageGuests = () => {
  const module = "Guest"; // Define the module for guest
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useGuests();

  return (
    <GenericPage
      module={module}
      rowKey={rowKey}
      hookData={hookData}
      columnItems={guestColumnItems}
      CustomForm={ProfileFormModal}
      showView={true}
      ViewObject={ViewPerson}
    />
  );
};

export default ManageGuests;
