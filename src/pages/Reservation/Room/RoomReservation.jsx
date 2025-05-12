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
import RoomReservationUpdateForm from "../../../components/Forms/RoomReservationUpdateForm";

import SkeletonCards from "../../../components/Cards/SkeletonCards";
import SearchAddHeader from "../../../components/DataDisplay/SearchAddHeader";
import MobileCardView from "../../../components/DataDisplay/MobileCardView";
import ViewRoomReservation from "../../../components/DataDisplay/ViewRoomReservation";

import RoomReservationFormModal from "../../../components/Modals/RoomReservationFormModal";
import UpdateConfirmationModal from "../../../components/Modals/UpdateConfirmationModal";
import RoomReservationActionModal from "../../../components/Modals/RoomReservationActionModal";
import RoomReservationCheckOutModal from "../../../components/Modals/RoomReservationCheckOutModal";

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
  const [actionModalState, setActionModalState] = useState({
    open: false,
    selectedReservation: null,
    actionType: null,
  });
  const [checkoutModalState, setCheckoutModalState] = useState({
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
    handleActionItem,
    roomCheckout,
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

  // Action confirmation modal
  const openActionConfirmationModal = (selectedReservationId, actionType) => {
    setActionModalState({
      open: true,
      selectedReservationId,
      actionType,
    });
  };

  // Close action confirmation modal
  const closeActionConfirmationModal = () => {
    setActionModalState({
      open: false,
      selectedReservationId: null,
      actionType: null,
    });
  };

  // Open checkout modal
  const openCheckoutModal = (selectedReservation) => {
    setCheckoutModalState({
      open: true,
      selectedReservation,
    });
  };

  // close checkout modal
  const closeCheckoutModal = () => {
    setCheckoutModalState({
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

  // handle edit action
  const handleEdit = async (id) => {
    const reservation = await loadOneItem(id);
    openUpdateModal(reservation);
  };

  // handle checkout action
  const handleCheckOut = async (id) => {
    const reservation = await loadOneItem(id);
    openCheckoutModal(reservation);
  };

  // Generate table columns dynamically
  const columns = RoomReservationColumnItems(
    modulePrivileges,
    handleEdit,
    loadOneItem,
    handleView,
    handleCheckOut,
    openActionConfirmationModal
  );

  // Tab items
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
              pageSizeOptions: [5, 10, 20],
              showSizeChanger: true,
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
          showUpdateConfirmModal={showUpdateConfirmModal}
        />

        {/* Update reservation modal */}
        <RoomReservationUpdateForm
          open={updateModalState.open}
          closeFormModal={closeUpdateModal}
          selectedObject={updateModalState.selectedReservation}
          additionalData={additionalData}
          updateItem={updateItem}
          loadReferenceData={additionalData.loadReferenceData}
          showUpdateConfirmModal={showUpdateConfirmModal}
          fetchRooms={fetchRooms}
        />

        {/* View reservation modal */}
        <ViewRoomReservation
          module={module}
          viewModal={viewModal}
          modulePrivileges={modulePrivileges}
          closeViewModal={closeViewModal}
          handleEdit={handleEdit}
          loadOneItem={loadOneItem}
          additionalData={additionalData}
        />

        {/* Update confirmation modal */}
        <UpdateConfirmationModal
          updateFunction={updateItem}
          updateConfirmModal={updateConfirmModal}
          closeUpdateConfirmModal={closeUpdateConfirmModal}
          closeModal={closeUpdateModal}
        />

        {/* Action confirmation modal */}
        <RoomReservationActionModal
          actionFunction={handleActionItem}
          actionModalState={actionModalState}
          closeModal={closeActionConfirmationModal}
        />

        {/* Checkout modal */}
        <RoomReservationCheckOutModal
          modalState={checkoutModalState}
          closeModal={closeCheckoutModal}
          additionalData={additionalData}
          roomCheckout={roomCheckout}
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
