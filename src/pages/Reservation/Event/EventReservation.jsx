import { useState } from "react";
import { Card, Table, Tabs } from "antd";

import { useAuth } from "../../../contexts/AuthContext";
import { useMobileContext } from "../../../contexts/MobileContext";
import { useThemeContext } from "../../../contexts/ThemeContext";

import usePageChange from "../../../hooks/common/usePageChange";
import useModalStates from "../../../hooks/common/useModalStates";
import useEventReservation from "../../../hooks/reservation/useEventReservation";

import { EventReservationColumnItems } from "../../../components/Table/EventReservationColumnItems";

import SkeletonCards from "../../../components/Cards/SkeletonCards";
import SearchAddHeader from "../../../components/DataDisplay/SearchAddHeader";
import MobileCardView from "../../../components/DataDisplay/MobileCardView";

import UpdateConfirmationModal from "../../../components/Modals/UpdateConfirmationModal";
import RoomReservationActionModal from "../../../components/Modals/RoomReservationActionModal";
import RoomReservationCheckOutModal from "../../../components/Modals/RoomReservationCheckOutModal";
import EventReservationFormModal from "../../../components/Modals/EventReservationFormModal";

const EventReservation = () => {
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

  const module = "Event Reservation";
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
  } = useEventReservation();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    showUpdateConfirmModal,
    handleView,
    closeViewModal,
    viewModal,
    closeUpdateConfirmModal,
    updateConfirmModal,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState;

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
  const columns = EventReservationColumnItems(
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
      label: "Scheduled",
      key: "SCHEDULED",
    },
    {
      label: "Ongoing",
      key: "ONGOING",
    },
    {
      label: "Completed",
      key: "COMPLETED",
    },
    {
      label: "Cancelled",
      key: "CANCELLED",
    },
    {
      label: "Postponed",
      key: "POSTPONED",
    },
  ];

  return (
    <>
      {!isMobile && (
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

          {/* form modal */}
          <EventReservationFormModal
            open={open}
            closeFormModal={closeFormModal}
            isEditing={isEditing}
            selectedObject={selectedObject}
            addItem={addItem}
            showUpdateConfirmModal={showUpdateConfirmModal}
            additionalData={additionalData}
          />

          {/* View reservation modal
          <ViewRoomReservation
            module={module}
            viewModal={viewModal}
            modulePrivileges={modulePrivileges}
            closeViewModal={closeViewModal}
            handleEdit={handleEdit}
            loadOneItem={loadOneItem}
            additionalData={additionalData}
          /> */}

          {/* Update confirmation modal */}
          <UpdateConfirmationModal
            updateFunction={updateItem}
            updateConfirmModal={updateConfirmModal}
            closeUpdateConfirmModal={closeUpdateConfirmModal}
            closeModal={closeFormModal}
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
        </>
      )}

      {/* Mobile view - render cards */}
      {loading ? (
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
      )}
    </>
  );
};

export default EventReservation;
