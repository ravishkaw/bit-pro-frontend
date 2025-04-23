import { useState } from "react";
import { Tabs, Pagination } from "antd";

import { useAuth } from "../../contexts/AuthContext";
import { useMobileContext } from "../../contexts/MobileContext";
import useRoomPackages from "../../hooks/packages/useRoomPackages";
import useEventPackages from "../../hooks/packages/useEventPackages";
import useModalStates from "../../hooks/common/useModalStates";
import usePageChange from "../../hooks/common/usePageChange";

import SearchAddHeader from "../../components/DataDisplay/SearchAddHeader";
import RoomPackages from "./RoomPackages";
import EventPackages from "./EventPackages";

const ManagePackages = () => {
  const [selectedTab, setSelectedTab] = useState("Room Package");

  const { privileges } = useAuth();
  const { isMobile } = useMobileContext();

  // Separate data hooks for each package type
  const roomPackagesHookData = useRoomPackages();
  const eventPackagesHookData = useRoomPackages(); // * Until event package make
  // const eventPackagesHookData = useEventPackages();

  // Create independent modal state instances for each package type
  const roomModalStates = useModalStates();
  const eventModalStates = useModalStates();

  // Dynamically select the appropriate hook data and modal states based on current tab
  const hookData =
    selectedTab === "Room Package"
      ? roomPackagesHookData
      : eventPackagesHookData;

  const currentModalStates =
    selectedTab === "Room Package" ? roomModalStates : eventModalStates;

  const { data, paginationDetails, setPaginationDetails } = hookData;

  const modulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Package"
  );

  // Get pagination handler functions
  const { handleCardPageChange } = usePageChange(
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
      label: "Room Packages",
      key: "Room Package",
      children: (
        <RoomPackages
          modulePrivileges={modulePrivileges}
          hookData={roomPackagesHookData}
          modalStates={roomModalStates}
        />
      ),
    },
    {
      label: "Event Packages",
      key: "Event Package",
      children: (
        <EventPackages
          modulePrivileges={modulePrivileges}
          hookData={eventPackagesHookData}
          modalStates={eventModalStates}
        />
      ),
    },
  ];

  return (
    <>
      {/* Render search header above tabs on mobile */}
      {isMobile && (
        <div style={{ marginBottom: 16 }}>
          <SearchAddHeader
            module={selectedTab}
            privileges={modulePrivileges}
            handleSearch={handleSearch}
            paginationDetails={paginationDetails}
            openFormModal={currentModalStates.openFormModal}
          />
        </div>
      )}

      <Tabs
        tabBarExtraContent={
          !isMobile
            ? {
                right: (
                  <SearchAddHeader
                    module={selectedTab}
                    privileges={modulePrivileges}
                    handleSearch={handleSearch}
                    paginationDetails={paginationDetails}
                    openFormModal={currentModalStates.openFormModal}
                  />
                ),
              }
            : null
        }
        items={items}
        onChange={(value) => setSelectedTab(value)}
        defaultActiveKey="Room Package"
        size="large"
      />

      {data?.length > 0 && (
        <Pagination
          style={{ marginTop: 16 }}
          total={paginationDetails?.total || data?.length}
          current={paginationDetails?.current}
          pageSize={paginationDetails?.pageSize}
          showSizeChanger
          pageSizeOptions={["5", "10", "20"]}
          onChange={handleCardPageChange}
          align="center"
        />
      )}
    </>
  );
};

export default ManagePackages;
