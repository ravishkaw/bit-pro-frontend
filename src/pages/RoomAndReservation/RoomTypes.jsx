import { Col, Row } from "antd";
import { RoomTypeColumns } from "../../components/Table/RoomAndReservation";
import useRoomTypes from "../../hooks/useRoomsTypes";

import TableCard from "../../components/DataDisplay/TableCard";

// Room Types page
const ManageRoomTypes = () => {
  const object = "room type"; // Define the object type for room type

  // Destructure functions and states from custom hooks
  const { roomTypes, loading } = useRoomTypes();

  // Generate table columns dynamically using PrivilegeColumnItems
  const columns = RoomTypeColumns();

  return (
    <>
      <Row>
        <Col span={24}>
          <TableCard
            object={object}
            columns={columns}
            rowKey="id"
            dataSource={roomTypes}
            loading={loading}
            // paginationDetails={paginationDetails}
            // setPaginationDetails={setPaginationDetails}
            // handleEdit={handleEdit}
            // openFormModal={openFormModal}
            // openDeleteModal={openDeleteModal}
          />
        </Col>
      </Row>
    </>
  );
};

export default ManageRoomTypes;
