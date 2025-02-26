// Import components
import { Pagination, Table, Button, Flex, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Import custom contexts and hooks
import { useMobileContext } from "../../contexts/MobileContext";
import usePageChange from "../../hooks/usePageChange";

// Import components
import TableTitle from "../Table/TableTitle";
import SkeletonCards from "../Cards/SkeletonCards";
import GenericCard from "../Cards/GenericCard";

// Destructure Search from Input component
const { Search } = Input;

// Main component that renders either a table or cards based on screen size
const TableCard = ({
  object, // type of data being displayed (e.g., 'user', 'employee')
  columns, // column configuration for the table
  rowKey, // unique key for each row
  dataSource, // displayed data (e.g., user array)
  privileges, // privilege of the logged user for the module
  loading, // loading state
  paginationDetails, // pagination configuration
  setPaginationDetails,
  openFormModal, // function to open create/edit form modal
  handleView,
  handleEdit,
  openDeleteModal, // function to open delete modal
}) => {
  // Get mobile view status from context
  const { isMobile } = useMobileContext();

  // Format the pagination message
  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} ${object}s`;
  };

  // Get pagination handler functions
  const { handleCardPageChange, handlePageChange } = usePageChange(
    paginationDetails,
    setPaginationDetails
  );

  // Handle search
  const handleSearch = (value) => {
    setPaginationDetails({
      current: 1,
      pageSize: paginationDetails.pageSize,
      sortBy: paginationDetails.sortBy,
      sortOrder: paginationDetails.sortOrder,
      searchQuery: value,
    });
  };

  // Desktop view - render table
  if (!isMobile) {
    return (
      <Table
        columns={columns}
        rowKey={rowKey}
        dataSource={dataSource}
        loading={loading}
        title={() => (
          // Custom table header with search and add button
          <TableTitle
            object={object}
            privileges={privileges}
            openFormModal={openFormModal}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleSearch={handleSearch}
          />
        )}
        pagination={{
          ...paginationDetails,
          showTotal: paginationEntries,
        }}
        scroll={{ x: "max-content" }} // horizontal scrolling
        onChange={handlePageChange} // handles sorting and pagination changes
      />
    );
  }

  // Mobile view - render cards
  return loading ? (
    // Show skeleton loading state
    <SkeletonCards />
  ) : (
    <>
      {/* Mobile view header with search and add button */}
      <Flex justify="space-between" gap="middle" style={{ marginBottom: 10 }}>
        <Search
          placeholder={`Search ${object}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")}
          onChange={(e) => e.target.value < 1 && handleSearch("")} // clear search when input is empty
        />

        {/* Add new item button */}
        <Button type="primary" onClick={() => openFormModal(false)}>
          <PlusOutlined />
          Add new {object}
        </Button>
      </Flex>

      {/* Render card for each data item */}
      {dataSource?.map((data) => {
        return (
          <GenericCard
            key={data.id}
            object={object}
            columns={columns}
            data={data}
            handleView={handleView}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
          />
        );
      })}

      {/* Simplified pagination for mobile view */}
      <Pagination
        total={paginationDetails.total}
        current={paginationDetails.current}
        pageSize={paginationDetails.pageSize}
        showSizeChanger
        simple
        pageSizeOptions={["5", "10", "20"]}
        onChange={handleCardPageChange}
        align="center"
      />
    </>
  );
};

export default TableCard;
