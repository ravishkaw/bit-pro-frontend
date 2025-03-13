import { Flex, Select, Space, Input, Button } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useThemeContext } from "../../contexts/ThemeContext";
const { Search } = Input;

// Title of the table
const TableTitle = ({
  module, // module name (user, employee)
  openFormModal,
  paginationDetails,
  setPaginationDetails,
  privileges, // privilege of the logged user of the module
  handleSearch,
}) => {
  const { isDarkMode } = useThemeContext();
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
          placeholder={`Search ${module}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")} // Clear search results when the input is cleared
          onChange={(e) => e.target.value.length < 1 && handleSearch("")} // Clear search if the input becomes empty
          enterButton={
            <Button type={isDarkMode ? "primary" : "default"}>
              <SearchOutlined />
            </Button>
          }
        />
      </Space>

      {/* Add New Button  */}
      {privileges?.insert_privilege && (
        <Button
          type="primary"
          onClick={() => openFormModal(false)}
          icon={<PlusOutlined />}
        >
          Add new {module}
        </Button>
      )}
    </Flex>
  );
};

export default TableTitle;
