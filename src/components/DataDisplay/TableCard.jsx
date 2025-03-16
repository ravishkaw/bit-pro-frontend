import { Pagination, Table, Button, Flex, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useMobileContext } from "../../contexts/MobileContext";
import usePageChange from "../../hooks/usePageChange";

import TableTitle from "../Table/TableTitle";
import SkeletonCards from "../Cards/SkeletonCards";
import GenericCard from "../Cards/GenericCard";
import Styles from "../../constants/Styles";

const { Search } = Input;

// render table or cards based on screen size
const TableCard = ({
  module, // module name (user, employee)
  columns, // columns of the table
  rowKey, // key for table
  dataSource, // data (user array)
  privileges, // privilege of the logged user for the module
  loading, // loading state
  paginationDetails, // pagination configuration
  setPaginationDetails,
  handleView,
  handleEdit,
  openFormModal, // function to open create/edit form modal
  opendeleteRestoreModal, // function to open delete / restore modal
  loadOneItem, // Load single object funtion (loadOneEmployee)
}) => {
  const { isMobile } = useMobileContext();

  // Format the pagination message
  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} ${module}s`;
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

  const { boxShadow } = Styles(); // box shadow property

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
            module={module}
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
        onChange={handlePageChange}
        style={{ ...boxShadow, borderRadius: 8 }}
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
          placeholder={`Search ${module}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")}
          onChange={(e) => e.target.value < 1 && handleSearch("")} // clear search when input is empty
        />

        {/* Add new item button */}
        <Button type="primary" onClick={() => openFormModal(false)}>
          <PlusOutlined />
          Add New Entry
        </Button>
      </Flex>

      {/* Render card for each data item */}
      {dataSource?.map((data) => {
        return (
          <GenericCard
            key={data.id}
            module={module}
            columns={columns}
            data={data}
            handleView={handleView}
            handleEdit={handleEdit}
            opendeleteRestoreModal={opendeleteRestoreModal}
            loadOneItem={loadOneItem}
            privileges={privileges}
          />
        );
      })}

      {/* pagination for mobile view */}
      <Pagination
        total={paginationDetails?.total || dataSource?.length}
        current={paginationDetails?.current}
        pageSize={paginationDetails?.pageSize}
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
