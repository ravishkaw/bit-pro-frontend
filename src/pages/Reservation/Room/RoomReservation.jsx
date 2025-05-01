import { useState } from "react";
import { Card, Table, Tabs } from "antd";

import { useAuth } from "../../../contexts/AuthContext";
import { useMobileContext } from "../../../contexts/MobileContext";
import { useThemeContext } from "../../../contexts/ThemeContext";

import usePageChange from "../../../hooks/common/usePageChange";
import useRoomReservation from "../../../hooks/reservation/useRoomReservation";

import RoomReservationCalendar from "../../../components/Calendar/RoomReservationCalendar";
import { RoomReservationColumnItems } from "../../../components/Table/RoomReservationColumnItems";
import RoomReservationFormModal from "../../../components/Modals/RoomReservationFormModal";
import SearchAddHeader from "../../../components/DataDisplay/SearchAddHeader";
import SkeletonCards from "../../../components/Cards/SkeletonCards";
import MobileCardView from "../../../components/DataDisplay/MobileCardView";
import useGuests from "../../../hooks/profile/useGuests";
import useRoomPackages from "../../../hooks/packages/useRoomPackages";
import useRoomReservationAmenities from "../../../hooks/reservation/useRoomReservationAmenities";

const RoomReservation = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
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
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useRoomReservation();

  const guestHookData = useGuests();
  const { data: roomPackages } = useRoomPackages();
  const { data: amenities } = useRoomReservationAmenities();

  const openFormModal = (isEditing, selectedReservation = null) => {
    setModalState({
      open: true,
      isEditing: isEditing,
      selectedReservation: selectedReservation,
    });
  };

  const closeFormModal = () => {
    setModalState({
      open: false,
      isEditing: false,
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
      key: "Checked-In",
    },
    {
      label: "Upcoming",
      key: "Confirmed",
    },
    {
      label: "Pending",
      key: "Pending",
    },
    {
      label: "Past",
      key: "Checked-Out",
    },
    {
      label: "Cancelled",
      key: "Cancelled",
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
            columns={RoomReservationColumnItems()}
            loading={loading}
            pagination={{
              ...paginationDetails,
              showTotal: paginationEntries,
            }}
            scroll={{ x: "max-content" }}
            onChange={handlePageChange}
          />
        </Card>

        <RoomReservationFormModal
          open={modalState.open}
          closeFormModal={closeFormModal}
          selectedObject={modalState.selectedReservation}
          isEditing={modalState.isEditing}
          addItem={addItem}
          additionalData={additionalData}
          fetchRooms={fetchRooms}
          guestHookData={guestHookData}
          amenities={amenities}
          roomPackages={roomPackages}
          checkRoomReservationPricing={checkRoomReservationPricing}
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
        // showView={showView}
        handleCardPageChange={handleCardPageChange}
      />
    </>
  );
};

export default RoomReservation;
