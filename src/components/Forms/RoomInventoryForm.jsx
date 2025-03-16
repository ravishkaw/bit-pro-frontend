import {
  Button,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";

import { mapToSelectOptions } from "../../utils/utils";
import {
  triggerFormFieldsValidation,
  getChangedFieldValues,
} from "../../utils/form";

// Room Inventory Form Component
const RoomInventoryForm = ({
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
  const [selectedRoom, setSelectedRoom] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { rooms, inventoryItems, getQuantityItemRoom } = additionalData;

  const roomOptions = mapToSelectOptions(rooms);
  const mappedInventoryItems = mapToSelectOptions(inventoryItems);

  // Fetch quantity of an item in a specific room
  const getQuantity = async (inventoryId, selectedRoomId) => {
    if (!inventoryId || !selectedRoomId) return 0;

    try {
      const quantity = await getQuantityItemRoom(inventoryId, selectedRoomId);
      return quantity || 0;
    } catch (error) {
      toast.error(`Error fetching quantity: ${error.message}`);
      return 0;
    }
  };

  // Set today's date for the lastCheckedDate field
  const setTodayDate = () => {
    form.setFieldsValue({
      lastCheckedDate: dayjs(new Date().getUTCDate()).format("YYYY-MM-DD"),
    });
  };

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      //get item
      const selectedItem = inventoryItems.find(
        (item) => item.id === selectedObject.inventoryId
      );
      // get room
      const room = rooms.find((room) => room.id === selectedObject?.roomId);

      if (room && selectedItem) {
        const mappedRoom = room.roomNumber;
        setSelectedRoom(room);

        const updatedFormData = {
          ...selectedObject,
          roomId: mappedRoom,
          inventoryId: selectedItem.id,
          quantity: {
            availableStock: selectedItem?.quantity ?? 0,
            currentRoomCount: selectedObject?.quantity ?? 0,
          },
          operation: "add",
          amount: 0,
        };

        form.setFieldsValue(updatedFormData);
        setInitialFormData(updatedFormData);
        triggerFormFieldsValidation(form);
      }
    } else if (open) {
      form.resetFields();
      setSelectedRoom({});
    }
  }, [open, isEditing, selectedObject, form, rooms, inventoryItems]);

  const onFinish = async () => {
    try {
      const formdata = form.getFieldsValue();
      const operation = formdata.operation || "add";
      const amount = formdata.amount || 0;

      // Calculate the final quantity based on operation
      let finalQuantity = formdata.quantity?.currentRoomCount || 0;
      if (operation === "add") {
        finalQuantity += amount;
      } else if (operation === "remove") {
        finalQuantity -= amount;
      }

      const updatedData = {
        ...formdata,
        lastCheckedDate: formdata.lastCheckedDate,
        roomId: selectedRoom.id,
        finalQuantity: Math.max(0, finalQuantity), // Ensure we don't go below zero
      };

      console.log(updatedData);

      if (isEditing) {
        // Get changed values for update
        const updatedValues = getChangedFieldValues(initialFormData, formdata);
        showUpdateConfirmModal(updatedValues, selectedObject.id, updatedData);
      } else {
        setConfirmLoading(true);
        await addItem(updatedData);
        form.resetFields();
        setConfirmLoading(false);
        closeFormModal();
        toast.success("Item added successfully");
      }
    } catch (error) {
      setConfirmLoading(false);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module} Item`}
      open={open}
      width={600}
      onCancel={closeFormModal}
      footer={null}
      destroyOnClose
    >
      <Form
        onFinish={onFinish}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        labelWrap
      >
        <Form.Item
          label={<FormInputTooltip label="Room" title="Select Room Location" />}
          name="roomId"
          hasFeedback
          rules={[{ required: true, message: "Please select a room" }]}
        >
          <Select
            options={roomOptions}
            showSearch
            allowClear
            placeholder="Select a room"
            optionFilterProp="label"
            onChange={(value) => {
              const room = rooms.find((room) => room.id === value);
              form.resetFields(["inventoryId", "quantity"]);
              setSelectedRoom(room || {});
            }}
          />
        </Form.Item>

        <Form.Item
          label={
            <FormInputTooltip
              label="Inventory Item"
              title="Select item from the inventory catalog"
            />
          }
          name="inventoryId"
          hasFeedback
          rules={[
            { required: true, message: "Please select an inventory item" },
          ]}
        >
          <Select
            options={mappedInventoryItems}
            showSearch
            allowClear
            placeholder="Select an inventory item"
            optionFilterProp="label"
            onChange={async (value) => {
              if (!value || !selectedRoom?.id) return;

              const selectedItem = inventoryItems.find(
                (item) => item.id === value
              );

              if (selectedItem) {
                const currentStock = await getQuantity(
                  selectedItem.id,
                  selectedRoom.id
                );

                form.setFieldsValue({
                  quantity: {
                    availableStock: selectedItem.quantity || 0,
                    currentRoomCount: currentStock || 0,
                  },
                  operation: "add",
                  amount: 0,
                });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label={
            <FormInputTooltip label="Quantity" title="Manage item quantities" />
          }
          hasFeedback
        >
          <Row gutter={8}>
            <Col span={12}>
              Available in Stock
              <Form.Item name={["quantity", "availableStock"]}>
                <InputNumber
                  placeholder="Available"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              Currently in Room
              <Form.Item name={["quantity", "currentRoomCount"]}>
                <InputNumber
                  placeholder="In room"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              Operation
              <Form.Item
                name="operation"
                rules={[
                  { required: true, message: "Please select an operation" },
                ]}
              >
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  block
                  options={[
                    { label: "Add", value: "add" },
                    { label: "Dispose", value: "remove" },
                  ]}
                  onChange={(e) => {
                    // Preserve the current form values when operation changes
                    const currentValues = form.getFieldsValue();
                    // Keep everything the same, just update the operation
                    form.setFieldsValue({
                      ...currentValues,
                      operation: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              Amount
              <Form.Item
                name="amount"
                rules={[{ required: true, message: "Please enter an amount" }]}
              >
                <InputNumber
                  placeholder="Enter amount"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={
            <FormInputTooltip
              label="Last Checked Date"
              title="When was this inventory last verified?"
            />
          }
        >
          <Space size="large">
            <Form.Item name="lastCheckedDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button onClick={setTodayDate}>Set Today</Button>
            </Form.Item>
          </Space>
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

export default RoomInventoryForm;
