import { Pagination, Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";
import usePageChange from "../../hooks/usePageChange";

import SkeletonCards from "../Cards/SkeletonCards";
import MobileCardSearch from "./MobileCardSearch";
import TableTitle from "../Table/TableTitle";
import UserCard from "../Cards/UserCard";

// Table and card component of users
const UserTableCard = ({
  personType,
  columns,
  rowKey,
  dataSource,
  loading,
  paginationDetails,
  setPaginationDetails,
  openFormModal,
  openDeleteModal,
  handleEdit,
}) => {
  const { isMobile } = useMobileContext();

  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} users`;
  };

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

  //Render Table or a Card Depend on Screen Size Breakpoint : 768px
  if (!isMobile) {
    // Table for desktop view
    return (
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        title={() => (
          <TableTitle
            personType={personType}
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
        scroll={{ x: "max-content" }} // enable horizontal scrolling
        onChange={handlePageChange}
      />
    );
  }

  // cards for mobile view
  return loading ? (
    <SkeletonCards />
  ) : (
    <>
      <MobileCardSearch
        personType={personType}
        openFormModal={openFormModal}
        paginationDetails={paginationDetails}
        handleSearch={handleSearch}
      />

      {/* Card mapping */}
      {dataSource.map((data) => {
        return (
          <UserCard
            key={data.id}
            personType={personType}
            columns={columns}
            data={data}
            openDeleteModal={openDeleteModal}
            handleEdit={handleEdit}
          />
        );
      })}

      {/* Pagination for mobile cards - no sorting */}
      <Pagination
        total={paginationDetails.total}
        current={paginationDetails.current}
        pageSize={paginationDetails.pageSize}
        showSizeChanger
        simple
        pageSizeOptions={["5", "10", "20"]}
        align="center"
        onChange={handleCardPageChange}
      />
    </>
  );
};

export default UserTableCard;
