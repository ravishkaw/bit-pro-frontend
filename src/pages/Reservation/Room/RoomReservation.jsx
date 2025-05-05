import { useState } from "react";
import { Card, Table, Tabs } from "antd";

import { useAuth } from "../../../contexts/AuthContext";
import { useMobileContext } from "../../../contexts/MobileContext";
import { useThemeContext } from "../../../contexts/ThemeContext";

import usePageChange from "../../../hooks/common/usePageChange";
import useRoomReservation from "../../../hooks/reservation/useRoomReservation";
import useModalStates from "../../../hooks/common/useModalStates";

import RoomReservationCalendar from "../../../components/Calendar/RoomReservationCalendar";
import { RoomReservationColumnItems } from "../../../components/Table/RoomReservationColumnItems";
import RoomReservationFormModal from "../../../components/Modals/RoomReservationFormModal";
import RoomReservationUpdateModal from "../../../components/Modals/RoomReservationUpdateModal";
import SearchAddHeader from "../../../components/DataDisplay/SearchAddHeader";
import SkeletonCards from "../../../components/Cards/SkeletonCards";
import MobileCardView from "../../../components/DataDisplay/MobileCardView";
import ViewRoomReservation from "../../../components/DataDisplay/ViewRoomReservation";
import UpdateConfirmationModal from "../../../components/Modals/UpdateConfirmationModal";

// Room reservation page
const RoomReservation = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [formModalState, setFormModalState] = useState({
    open: false,
    selectedReservation: null,
  });
  const [updateModalState, setUpdateModalState] = useState({
    open: false,
    selectedReservation: null,
  });

  const { privileges } = useAuth();
  const { isMobile } = useMobileContext();
  const { isDarkMode } = useThemeContext();

  const module = "Room Reservation";
  const rowKey = "id";

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === module
  );

  const {
    reservationData,
    fetchRooms,
    additionalData,
    selectedTab,
    setSelectedTab,
    checkRoomReservationPricing,
    loadOneItem,
    addItem,
    updateItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useRoomReservation();

  const {
    showUpdateConfirmModal,
    handleView,
    closeViewModal,
    viewModal,
    closeUpdateConfirmModal,
    updateConfirmModal,
  } = useModalStates();

  const { amenities, roomPackages } = additionalData;

  // Open create form modal
  const openFormModal = () => {
    setFormModalState({
      open: true,
      selectedReservation: null,
    });
  };

  // Close create form modal
  const closeFormModal = () => {
    setFormModalState({
      open: false,
      selectedReservation: null,
    });
  };

  // Open update modal
  const openUpdateModal = (selectedReservation) => {
    setUpdateModalState({
      open: true,
      selectedReservation,
    });
  };

  // Close update modal
  const closeUpdateModal = () => {
    setUpdateModalState({
      open: false,
      selectedReservation: null,
    });
  };

  const openCalendar = () => setCalendarOpen(true);
  const closeCalendar = () => setCalendarOpen(false);

  // total items message
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

  const items = [
    {
      label: "Current",
      key: "CHECKED-IN",
    },
    {
      label: "Upcoming",
      key: "CONFIRMED",
    },
    {
      label: "Pending",
      key: "PENDING",
    },
    {
      label: "Past",
      key: "CHECKED-OUT",
    },
    {
      label: "Cancelled",
      key: "CANCELLED",
    },
    {
      label: "No Show",
      key: "NO-SHOW",
    },
  ];

  // handle edit action
  const handleEdit = async (id) => {
    const reservation = await loadOneItem(id);
    openUpdateModal(reservation);
  };

  // Generate table columns dynamically
  const columns = RoomReservationColumnItems(
    modulePrivileges,
    handleEdit,
    loadOneItem,
    handleView
  );

  if (!isMobile) {
    return (
      <>
        <Card>
          <Tabs
            items={items}
            tabBarExtraContent={
              !isMobile
                ? {
                    right: (
                      <SearchAddHeader
                        module={module}
                        privileges={modulePrivileges}
                        handleSearch={handleSearch}
                        paginationDetails={paginationDetails}
                        openFormModal={openFormModal}
                      />
                    ),
                  }
                : null
            }
            defaultActiveKey={selectedTab}
            onChange={(key) => setSelectedTab(key)}
          />
          <Table
            rowKey={rowKey}
            dataSource={reservationData}
            columns={columns}
            loading={loading}
            pagination={{
              ...paginationDetails,
              showTotal: paginationEntries,
            }}
            scroll={{ x: "max-content" }}
            onChange={handlePageChange}
          />
        </Card>

        {/* Create reservation form modal */}
        <RoomReservationFormModal
          open={formModalState.open}
          closeFormModal={closeFormModal}
          selectedObject={formModalState.selectedReservation}
          isEditing={false}
          addItem={addItem}
          additionalData={additionalData}
          fetchRooms={fetchRooms}
          amenities={amenities}
          roomPackages={roomPackages}
          checkRoomReservationPricing={checkRoomReservationPricing}
          showUpdateConfirmModal={showUpdateConfirmModal}
        />

        {/* Update reservation modal */}
        <RoomReservationUpdateModal
          open={updateModalState.open}
          closeFormModal={closeUpdateModal}
          selectedObject={updateModalState.selectedReservation}
          additionalData={additionalData}
          updateItem={updateItem}
          loadReferenceData={additionalData.loadReferenceData}
          showUpdateConfirmModal={showUpdateConfirmModal}
          fetchRooms={fetchRooms}
          checkRoomReservationPricing={checkRoomReservationPricing}
        />

        <ViewRoomReservation
          module={module}
          viewModal={viewModal}
          modulePrivileges={modulePrivileges}
          closeViewModal={closeViewModal}
          handleEdit={handleEdit}
          loadOneItem={loadOneItem}
          additionalData={additionalData}
        />
        <UpdateConfirmationModal
          updateFunction={updateItem}
          updateConfirmModal={updateConfirmModal}
          closeUpdateConfirmModal={closeUpdateConfirmModal}
          closeModal={closeUpdateModal}
        />

        <RoomReservationCalendar
          calendarOpen={calendarOpen}
          closeCalendar={closeCalendar}
        />
      </>
    );
  }

  // Mobile view - render cards
  return loading ? (
    // Show skeleton loading state
    <SkeletonCards />
  ) : (
    <>
      <MobileCardView
        isDarkMode={isDarkMode}
        module={module}
        privileges={privileges}
        handleSearch={handleSearch}
        paginationDetails={paginationDetails}
        openFormModal={openFormModal}
        // dataSource={dataSource}
        // columns={columns}
        // handleView={handleView}
        // handleEdit={handleEdit}
        // opendeleteRestoreModal={opendeleteRestoreModal}
        loadOneItem={loadOneItem}
        handleCardPageChange={handleCardPageChange}
         // showView={showView}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default RoomReservation;
