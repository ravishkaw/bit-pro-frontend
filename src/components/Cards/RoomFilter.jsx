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
import { useState, useEffect } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

const RoomFilter = ({
  mappedRoomTypes,
  roomStatus,
  modulePrivileges,
  openFormModal,
  onFilter,
  filters,
}) => {
  const { isDarkMode } = useThemeContext();
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [capacity, setCapacity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Initialize from existing filters if available
  useEffect(() => {
    if (filters) {
      if (filters.minPrice !== null && filters.maxPrice !== null) {
        setPriceRange([filters.minPrice, filters.maxPrice]);
      }
      if (
        filters.adults !== null ||
        filters.children !== null ||
        filters.infants !== null
      ) {
        setCapacity({
          adults: filters.adults || 1,
          children: filters.children || 0,
          infants: filters.infants || 0,
        });
      }
      if (filters.roomTypeId !== null) {
        setSelectedRoomType(filters.roomTypeId);
      }
      if (filters.statusId !== null) {
        setSelectedStatus(filters.statusId);
      }
      if (filters.searchQuery) {
        setSearchValue(filters.searchQuery);
      }
    }
  }, [filters]);

  // Handle changes in the room type and status select fields
  const handleRoomTypeChange = (value) => {
    setSelectedRoomType(value);
    onFilter({ roomTypeId: value });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilter({ statusId: value });
  };

  // Handle changes in the search input field
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length < 1) {
      onFilter({ searchQuery: null });
    }
  };

  // Handle search button click
  const handleSearch = () => {
    onFilter({ searchQuery: searchValue || null });
  };

  // Handle changes in the price range slider and input fields
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    onFilter({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  // Handle changes in the capacity input fields
  const handleCapacityChange = (type, value) => {
    setCapacity((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const applyCapacityFilter = () => {
    onFilter({
      adults: capacity.adults,
      children: capacity.children,
      infants: capacity.infants,
    });
  };

  // Reset all filters to their default values
  const resetFilters = () => {
    setPriceRange([0, 15000]);
    setCapacity({ adults: 1, children: 0, infants: 0 });
    setSearchValue("");
    setSelectedRoomType(null);
    setSelectedStatus(null);
    onFilter({
      roomTypeId: null,
      statusId: null,
      minPrice: null,
      maxPrice: null,
      adults: null,
      children: null,
      infants: null,
      searchQuery: null,
    });
  };

  const priceContent = (
    <Space direction="vertical" style={{ width: 250 }}>
      <Flex align="center" gap="small">
        <InputNumber
          min={0}
          max={15000}
          value={priceRange[0]}
          onChange={(value) => handlePriceChange([value, priceRange[1]])}
          style={{ width: "100px" }}
        />
        <Typography.Text>to</Typography.Text>
        <InputNumber
          min={0}
          max={15000}
          value={priceRange[1]}
          onChange={(value) => handlePriceChange([priceRange[0], value])}
          style={{ width: "100px" }}
        />
      </Flex>
      <Slider
        range
        min={0}
        max={15000}
        value={priceRange}
        onChange={handlePriceChange}
      />
      <Button type="primary" onClick={applyPriceFilter}>
        Apply
      </Button>
    </Space>
  );

  const capacityContent = (
    <Space direction="vertical">
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
      <Button type="primary" onClick={applyCapacityFilter}>
        Apply
      </Button>
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
        overflow: "auto",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={8}
        style={{ minWidth: "900px" }}
      >
        <Space size="small" style={{ flexShrink: 0 }}>
          <FilterOutlined style={{ fontSize: "1.25rem" }} />
          <Select
            placeholder="By Room Type"
            options={mappedRoomTypes}
            allowClear
            style={{ width: 130 }}
            value={selectedRoomType}
            onChange={handleRoomTypeChange}
          />
          <Select
            placeholder="By Availability"
            options={roomStatus}
            allowClear
            style={{ width: 130 }}
            value={selectedStatus}
            onChange={handleStatusChange}
          />
          <Popover
            content={priceContent}
            title="Price Range"
            trigger="click"
            placement="bottom"
          >
            <Button
              icon={<DollarOutlined />}
              size="middle"
              style={{ whiteSpace: "nowrap" }}
            >
              {priceRange[0]}-{priceRange[1]}
            </Button>
          </Popover>
          <Popover
            content={capacityContent}
            title="Room Capacity"
            trigger="click"
            placement="bottom"
          >
            <Button
              icon={<UserOutlined />}
              size="middle"
              style={{ whiteSpace: "nowrap" }}
            >
              {capacity.adults + capacity.children} + {capacity.infants}
            </Button>
          </Popover>
          {Object.values(filters).some((val) => val !== null) && (
            <Button onClick={resetFilters} size="middle">
              Clear
            </Button>
          )}
        </Space>
        <Space align="center" style={{ flexShrink: 0 }}>
          <Input.Search
            allowClear
            placeholder="Search rooms"
            style={{ width: 200 }}
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            onClear={() => onFilter({ searchQuery: null })}
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
