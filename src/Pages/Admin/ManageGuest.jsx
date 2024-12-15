import { useState } from "react";
import { Card, Col, Row, Table, Button, Space, Form } from "antd";
import moment from "moment";

import { useGlobalContext } from "../../contexts/context";
import GuestModal from "../../components/Guest/GuestModal";
import useGuests from "../../components/hooks/useGuest";
import { guestColumns } from "../../constants/guestColumns";

const ManageGuest = () => {
  const [modalState, setModalState] = useState({
    open: false,
    isEditing: false,
    confirmLoading: false,
    selectedGuest: null,
  });

  const { isMobile } = useGlobalContext();
  const {
    guests,
    loading,
    createGuest,
    updateGuestRecord,
    deleteGuestRecord,
    contextHolder,
  } = useGuests();

  const [form] = Form.useForm();

  const openModal = (isEditing, guest = null) => {
    setModalState({ open: true, isEditing, selectedGuest: guest });
    if (guest) {
      form.setFieldsValue({
        ...guest,
        dob: guest.dob ? moment(guest.dob, "YYYY-MM-DD") : null,
      });
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    form.resetFields();
    setModalState({ ...modalState, open: false });
  };

  const handleSave = async (values) => {
    const { isEditing, selectedGuest } = modalState;
    setModalState((prev) => ({ ...prev, confirmLoading: true }));
    try {
      if (isEditing) {
        await updateGuestRecord(selectedGuest.guestId, values);
      } else {
        console.log(values);
        await createGuest(values);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving guest:", error);
    } finally {
      setModalState((prev) => ({ ...prev, confirmLoading: false }));
    }
  };

  const columns = guestColumns(openModal, deleteGuestRecord);

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={24}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Manage Guests
          </h1>
          <Row justify="end" style={{ marginBottom: "20px" }}>
            <Button type="primary" onClick={() => openModal(false)}>
              Add New Guest
            </Button>
          </Row>
          {!isMobile ? (
            <Table
              rowKey="guestId"
              dataSource={guests}
              columns={columns}
              bordered
              loading={loading}
              scroll={{
                x: "max-content",
              }}
            />
          ) : (
            guests.map((data, index) => (
              <Card key={index} style={{ marginBottom: "16px" }}>
                {columns.map((column) => {
                  let value = data[column.dataIndex];
                  if (column.dataIndex === "deleted") {
                    value = value ? "Deleted" : "Active";
                  } else if (column.key === "operation") {
                    value = (
                      <Space>
                        <Button
                          size="small"
                          onClick={() => openModal(true, data)}
                        >
                          Edit
                        </Button>
                        <Button size="small" danger>
                          Delete
                        </Button>
                      </Space>
                    );
                  }

                  return (
                    <div key={column.key}>
                      <strong>{column.title}:</strong> {value || "N/A"}
                    </div>
                  );
                })}
              </Card>
            ))
          )}
        </Col>
      </Row>
      <GuestModal
        isEditing={modalState.isEditing}
        confirmLoading={modalState.confirmLoading}
        open={modalState.open}
        onCancel={closeModal}
        handleSave={handleSave}
        form={form}
      />
    </>
  );
};

export default ManageGuest;
