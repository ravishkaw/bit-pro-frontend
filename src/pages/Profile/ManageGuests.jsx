import useGuests from "../../hooks/profile/useGuests";

import GenericPage from "../GenericPage";
import { guestColumnItems } from "../../components/Table/GuestColumnItems";
import ProfileFormModal from "../../components/Modals/ProfileFormModal";
import ViewPerson from "../../components/DataDisplay/ViewPerson";
import { Modal } from "antd";
import { childColumnItems } from "../../components/Table/ChildColumnItems";
import ChildForm from "../../components/Forms/ChildForm";
import useChildren from "../../hooks/profile/useChildren";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import GuestStatistics from "../../components/Statistics/GuestStatistics";

const ManageGuests = () => {
  const [childModalOpen, setChildModalOpen] = useState(false);

  const guestModule = "Guest"; // Define the module for guest
  const childModule = "Child"; // Define the module for child
  const rowKey = "id"; // define row key for table

  const { isDarkMode } = useThemeContext();
  const guestHookData = useGuests();
  const childHookData = useChildren();  

  const openChildModal = () => setChildModalOpen(true);
  const closeChildModal = () => setChildModalOpen(false);

  return (
    <>
      <GuestStatistics
        guestHookData={guestHookData}
        childHookData={childHookData}
        openModal={openChildModal}
      />
      <GenericPage
        module={guestModule}
        rowKey={rowKey}
        hookData={guestHookData}
        columnItems={guestColumnItems}
        CustomForm={ProfileFormModal}
        showView={true}
        ViewObject={ViewPerson}
      />

      <Modal
        title="Manage Children"
        open={childModalOpen}
        onCancel={closeChildModal}
        width={850}
        footer={null}
        styles={{
          header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
          content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        }}
      >
        <GenericPage
          module={childModule}
          rowKey={rowKey}
          hookData={childHookData}
          columnItems={childColumnItems}
          CustomForm={ChildForm}
        />
      </Modal>
    </>
  );
};

export default ManageGuests;
