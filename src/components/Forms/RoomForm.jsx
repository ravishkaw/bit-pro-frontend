import { useEffect, useState } from "react";
import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";

import ImageUpload from "../common/ImageUpload";
import { useThemeContext } from "../../contexts/ThemeContext";

import { mapToSelectOptions } from "../../utils/utils";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";

const RoomForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
  additionalData,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});

  const [form] = Form.useForm();
  const { isDarkMode } = useThemeContext();

  const { noteValidation } = formValidations;

  const { roomTypes, roomStatus, roomFacilities } = additionalData;

  const mappedRoomFacilities = mapToSelectOptions(roomFacilities);
  const mappedRoomTypes = mapToSelectOptions(roomTypes);

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      form.setFieldsValue(selectedObject);
      setInitialFormData(selectedObject);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const handleImageChange = (imageName) => {
    form.setFieldsValue({
      photo: imageName,
    });
    form.validateFields(["photo"]);
  };

  // Form submission handler with image handling
  const onFinish = async () => {
    const formData = form.getFieldsValue();

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formData, {
        module,
        mappedRoomTypes,
        mappedRoomFacilities,
        roomStatus,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, formData);
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
      width={800}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout="vertical" labelWrap onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="number"
              hasFeedback
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

          <Col xs={24} sm={8}>
            <Form.Item
              name="roomTypeId"
              hasFeedback
              label={
                <FormInputTooltip label="Room Type" title="Select room type" />
              }
              rules={[{ required: true, message: "Please select a room type" }]}
            >
              <Select
                options={mappedRoomTypes}
                showSearch
                optionFilterProp="label"
                placeholder="Select a room type"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="floorNumber"
              hasFeedback
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
          <Col xs={24} sm={8}>
            <Form.Item
              name="adultNo"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Adult No"
                  title="Enter how many adults can be in room"
                />
              }
              rules={[{ required: true, message: "Please adult no" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                precision={0}
                placeholder="E.g., 3"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="childNo"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Children No"
                  title="Enter how many children can be in room"
                />
              }
              rules={[{ required: true, message: "Please child no" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                precision={0}
                placeholder="E.g., 3"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              name="infantNo"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Infant No"
                  title="Enter how many infants can be in room"
                />
              }
              rules={[{ required: true, message: "Please infant no" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                precision={0}
                placeholder="E.g., 3"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="photo"
              hasFeedback
              label={<FormInputTooltip label="Photo" title="Photo of a room" />}
              rules={[{ required: true, message: "Please add a room photo" }]}
            >
              <ImageUpload
                onImageChange={handleImageChange}
                initialImage={isEditing && selectedObject?.photo}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item
              name="roomFacilityIds"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Room Facilities"
                  title="Select room facilities"
                />
              }
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <div style={divStyle}>
                  <Row gutter={[4, 4]} style={{ width: "100%" }}>
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
          <Col xs={24} sm={8}>
            <Form.Item
              name="statusId"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Room Status"
                  title="Select current room status"
                />
              }
              rules={[{ required: true, message: "Please select room status" }]}
            >
              <Select options={roomStatus} placeholder="Select room status" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={16}>
            <Form.Item
              name="description"
              hasFeedback
              label={
                <FormInputTooltip
                  label="Description"
                  title="Brief introduction of the room"
                />
              }
              rules={noteValidation}
            >
              <Input.TextArea placeholder="E.g., High luxury room" rows={1} />
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
