import { Pagination, Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";

import SkeletonCards from "../Cards/SkeletonCards";
import ProfileCard from "../Cards/ProfileCard";

const ProfileTableCard = ({
  personType,
  columns,
  rowKey,
  dataSource,
  loading,
  paginationDetails,
  setPaginationDetails,
  handleView,
  handleEdit,
  openDeleteModal,
  restorePerson,
}) => {
  const { isMobile } = useMobileContext();

  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} employees`;
  };

  // Handle the pagination details and page size
  const handlePageChange = (pagination, filters, sorter) => {
    const isPageSizeChanged =
      pagination.pageSize !== paginationDetails.pageSize;

    setPaginationDetails({
      current: isPageSizeChanged ? 1 : pagination.current,
      pageSize: pagination.pageSize,
      sortBy: sorter.field,
      sortOrder: sorter.order,
    });
    window.scrollTo(top);
  };

  const handleCardPageChange = (page, pageSize) => {
    setPaginationDetails({
      ...paginationDetails,
      current: page,
      pageSize: pageSize,
    });
    window.scrollTo(top);
  };

  //Render Table or a Card Depend on Screen Size Breakpoint : 768px
  if (!isMobile) {
    return (
      <Table
        columns={columns}
        rowKey={rowKey}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          ...paginationDetails,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          showTotal: paginationEntries,
          position: ["bottomCenter"],
        }}
        scroll={{
          x: "max-content",
        }}
        onChange={handlePageChange}
      />
    );
  }

  return loading ? (
    <SkeletonCards />
  ) : (
    <>
      {dataSource.map((data) => {
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
      <Pagination
        total={paginationDetails.total}
        showSizeChanger
        pageSizeOptions={["5", "10", "20"]}
        onChange={handleCardPageChange}
        align="center"
      />
    </>
  );
};

export default ProfileTableCard;
