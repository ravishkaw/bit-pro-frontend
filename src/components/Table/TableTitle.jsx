import { Flex, Select, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

// Title component for the table
const TableTitle = ({
  object, // The type of object ("user", "employee")
  openFormModal,
  paginationDetails,
  setPaginationDetails,
  handleSearch, // Function to handle search
}) => {
  // Handle changes in the page size dropdown
  const handlePageSizeChange = (value) => {
    setPaginationDetails({
      current: 1, // Reset to the first page when changing page size
      pageSize: Number(value),
      sortBy: paginationDetails.sortBy,
      sortOrder: paginationDetails.sortOrder,
      searchQuery: paginationDetails.searchQuery || "", // Preserve search query
    });
  };

  return (
    <Flex justify="space-between" align="center" gap="middle">
      {/* Left Section*/}
      <Space size="large">
        {/* Pagination Dropdown */}
        <Select
          defaultValue={
            paginationDetails ? `${paginationDetails.pageSize}` : "10"
          }
          options={[
            { value: "5", label: "5 / page" },
            { value: "10", label: "10 / page" },
            { value: "20", label: "20 / page" },
          ]}
          onChange={handlePageSizeChange}
        />

        {/* Search Bar */}
        <Search
          placeholder={`Search ${object}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")} // Clear search results when the input is cleared
          onChange={(e) => e.target.value.length < 1 && handleSearch("")} // Clear search if the input becomes empty
        />
      </Space>

      {/* Right Section*/}
      {/* Add New Button  */}
      <Button
        type="primary"
        onClick={() => openFormModal(false)}
        icon={<PlusOutlined />}
      >
        Add new {object}
      </Button>
    </Flex>
  );
};

export default TableTitle;
