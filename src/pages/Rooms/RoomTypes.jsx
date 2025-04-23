import { useState } from "react";
import { Modal } from "antd";

import { useThemeContext } from "../../contexts/ThemeContext";

import useRoomTypes from "../../hooks/room/useRoomsTypes";
import usePricingRules from "../../hooks/room/usePricingRules";

import GenericPage from "../GenericPage";
import RoomTypeForm from "../../components/Forms/RoomTypeForm";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";
import { RoomTypeColumns } from "../../components/Table/RoomTypeColumnItems";
import { PricingRulesColumnItems } from "../../components/Table/RoomPricingRuleColumnItems";
import RoomTypeStatistics from "../../components/Statistics/RoomTypeStatistics";

// Room Types page
const ManageRoomTypes = () => {
  const [ruleModalOpen, setRuleModalOpen] = useState(false);

  const { isDarkMode } = useThemeContext();

  const roomTypemodule = "Room Type"; // Define the module type for room type
  const pricingRulemodule = "Room Pricing Rule"; // Define the module type for pricing rule
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const roomTypeHookData = useRoomTypes();
  const pricingRuleHookData = usePricingRules();

  const openModal = () => setRuleModalOpen(true);
  const closeModal = () => setRuleModalOpen(false);

  return (
    <>
      <RoomTypeStatistics
        roomTypeHookData={roomTypeHookData}
        pricingRuleHookData={pricingRuleHookData}
        openModal={openModal}
      />

      {/* Room type page table */}
      <GenericPage
        module={roomTypemodule}
        hookData={roomTypeHookData}
        rowKey={rowKey}
        columnItems={RoomTypeColumns}
        CustomForm={RoomTypeForm}
      />

      {/* Modal of pricing rules */}
      <Modal
        title="Seasonal Pricing Rules"
        open={ruleModalOpen}
        onCancel={closeModal}
        width={850}
        footer={null}
        styles={{
          header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
          content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        }}
      >
        <GenericPage
          module={pricingRulemodule}
          hookData={pricingRuleHookData}
          rowKey={rowKey}
          columnItems={PricingRulesColumnItems}
          CustomForm={RoomPricingRuleForm}
        />
      </Modal>
    </>
  );
};

export default ManageRoomTypes;
