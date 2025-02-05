import { Col, Flex, Row, Typography, Table, Button } from "antd";

import useUsers from "../../hooks/useUsers";
import useModalStates from "../../hooks/useModalStates";

import { userColumnItems } from "../../components/Table/UsersColumnItems";
import UserFormModal from "../../components/Modals/UserFormModal";

const ManageUsers = () => {
  const { loading, users } = useUsers();

  const { formModalState, openFormModal, closeFormModal } = useModalStates();

  const { open } = formModalState;

  const columns = userColumnItems();
  return (
    <>
      <Row>
        <Col span={24}>
          <Flex justify="space-between">
            <Typography.Title level={3}>Manage Users</Typography.Title>
            <Button type="primary" onClick={() => openFormModal(false)}>
              Add new User
            </Button>
          </Flex>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={users}
            loading={loading}
            scroll={{ x: "max-content" }}
          />

          <UserFormModal open={open} closeFormModal={closeFormModal} />
        </Col>
      </Row>
    </>
  );
};

export default ManageUsers;
