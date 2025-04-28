import { Pagination, Card } from "antd";

import SearchAddHeader from "./SearchAddHeader";
import GenericCard from "../Cards/GenericCard";

// Component to render mobile card view
// displays a header with search and add button, and renders cards for each data item
const MobileCardView = ({
  isDarkMode, // dark mode state
  module, // module name
  privileges, // user privileges for the module
  handleSearch, // function to handle search
  paginationDetails, // pagination details for the data source
  openFormModal, // function to open the form modal for adding new items
  dataSource, // data source for the cards
  columns, // columns of the table
  handleView, // function to handle view action on a card
  handleEdit, // function to handle edit action on a card
  opendeleteRestoreModal, // function to open the delete/restore modal
  loadOneItem, // function to load a single item
  showView, // flag to show view button
  handleCardPageChange, // function to handle pagination changes
}) => {
  return (
    <>
      <Card
        variant="borderless"
        style={{
          position: "sticky",
          top: 64,
          zIndex: 1,
          borderRadius: 0,
          background: !isDarkMode ? "#f5f5f5" : "#000",
          boxShadow: "none",
        }}
      >
        {/* Mobile view header with search and add button */}
        <SearchAddHeader
          module={module}
          privileges={privileges}
          handleSearch={handleSearch}
          paginationDetails={paginationDetails}
          openFormModal={openFormModal}
        />
      </Card>
      {/* Render card for each data item */}
      {dataSource?.map((data) => {
        return (
          <GenericCard
            key={data.id}
            columns={columns}
            data={data}
            handleView={handleView}
            handleEdit={handleEdit}
            opendeleteRestoreModal={opendeleteRestoreModal}
            loadOneItem={loadOneItem}
            privileges={privileges}
            showView={showView}
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

export default MobileCardView;
