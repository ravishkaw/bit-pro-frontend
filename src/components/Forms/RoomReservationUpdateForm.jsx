import { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Card,
  Space,
  Descriptions,
  Tooltip,
  Flex,
  Alert as AntdAlert,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CoffeeOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { useThemeContext } from "../../contexts/ThemeContext";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";
import { mapToSelectOptions } from "../../utils/utils";
import { calculateRoomReservationPrice } from "../../utils/pricing";
import FormInputTooltip from "./FormInputTooltip";

const { Option } = Select;
const { TextArea } = Input;

const RoomReservationUpdateForm = ({
  open,
  closeFormModal,
  selectedObject,
  additionalData,
  showUpdateConfirmModal,
  fetchRooms,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [pricingInformation, setPricingInformation] = useState({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [primaryGuestId, setPrimaryGuestId] = useState(null);

  const { isDarkMode } = useThemeContext();
  const { noteValidation } = formValidations;
  const {
    guests,
    children,
    reservationTypes,
    roomPackages,
    amenities,
    paymentMethods,
  } = additionalData;

  const mappedGuests = mapToSelectOptions(guests);
  const mappedChildren = mapToSelectOptions(children);
  const mappedRoomPackages = mapToSelectOptions(roomPackages);

  // Format dates for form
  const formatDateForForm = (dateString) => {
    return dateString ? dayjs(dateString) : null;
  };

  // Load initial form data when modal opens
  useEffect(() => {
    if (selectedObject && open) {
      setLoading(true);

      // Format amenities for the form
      const formattedAmenities =
        selectedObject.amenities?.map((item) => ({
          id: item.amenityId,
          quantity: item.quantity,
        })) || [];

      setSelectedAmenities(formattedAmenities);

      // Format dates for the form
      const checkIn = formatDateForForm(selectedObject.reservedCheckInDate);
      const checkOut = formatDateForForm(selectedObject.reservedCheckOutDate);
      const actualCheckIn = formatDateForForm(selectedObject.checkInDate);
      const actualCheckOut = formatDateForForm(selectedObject.checkOutDate);

      // Format billing for the form
      const billing = selectedObject.billing || {};

      // Set form fields
      const formValues = {
        ...selectedObject,
        reservationDateRange: checkIn && checkOut ? [checkIn, checkOut] : null,
        actualCheckInDate: actualCheckIn,
        actualCheckOutDate: actualCheckOut,
        paymentMethodId: billing.paymentMethodId,
        paidAmount: billing.paidAmount,
        basePrice: billing.basePrice || 0,
        totalTax: billing.totalTax || 0,
        discountAmount: billing.discountAmount || 0,
        totalPrice: billing.totalPrice || 0,
      };

      setInitialValues(formValues);
      form.setFieldsValue(formValues);
      setPrimaryGuestId(formValues.primaryGuestId);
      setPricingInformation({
        basePrice: billing.basePrice || 0,
        totalTaxes: billing.totalTax || 0,
        discountAmount: billing.discountAmount || 0,
        totalPrice: billing.totalPrice || 0,
        netAmount: billing.netAmount || 0,
        discountId: billing.discountId || null,
        taxId: billing.taxId,
      });

      // Load available rooms based on current reservation
      loadAvailableRooms(selectedObject);
      triggerFormFieldsValidation(form);
      setLoading(false);
    }
  }, [selectedObject, open, form]);

  // Load available rooms
  const loadAvailableRooms = async (reservation) => {
    try {
      const checkInDate = dayjs(reservation.reservedCheckInDate).format(
        "YYYY-MM-DD"
      );
      const checkOutDate = dayjs(reservation.reservedCheckOutDate).format(
        "YYYY-MM-DD"
      );

      const rooms = await fetchRooms(
        checkInDate,
        checkOutDate,
        reservation.adultNo,
        reservation.childNo,
        reservation.infantNo
      );

      // Include the currently assigned room even if not available
      const currentRoomExists = rooms.some(
        (room) => room.id === reservation.roomId
      );

      if (!currentRoomExists) {
        // Get the room details or create a placeholder
        const currentRoom = {
          id: reservation.roomId,
          roomNumber: "Current Room",
        };

        setAvailableRooms([...rooms, currentRoom]);
      } else {
        setAvailableRooms(rooms);
      }
    } catch (error) {
      toast.error("Error loading available rooms:", error);
    }
  };

  // Handle amenity quantity change
  const handleAmenityQuantityChange = (amenityId, newQty) => {
    const newQuantity = Math.max(0, Math.min(10, newQty || 0));

    setSelectedAmenities((prevAmenities) => {
      let updatedAmenities;
      if (newQuantity === 0) {
        updatedAmenities = prevAmenities.filter(
          (amenity) => amenity.id !== amenityId
        );
      } else {
        const existingIndex = prevAmenities.findIndex(
          (amenity) => amenity.id === amenityId
        );
        if (existingIndex >= 0) {
          updatedAmenities = [...prevAmenities];
          updatedAmenities[existingIndex] = {
            ...updatedAmenities[existingIndex],
            quantity: newQuantity,
          };
        } else {
          updatedAmenities = [
            ...prevAmenities,
            { id: amenityId, quantity: newQuantity },
          ];
        }
      }
      // Call refreshPricing with the updated amenities
      refreshPricing(updatedAmenities);
      return updatedAmenities;
    });
  };

  // Update refreshPricing to accept an optional amenities argument
  const refreshPricing = async (amenitiesOverride) => {
    const roomId = form.getFieldValue("roomId");
    const dateRange = form.getFieldValue("reservationDateRange");
    const checkInDate = dateRange?.[0];
    const checkOutDate = dateRange?.[1];
    const selectedPackage = form.getFieldValue("roomPackageId");

    const resp = await calculateRoomReservationPrice(
      roomId,
      checkInDate,
      checkOutDate,
      amenitiesOverride || selectedAmenities,
      selectedPackage,
      setPricingLoading,
      setPricingInformation
    );

    form.setFieldsValue({
      basePrice: Math.ceil(resp.basePrice),
      totalTax: Math.ceil(resp.totalTaxes),
      discountAmount: Math.ceil(resp.discountAmount),
      totalPrice: Math.ceil(resp.totalPrice),
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Format data for API
      const updateData = {
        ...values,
        reservedCheckInDate:
          values.reservationDateRange[0].format("YYYY-MM-DD") + "T14:00:00",
        reservedCheckOutDate:
          values.reservationDateRange[1].format("YYYY-MM-DD") + "T10:00:00",
        checkInDate: values.actualCheckInDate
          ? values.actualCheckInDate.format("YYYY-MM-DDTHH:mm:ss")
          : null,
        checkOutDate: values.actualCheckOutDate
          ? values.actualCheckOutDate.format("YYYY-MM-DDTHH:mm:ss")
          : null,
        amenities: selectedAmenities.map((amenity) => ({
          amenityId: amenity?.id,
          quantity: amenity?.quantity,
        })),
        billingPayloadDTO: {
          id: selectedObject?.billing?.id,
          basePrice:
            Math.ceil(pricingInformation.basePrice) || values.basePrice,
          totalPrice:
            Math.ceil(pricingInformation.totalPrice) || values.totalPrice,
          netAmount:
            Math.ceil(pricingInformation.netAmount) || values.netAmount,
          discountId:
            pricingInformation?.discount?.id ||
            selectedObject?.billing?.discountId,
          discountAmount:
            Math.ceil(pricingInformation.discountAmount) ||
            values.discountAmount,
          taxId: pricingInformation?.tax?.id || selectedObject?.billing?.taxId,
          totalTax: Math.ceil(pricingInformation.totalTaxes) || values.totalTax,
          paidAmount: Math.ceil(values.paidAmount),
          paymentMethodId: values.paymentMethodId,
          note: values.note || "",
        },
        roomReservationSourceId: selectedObject.roomReservationSourceId,
        roomReservationStatusId: selectedObject.roomReservationStatusId,
      };

      // Remove extra fields
      delete updateData.reservationDateRange;
      delete updateData.actualCheckInDate;
      delete updateData.actualCheckOutDate;
      delete updateData.billing;
      delete updateData.basePrice;
      delete updateData.totalTax;
      delete updateData.discountAmount;
      delete updateData.totalPrice;

      // Check what fields have changed
      const changedFields = getChangedFieldValues(initialValues, updateData, {
        mappedGuests,
        amenities,
        mappedRoomPackages,
        reservationTypes,
        mappedChildren,
        paymentMethods,
      });

      // Show confirmation modal with changed fields
      showUpdateConfirmModal(changedFields, selectedObject.id, updateData);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };
  // Format currency
  const formatCurrency = (amount) => {
    return (
      amount?.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      }) || "LKR 0.00"
    );
  };

  const afterClose = () => {
    setSelectedAmenities([]);
    setAvailableRooms([]);
    setPricingInformation({});
    setInitialValues({});
  };

  return (
    <Modal
      title={
        <Space>
          <CalendarOutlined /> <span>Update Room Reservation</span>
        </Space>
      }
      open={open}
      onCancel={closeFormModal}
      width={900}
      footer={null}
      maskClosable={false}
      destroyOnClose
      afterClose={afterClose}
      styles={{
        header: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
        content: { background: !isDarkMode ? "#f5f5f5" : "#1f1f1f" },
      }}
    >
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 4px",
        }}
        className={`sider-content-scroll${isDarkMode ? " dark" : ""}`}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={(changedValues, allValues) => {
            // List of fields that should trigger price recalculation
            const priceFields = [
              "roomId",
              "reservationDateRange",
              "roomPackageId",
            ];
            // If any relevant field changes, recalculate price
            if (
              Object.keys(changedValues).some((field) =>
                priceFields.includes(field)
              )
            ) {
              // Only recalculate if all required fields are present
              const roomId = allValues.roomId;
              const dateRange = allValues.reservationDateRange;
              const roomPackageId = allValues.roomPackageId;
              if (roomId && dateRange && roomPackageId) {
                refreshPricing();
              }
            }
          }}
        >
          {/* Reservation Details */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card variant="borderless">
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Reservation Date Range"
                          title="Select check-in and check-out dates"
                        />
                      }
                      name="reservationDateRange"
                      rules={[
                        {
                          required: true,
                          message: "Please select reservation dates",
                        },
                      ]}
                      hasFeedback
                    >
                      <DatePicker.RangePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        minDate={
                          dayjs(selectedObject?.reservedCheckInDate).isBefore(
                            dayjs()
                          )
                            ? dayjs(
                                selectedObject?.reservedCheckInDate
                              ).startOf("day")
                            : dayjs()
                        }
                        onChange={(dates) => {
                          if (dates) {
                            form
                              .validateFields([
                                "adultNo",
                                "childNo",
                                "infantNo",
                              ])
                              .then((values) => {
                                fetchRooms(
                                  dates[0].format("YYYY-MM-DD"),
                                  dates[1].format("YYYY-MM-DD"),
                                  values.adultNo,
                                  values.childNo,
                                  values.infantNo
                                ).then((rooms) => setAvailableRooms(rooms));
                              });
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Row gutter={8}>
                      <Col span={8}>
                        <Form.Item
                          label={
                            <FormInputTooltip
                              label="Adults"
                              title="Number of adults"
                            />
                          }
                          name="adultNo"
                          rules={[{ required: true }]}
                          hasFeedback
                        >
                          <InputNumber
                            min={1}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label={
                            <FormInputTooltip
                              label="Children"
                              title="Number of children"
                            />
                          }
                          name="childNo"
                          rules={[{ required: true }]}
                          hasFeedback
                        >
                          <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label={
                            <FormInputTooltip
                              label="Infants"
                              title="Number of infants"
                            />
                          }
                          name="infantNo"
                          rules={[{ required: true }]}
                          hasFeedback
                        >
                          <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Room"
                          title="Select the room for this reservation"
                        />
                      }
                      name="roomId"
                      rules={[{ required: true }]}
                      hasFeedback
                    >
                      <Select placeholder="Select room">
                        {availableRooms.map((room) => (
                          <Option key={room.id} value={room.id}>
                            Room - {room.number || room.roomNumber}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Room Package"
                          title="Select the room package"
                        />
                      }
                      name="roomPackageId"
                      rules={[{ required: true }]}
                      hasFeedback
                    >
                      <Select
                        placeholder="Select package"
                        options={mappedRoomPackages}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="actualCheckInDate"
                      label={
                        <FormInputTooltip
                          label="Actual Check-in"
                          title="Actual check-in date and time"
                        />
                      }
                      hasFeedback
                    >
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Select check-in date time"
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Guest Information */}
            <Col span={24}>
              <Card
                title={
                  <Space>
                    <UserOutlined /> Guest Information
                  </Space>
                }
                variant="borderless"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Primary Guest"
                          title="Select the primary guest for this reservation"
                        />
                      }
                      name="primaryGuestId"
                      rules={[
                        {
                          required: true,
                          message: "Please select primary guest",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        placeholder="Select primary guest"
                        onChange={(value) => {
                          setPrimaryGuestId(value);
                          // Remove from additional guests if selected
                          const currentAdditional =
                            form.getFieldValue("guestIds") || [];
                          form.setFieldsValue({
                            guestIds: currentAdditional.filter(
                              (id) => id !== value
                            ),
                            childIds: [],
                          });
                        }}
                      >
                        {guests.map((guest) => (
                          <Option key={guest.id} value={guest.id}>
                            {guest.fullName} - {guest.email}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Additional Guests"
                          title="Select additional guests (adults) for this reservation"
                        />
                      }
                      name="guestIds"
                      hasFeedback
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select additional guests"
                        optionFilterProp="label"
                        options={mappedGuests.filter(
                          (g) => g.value !== primaryGuestId
                        )}
                        onChange={(values) => {
                          form.setFieldsValue({ childIds: [] });
                          const adultCount = form.getFieldValue("adultNo") || 1;
                          if (values.length + 1 > adultCount) {
                            form.setFieldsValue({
                              guestIds: values.slice(0, adultCount - 1),
                            });
                          }
                        }}
                        maxTagCount={5}
                        // Disable when maximum guests are already selected
                        disabled={
                          form.getFieldValue("guestIds")?.length + 1 >=
                          (form.getFieldValue("adultNo") || 1)
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Children"
                          title="Select children for this reservation"
                        />
                      }
                      name="childIds"
                      hasFeedback
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select children"
                        optionFilterProp="label"
                        onChange={(values) => {
                          // Check if selected children exceed the child count
                          const childCount = form.getFieldValue("childNo") || 0;
                          if (values.length > childCount) {
                            form.setFieldsValue({
                              childIds: values.slice(0, childCount),
                            });
                          }
                        }}
                        // Disable when maximum children are already selected
                        disabled={
                          form.getFieldValue("childIds")?.length >=
                          (form.getFieldValue("childNo") || 0)
                        }
                      >
                        {children
                          .filter((child) => {
                            // Get current values from form
                            const formValues = form.getFieldsValue([
                              "primaryGuestId",
                              "guestIds",
                            ]);
                            const allSelectedGuestIds = [
                              formValues.primaryGuestId,
                              ...(formValues.guestIds || []),
                            ].filter(Boolean);

                            return allSelectedGuestIds.includes(child.guestId);
                          })
                          .map((child) => (
                            <Option key={child.id} value={child.id}>
                              {child.fullName}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Reservation Type"
                          title="Select the reservation type"
                        />
                      }
                      name="reservationTypeId"
                      rules={[
                        {
                          required: true,
                          message: "Please select reservation type",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select placeholder="Select type">
                        {reservationTypes.map((type) => (
                          <Option key={type.value} value={type.value}>
                            {type.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label={
                        <FormInputTooltip
                          label="Note"
                          title="Special requests or notes"
                        />
                      }
                      name="note"
                      hasFeedback
                      rules={noteValidation}
                    >
                      <TextArea
                        rows={2}
                        placeholder="Special requests or notes"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Amenities */}
            <Col span={24}>
              <Card
                title={
                  <Space>
                    <CoffeeOutlined /> Amenities{" "}
                    <Tooltip title="Select and adjust quantities for extra amenities">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                }
                variant="borderless"
              >
                <Row gutter={[16, 16]}>
                  {amenities.map((amenity) => {
                    const selectedAmenity = selectedAmenities.find(
                      (a) => a.id === amenity.id
                    );
                    const quantity = selectedAmenity
                      ? selectedAmenity.quantity
                      : 0;

                    return (
                      <Col span={6} key={amenity.id}>
                        <Card
                          size="small"
                          style={{
                            height: "100%",
                          }}
                        >
                          <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                            {amenity.icon && (
                              <span style={{ marginRight: 6 }}>
                                {amenity.icon}
                              </span>
                            )}
                            {amenity.name}
                          </div>
                          <div style={{ color: "#777", marginBottom: 8 }}>
                            {formatCurrency(amenity.price)} each
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
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
                              onChange={(val) =>
                                handleAmenityQuantityChange(amenity.id, val)
                              }
                              style={{ width: 50, margin: "0 8px" }}
                            />
                            <Button
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
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>
            </Col>

            {/* Payment Information */}
            <Col span={24}>
              <Card
                title={
                  <Space>
                    <DollarOutlined /> Payment Information
                  </Space>
                }
                variant="borderless"
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Descriptions
                      size="small"
                      column={{ xs: 1, sm: 2, md: 4 }}
                      styles={{ label: { fontWeight: "bold" } }}
                    >
                      <Descriptions.Item label="Base Price">
                        <Form.Item name="basePrice" noStyle>
                          <InputNumber
                            disabled
                            style={{ width: "100%" }}
                            placeholder="0.00"
                            precision={2}
                            prefix="Rs."
                          />
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label="Discount">
                        <Form.Item name="discountAmount" noStyle>
                          <InputNumber
                            disabled
                            style={{ width: "100%" }}
                            placeholder="0.00"
                            precision={2}
                            prefix="Rs."
                          />
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label="Tax">
                        <Form.Item name="totalTax" noStyle>
                          <InputNumber
                            disabled
                            style={{ width: "100%" }}
                            placeholder="0.00"
                            precision={2}
                            prefix="Rs."
                          />
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label="Total">
                        <Form.Item name="totalPrice" noStyle>
                          <InputNumber
                            disabled
                            style={{
                              width: "100%",
                              color: "#389e0d",
                              fontWeight: "bold",
                              background: "#f6ffed",
                            }}
                            placeholder="0.00"
                            precision={2}
                            prefix="Rs."
                          />
                        </Form.Item>
                      </Descriptions.Item>
                    </Descriptions>
                    <div style={{ marginTop: 16 }}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label={
                              <FormInputTooltip
                                label="Payment Method"
                                title="Select the payment method used by the guest"
                              />
                            }
                            name="paymentMethodId"
                            rules={[{ required: true }]}
                            hasFeedback
                          >
                            <Select placeholder="Select payment method">
                              {paymentMethods.map((method) => (
                                <Option key={method.value} value={method.value}>
                                  {method.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label={
                              <FormInputTooltip
                                label="Amount Paid"
                                title="Enter the amount received from the guest"
                              />
                            }
                            name="paidAmount"
                            rules={[{ required: true }]}
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
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Flex justify="end">
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update Reservation
                  </Button>
                </Space>
              </Flex>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default RoomReservationUpdateForm;
