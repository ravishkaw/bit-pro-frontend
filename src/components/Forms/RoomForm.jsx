import { useEffect, useState } from "react";
import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  message,
} from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";

import ImageUpload from "../common/ImageUpload";
import { useThemeContext } from "../../contexts/ThemeContext";

import { mapToSelectOptions } from "../../utils/utils";
import { getChangedFieldValues } from "../../utils/form";

const RoomForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateModal,
  additionalData,
  mappedRoomTypes,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});

  const { roomStatus, roomFacilities } = additionalData;

  const [form] = Form.useForm();

  const { isDarkMode } = useThemeContext();

  const mappedRoomFacilities = mapToSelectOptions(roomFacilities);

  useEffect(() => {
    if (isEditing && open && selectedObject) {
      setInitialFormData(selectedObject);
      form.setFieldsValue(selectedObject);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const handleImageChange = (imageName) => {
    form.setFieldsValue({
      photo: imageName,
    });
  };

  // Form submission handler with image handling
  const onFinish = async () => {
    const formData = form.getFieldsValue();

    console.log(formData);

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formData);
      showUpdateModal(updatedValues, selectedObject.id, formData);
    } else {
      setConfirmLoading(true);
      await addItem(formData);
      form.resetFields();
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  const divStyle = {
    border: `1px solid ${isDarkMode ? "#464963" : "#e5e6e8"}`,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={850}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" labelWrap onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item
              name="number"
              label={
                <FormInputTooltip
                  label="Room Number"
                  title="Enter the room number"
                />
              }
              rules={[
                { required: true, message: "Please enter a room number" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                precision={0}
                placeholder="E.g., 101"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={6}>
            <Form.Item
              name="roomTypeId"
              label={
                <FormInputTooltip label="Room Type" title="Select room type" />
              }
              rules={[{ required: true, message: "Please select a room type" }]}
            >
              <Select
                options={[...mappedRoomTypes]}
                showSearch
                optionFilterProp="label"
                placeholder="Select a room type"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={6}>
            <Form.Item
              name="capacity"
              label={
                <FormInputTooltip
                  label="Capacity"
                  title="Enter room capacity"
                />
              }
              rules={[
                { required: true, message: "Please enter room capacity" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                precision={0}
                placeholder="E.g., 3"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={6}>
            <Form.Item
              name="floorNumber"
              label={
                <FormInputTooltip
                  label="Floor Number"
                  title="Enter the floor number that room is on"
                />
              }
              rules={[{ required: true, message: "Please enter floor number" }]}
            >
              <InputNumber
                placeholder="E.g., 1"
                style={{ width: "100%" }}
                min={0}
                precision={0}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="statusId"
              label={
                <FormInputTooltip
                  label="Room Status"
                  title="Select current room status"
                />
              }
              rules={[{ required: true, message: "Please select room status" }]}
            >
              <Radio.Group>
                <div style={divStyle}>
                  <Row gutter={[8, 8]} style={{ width: "100%" }}>
                    {roomStatus.map((status) => (
                      <Col span={12} key={status.value}>
                        <Radio value={status.value}>{status.label}</Radio>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="roomFacilityIds"
              label={
                <FormInputTooltip
                  label="Room Facilities"
                  title="Select room facilities"
                />
              }
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <div style={divStyle}>
                  <Row gutter={[8, 8]} style={{ width: "100%" }}>
                    {mappedRoomFacilities.map((facility) => (
                      <Col span={8} key={facility.value}>
                        <Checkbox value={facility.value}>
                          {facility.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item
              name="photo"
              label={<FormInputTooltip label="Photo" title="Photo of a room" />}
              rules={[{ required: true, message: "Please add a room photo" }]}
            >
              <ImageUpload
                onImageChange={handleImageChange}
                initialImage={isEditing && selectedObject?.photo}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={18}>
            <Form.Item
              name="description"
              label={
                <FormInputTooltip
                  label="Description"
                  title="Brief introduction of the room"
                />
              }
            >
              <Input.TextArea placeholder="E.g., High luxury room" />
            </Form.Item>
          </Col>
        </Row>

        <FormOnFinishButtons
          closeFormModal={closeFormModal}
          isEditing={isEditing}
          confirmLoading={confirmLoading}
        />
      </Form>
    </Modal>
  );
};

export default RoomForm;
