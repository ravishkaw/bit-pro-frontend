import { Pagination, Table, Button, Flex, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useMobileContext } from "../../contexts/MobileContext";
import usePageChange from "../../hooks/usePageChange";

import TableTitle from "../Table/TableTitle";
import SkeletonCards from "../Cards/SkeletonCards";
import GenericCard from "../Cards/GenericCard";

const { Search } = Input;

// Table and card component of profiles
const TableCard = ({
  object,
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
}) => {
  const { isMobile } = useMobileContext();

  const paginationEntries = (total, range) => {
    return `Showing ${range[0]}-${range[1]} entries of ${total} ${object}s`;
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
            object={object}
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
      {/* Search and add new options */}
      <Flex justify="space-between" gap="middle" style={{ marginBottom: 10 }}>
        <Search
          placeholder={`Search ${object}`}
          onSearch={handleSearch}
          defaultValue={paginationDetails?.searchQuery || ""}
          allowClear
          onClear={() => handleSearch("")}
          onChange={(e) => e.target.value < 1 && handleSearch("")} // input value < 0 ; calls the handle search
        />

        <Button type="primary" onClick={() => openFormModal(false)}>
          <PlusOutlined />
          Add new {object}
        </Button>
      </Flex>

      {/* Card mapping */}
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

export default TableCard;
