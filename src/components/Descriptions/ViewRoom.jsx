import { Button, Divider, Flex, Space, Typography } from "antd";
import usePrintContent from "../../hooks/usePrintContent";
import dayjs from "dayjs";

import { capitalize, formatText } from "../../utils/textUtils";
import DescriptionsSection from "./DescriptionsSection";
import { useEffect } from "react";

const { Title } = Typography;

// Modal of view room
const ViewRoom = ({
  object,
  selectedRoom,
  privileges,
  closeViewModal,
  handleEdit,
  loadOneRoom,
}) => {
  // React print configuration
  const { contentRef, printFn } = usePrintContent();

  // All value mappings for room details
  const roomInfo = [
    { key: "1", label: "Room Number", value: selectedRoom?.roomNumber },
    { key: "2", label: "Capacity", value: selectedRoom?.capacity },
    { key: "3", label: "Floor Number", value: selectedRoom?.floorNumber },
    { key: "4", label: "Description", value: selectedRoom?.description },
    {
      key: "5",
      label: "Status",
      value: selectedRoom?.status?.name,
    },
    {
      key: "6",
      label: "Room Type",
      value: selectedRoom?.roomType?.name,
    },
    {
      key: "7",
      label: "Base Price",
      value: `$${selectedRoom?.roomType?.basePrice}`,
    },
    {
      key: "8",
      label: "Room Type Description",
      value: selectedRoom?.roomType?.description,
    },
  ];

  const pricingRules = selectedRoom?.roomType?.pricingRules?.map(
    (rule, index) => ({
      key: `pricing-${index}`,
      label: `Pricing Rule ${index + 1}`,
      value: `${rule.description} (${dayjs(rule.startDate).format(
        "YYYY-MM-DD"
      )} to ${dayjs(rule.endDate).format("YYYY-MM-DD")}) - Multiplier: ${
        rule.pricingMultiplier
      }`,
    })
  );

  const inventory = selectedRoom?.inventory?.map((item, index) => ({
    key: `inventory-${index}`,
    label: item.itemName,
    value: `Quantity: ${item.quantity}, Last Checked: ${dayjs(
      item.lastCheckedDate
    ).format("YYYY-MM-DD")}, Status: ${item.status}`,
  }));

  const amenities = selectedRoom?.amenity?.map((amenity, index) => ({
    key: `amenity-${index}`,
    label: amenity.name,
    value: `${amenity.description}`,
  }));

  return (
    <>
      <div ref={contentRef}>
        <Title level={3}>{`${capitalize(object)} Details - Room ${
          selectedRoom?.roomNumber
        }`}</Title>
        <Divider />
        <DescriptionsSection title={"Room Information"} data={roomInfo} />
        {pricingRules && pricingRules.length > 0 && (
          <>
            <Divider />
            <DescriptionsSection title={"Pricing Rules"} data={pricingRules} />
          </>
        )}
        {inventory && inventory.length > 0 && (
          <>
            <Divider />
            <DescriptionsSection title={"Inventory"} data={inventory} />
          </>
        )}
        {amenities && amenities.length > 0 && (
          <>
            <Divider />
            <DescriptionsSection title={"Amenities"} data={amenities} />
          </>
        )}
      </div>

      <Divider />
      <Flex justify="space-between">
        {privileges.update_privilege ? (
          <Button
            onClick={() => {
              handleEdit(loadOneRoom, selectedRoom?.id);
              closeViewModal();
            }}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <span></span>
        )}
        <Space>
          <Button onClick={() => closeViewModal()}>Close</Button>
          <Button color="primary" variant="solid" onClick={() => printFn()}>
            Print
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default ViewRoom;
