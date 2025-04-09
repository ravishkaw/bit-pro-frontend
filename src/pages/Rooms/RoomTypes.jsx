import { useState } from "react";
import { Button, Card, Col, Flex, Modal, Row, Statistic } from "antd";

import { useThemeContext } from "../../contexts/ThemeContext";

import useRoomTypes from "../../hooks/useRoomsTypes";
import usePricingRules from "../../hooks/usePricingRules";

import GenericPage from "../GenericPage";
import RoomTypeForm from "../../components/Forms/RoomTypeForm";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";
import { RoomTypeColumns } from "../../components/Table/RoomTypeColumnItems";
import { PricingRulesColumnItems } from "../../components/Table/RoomPricingRuleColumnItems";

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
      {/* Statistic cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Total Room Types"
              value={roomTypeHookData?.data?.length || 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Total Active Room Types"
              value={roomTypeHookData?.data?.length || 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title="Total Bed Types"
              value={roomTypeHookData?.additionalData?.bedTypes?.length || 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col lg={6} xs={12}>
          <Card variant="borderless" style={{ height: "100%" }}>
            <Statistic
              title={
                <Flex justify="space-between" wrap>
                  Total Pricing Rules
                  <Button type="dashed" size="small" onClick={openModal}>
                    Manage
                  </Button>
                </Flex>
              }
              value={pricingRuleHookData?.data?.length || 0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

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
