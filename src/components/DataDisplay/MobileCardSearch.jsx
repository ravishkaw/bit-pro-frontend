import { Button, Flex, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;

// Search and add button of mobile view cards
const MobileCardSearch = ({
  personType,
  openFormModal,
  paginationDetails,
  handleSearch,
}) => {
  return (
    <Flex justify="space-between" gap="middle" style={{ marginBottom: 10 }}>
      <Search
        placeholder={`Search ${personType}`}
        onSearch={handleSearch}
        defaultValue={paginationDetails?.searchQuery || ""}
        allowClear
        onClear={() => handleSearch("")}
        onChange={(e) => e.target.value < 1 && handleSearch("")} // input value < 0 ; calls the handle search
      />

      <Button type="primary" onClick={() => openFormModal(false)}>
        <PlusOutlined />
        Add new {personType}
      </Button>
    </Flex>
  );
};

export default MobileCardSearch;
