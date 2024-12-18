import { useState } from "react";
import { Col, Row, Table, Button, Form } from "antd";

import { useGlobalContext } from "../../contexts/context";
import GuestModal from "../../components/Guest/GuestModal";
import useGuests from "../../components/hooks/useGuest";
import { guestColumns } from "../../constants/guestColumns";
import dayjs from "dayjs";
import GuestCard from "../../components/Guest/GuestCard";
import LoadingCard from "../../components/Common/LoadingCard";

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
      const formattedGuest = {
        ...guest,
        dob: dayjs(guest.dob, "YYYY-MM-DD"),
      };
      form.setFieldsValue(formattedGuest);
      setTimeout(() => form.validateFields(), 0);
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
            <Col>
              <Button type="primary" onClick={() => openModal(false)}>
                Add New Guest
              </Button>
            </Col>
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
          ) : loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            guests.map((data, index) => (
              <GuestCard
                key={index}
                columns={columns}
                data={data}
                openModal={openModal}
                deleteGuestRecord={deleteGuestRecord}
              />
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
