import {
  Card,
  Flex,
  Button,
  Space,
  Select,
  Typography,
  Input,
  Slider,
  InputNumber,
  Popover,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DollarOutlined,
  UserOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

const RoomFilter = ({
  mappedRoomTypes,
  roomStatus,
  modulePrivileges,
  openFormModal,
}) => {
  const { isDarkMode } = useThemeContext();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [capacity, setCapacity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCapacityChange = (type, value) => {
    setCapacity((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const priceContent = (
    <Space direction="vertical" style={{ width: 250 }}>
      <Flex align="center" gap="small">
        <InputNumber
          min={0}
          max={10000}
          value={priceRange[0]}
          onChange={(value) => handlePriceChange([value, priceRange[1]])}
          style={{ width: "100px" }}
        />
        <Typography.Text>to</Typography.Text>
        <InputNumber
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={(value) => handlePriceChange([priceRange[0], value])}
          style={{ width: "100px" }}
        />
      </Flex>
      <Slider
        range
        min={0}
        max={2000}
        value={priceRange}
        onChange={handlePriceChange}
      />
    </Space>
  );

  const capacityContent = (
    <Space>
      <Space direction="vertical" size="small">
        <Typography.Text>Adults</Typography.Text>
        <InputNumber
          min={1}
          max={10}
          value={capacity.adults}
          onChange={(value) => handleCapacityChange("adults", value)}
        />
      </Space>
      <Space direction="vertical" size="small">
        <Typography.Text>Children</Typography.Text>
        <InputNumber
          min={0}
          max={10}
          value={capacity.children}
          onChange={(value) => handleCapacityChange("children", value)}
        />
      </Space>
      <Space direction="vertical" size="small">
        <Typography.Text>Infants</Typography.Text>
        <InputNumber
          min={0}
          max={5}
          value={capacity.infants}
          onChange={(value) => handleCapacityChange("infants", value)}
        />
      </Space>
    </Space>
  );

  return (
    <Card
      variant="borderless"
      style={{
        position: "sticky",
        top: 64,
        zIndex: 1,
        marginBottom: 16,
        background: !isDarkMode ? "#f5f5f5" : "#000",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <Flex align="center" justify="space-between" gap={8} wrap>
        <Space wrap>
          <FilterOutlined style={{ fontSize: "1.25rem" }} />
          <Select
            placeholder="By Room Type"
            options={mappedRoomTypes}
            allowClear
            style={{ width: 150 }}
          />
          <Select
            placeholder="By Availability"
            options={roomStatus}
            allowClear
            style={{ width: 150 }}
          />
          <Popover
            content={priceContent}
            title="Price Range"
            trigger="click"
            placement="bottom"
          >
            <Button icon={<DollarOutlined />}>
              Price: ${priceRange[0]}-${priceRange[1]}
            </Button>
          </Popover>
          <Popover
            content={capacityContent}
            title="Room Capacity"
            trigger="click"
            placement="bottom"
          >
            <Button icon={<UserOutlined />}>
              Guests: {capacity.adults + capacity.children} + {capacity.infants}{" "}
              infant{capacity.infants !== 1 ? "s" : ""}
            </Button>
          </Popover>
        </Space>
        <Space align="center">
          <Input.Search
            allowClear
            placeholder="Search rooms"
            style={{ width: 250 }}
            enterButton={
              <Button>
                <SearchOutlined />
              </Button>
            }
          />
          {modulePrivileges?.insert_privilege && (
            <Button
              type="primary"
              onClick={() => openFormModal(false)}
              icon={<PlusOutlined />}
            >
              Room
            </Button>
          )}
        </Space>
      </Flex>
    </Card>
  );
};

export default RoomFilter;
