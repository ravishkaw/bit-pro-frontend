import { Button, Flex, Input, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

// search bar and add new button component for card view
const SearchAddHeader = ({
  module,
  handleSearch,
  paginationDetails,
  openFormModal,
  privileges, // privilege of the logged user of the module
}) => {
  return (
    <Flex justify="space-between" gap="middle">
      <Search
        placeholder={`Search ${module}`}
        onSearch={handleSearch}
        defaultValue={paginationDetails?.searchQuery || ""}
        allowClear
        onClear={() => handleSearch("")}
        onChange={(e) => e.target.value < 1 && handleSearch("")}
      />
      {/* Add new item button */}
      {privileges?.insert_privilege && (
        <Button type="primary" onClick={() => openFormModal(false)}>
          <PlusOutlined />
          Add New Entry
        </Button>
      )}
    </Flex>
  );
};

export default SearchAddHeader;
