import { Table } from "antd";

import { useMobileContext } from "../../contexts/MobileContext";

import SkeletonCards from "../../components/Cards/SkeletonCards";
import ProfileCard from "../Cards/ProfileCard";

const ProfileTableCard = ({
  personType,
  columns,
  rowKey,
  dataSource,
  loading,
  paginationDetails,
  handlePageChange,
  handleView,
  handleEdit,
  openDeleteModal,
  restorePerson,
}) => {
  const { isMobile } = useMobileContext();

  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} employees`;
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
    dataSource.map((data) => {
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
    })
  );
};

export default ProfileTableCard;
