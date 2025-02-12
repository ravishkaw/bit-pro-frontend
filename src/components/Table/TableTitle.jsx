import { Flex, Select, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

// Title component of table with select pagination, search and add new
const TableTitle = ({
  personType,
  openFormModal,
  paginationDetails,
  setPaginationDetails,
  handleSearch,
}) => {
  // Handle pagination with select tag
  const handlePageSizeChange = (value) => {
    setPaginationDetails({
      current: 1,
      pageSize: Number(value),
      sortBy: paginationDetails.sortBy,
      sortOrder: paginationDetails.sortOrder,
      searchQuery: paginationDetails.searchQuery || "",
    });
  };

  return (
    <Flex justify="space-between" align="center" gap="middle">
      <Space size="large">
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
        <Search
          placeholder={`Search ${personType}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")}
          onChange={(e) => e.target.value < 1 && handleSearch("")}
        />
      </Space>
      <Button
        type="primary"
        onClick={() => openFormModal(false)}
        icon={<PlusOutlined />}
      >
        Add new {personType}
      </Button>
    </Flex>
  );
};

export default TableTitle;
