import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Typography,
  Switch,
} from "antd";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { useThemeContext } from "../../contexts/ThemeContext";
import { formValidations } from "./validations";

const { Text } = Typography;

const RoomPackageForm = ({
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { isDarkMode } = useThemeContext();
  const { amenities } = additionalData;
  const { alphanumericWithSpacesValidation, noteValidation } = formValidations;

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedData = {
        ...selectedObject,
        statusName: selectedObject?.statusName == "Active" ? true : false,
      };
      form.setFieldsValue(updatedData);
      setInitialFormData(updatedData);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  useEffect(() => {
    if (open && isEditing && selectedObject && selectedObject.amenities) {
      setSelectedAmenities(selectedObject.amenities);
    } else if (open && !isEditing) {
      setSelectedAmenities([]);
    }
  }, [open, isEditing, selectedObject]);

  // Handle amenity quantity change
  const handleAmenityQuantityChange = (amenityId, newQty) => {
    const newQuantity = Math.max(0, Math.min(10, newQty || 0));

    setSelectedAmenities((prevAmenities) => {
      // If quantity is 0, remove from selection
      if (newQuantity === 0) {
        return prevAmenities.filter(
          (amenity) => amenity.amenityId !== amenityId
        );
      }

      // If already selected, update quantity
      const existingIndex = prevAmenities.findIndex(
        (amenity) => amenity.amenityId === amenityId
      );
      if (existingIndex >= 0) {
        const updatedAmenities = [...prevAmenities];
        updatedAmenities[existingIndex] = {
          ...updatedAmenities[existingIndex],
          quantity: newQuantity,
        };
        return updatedAmenities;
      }

      // Add new selection
      return [
        ...prevAmenities,
        { amenityId: amenityId, quantity: newQuantity },
      ];
    });
  };

  const onFinish = async () => {
    form.setFieldsValue({
      amenities: selectedAmenities,
    });

    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      statusName: formdata.statusName ? "Active" : "Inactive",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module,
        amenities,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addItem(updatedData);
      form.resetFields();
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={600}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        onFinish={onFinish}
        initialValues={{ usedQuantity: 0 }}
      >
        <Form.Item
          name="name"
          label={
            <FormInputTooltip
              label="Package Name"
              title="Enter the name of the package"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            { required: true, message: "Please enter package name" },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Full Board, Half Board" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Enter the description of the package"
            />
          }
          rules={[
            ...noteValidation,
            { required: true, message: "Please enter description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="E.g., Package with room and lunch" />
        </Form.Item>

        {/* <Form.Item
          name="price"
          label={
            <FormInputTooltip
              label="Price"
              title="Enter the price of the package"
            />
          }
          rules={[{ required: true, message: "Please enter price" }]}
          hasFeedback
        >
          <InputNumber
            placeholder="0.00"
            min={0}
            precision={2}
            style={{ width: "100%" }}
            prefix="Rs."
            keyboard
          />
        </Form.Item> */}

        <Form.Item label="Add Optional Amenities">
          <div
            style={{
              border: `1px solid ${isDarkMode ? "#464963" : "#e5e6e8"}`,
              padding: "0 16px",
              borderRadius: 8,
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={amenities}
              renderItem={(amenity) => {
                const selectedAmenity = selectedAmenities.find(
                  (a) => a.amenityId === amenity.id
                );
                const quantity = selectedAmenity ? selectedAmenity.quantity : 0;

                return (
                  <List.Item key={amenity.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: 2 }}>
                        <Text>{amenity.name}</Text>
                      </div>

                      <div
                        style={{
                          flex: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="default"
                          size="small"
                          onClick={() =>
                            handleAmenityQuantityChange(
                              amenity.id,
                              quantity - 1
                            )
                          }
                          disabled={quantity <= 0}
                        >
                          -
                        </Button>
                        <InputNumber
                          size="small"
                          min={0}
                          max={10}
                          value={quantity}
                          onChange={(value) =>
                            handleAmenityQuantityChange(amenity.id, value)
                          }
                          style={{
                            width: 30,
                            margin: "0 4px",
                            textAlign: "center",
                          }}
                        />
                        <Button
                          type="default"
                          size="small"
                          onClick={() =>
                            handleAmenityQuantityChange(
                              amenity.id,
                              quantity + 1
                            )
                          }
                          disabled={quantity >= 10}
                        >
                          +
                        </Button>
                      </div>
                      <div style={{ flex: 1, marginLeft: 4 }}>
                        <Text type="secondary">Max: 10</Text>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </div>
        </Form.Item>

        <Form.Item name="amenities" noStyle hidden>
          <Input hidden />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Status"
              title="Set the status of the package"
            />
          }
          hasFeedback
          required
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked={false}
          />
        </Form.Item>

        <FormOnFinishButtons
          closeFormModal={closeFormModal}
          isEditing={isEditing}
          confirmLoading={confirmLoading}
        />
      </Form>
    </Modal>
  );
};

export default RoomPackageForm;
