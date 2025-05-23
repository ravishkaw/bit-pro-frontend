import { Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";
import { useThemeContext } from "../../contexts/ThemeContext";

import usePageChange from "../../hooks/common/usePageChange";

import TableTitle from "../Table/TableTitle";
import SkeletonCards from "../Cards/SkeletonCards";
import MobileCardView from "./MobileCardView";

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
  showView, // To show view button
}) => {
  const { isMobile } = useMobileContext();
  const { isDarkMode } = useThemeContext();

  // Format the pagination message
  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total}`;
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
        style={{
          borderRadius: 8,
          border: isDarkMode ? "1px solid #303030" : "1px solid #f0f0f0",
        }}
      />
    );
  }

  // Mobile view - render cards
  return loading ? (
    // Show skeleton loading state
    <SkeletonCards />
  ) : (
    <MobileCardView
      isDarkMode={isDarkMode}
      module={module}
      privileges={privileges}
      handleSearch={handleSearch}
      paginationDetails={paginationDetails}
      openFormModal={openFormModal}
      dataSource={dataSource}
      columns={columns}
      handleView={handleView}
      handleEdit={handleEdit}
      opendeleteRestoreModal={opendeleteRestoreModal}
      loadOneItem={loadOneItem}
      showView={showView}
      handleCardPageChange={handleCardPageChange}
    />
  );
};

export default TableCard;
