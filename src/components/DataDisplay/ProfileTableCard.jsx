import { Pagination, Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";
import usePageChange from "../../hooks/usePageChange";

import SkeletonCards from "../Cards/SkeletonCards";
import ProfileCard from "../Cards/ProfileCard";
import TableTitle from "../Table/TableTitle";
import MobileCardSearch from "./MobileCardSearch";

// Table and card component of profiles
const ProfileTableCard = ({
  personType,
  columns,
  rowKey,
  dataSource,
  loading,
  paginationDetails,
  setPaginationDetails,
  openFormModal,
  handleView,
  handleEdit,
  openDeleteModal,
  restorePerson,
}) => {
  const { isMobile } = useMobileContext();

  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} employees`;
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
    return (
      // Table for desktop view
      <Table
        columns={columns}
        rowKey={rowKey}
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
      {dataSource?.map((data) => {
        return (
          <ProfileCard
            key={data.id}
            personType={personType}
            columns={columns}
            data={data}
            handleView={handleView}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
            restorePerson={restorePerson}
          />
        );
      })}

      {/* pagination for mobile cards - no sorting*/}
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

export default ProfileTableCard;
