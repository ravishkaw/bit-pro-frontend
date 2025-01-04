import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd";
import { useState } from "react";

const { Paragraph, Text } = Typography;

const EditDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  personType,
  employee,
}) => {
  const [formData, setFormData] = useState(employee);

  return (
    <Drawer
      title={`View ${personType} Details`}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      width={640}
      placement="right"
      extra={
        <Space>
          <Button type="primary">Edit</Button>
        </Space>
      }
    >
      <h3>Personal Information</h3>
      <br />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>First Name</Text>
          <Paragraph>{formData?.firstName || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Last Name</Text>
          <Paragraph>{formData?.lastName || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Nationality</Text>
          <Paragraph>{formData?.nationality || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>NIC</Text>
          <Paragraph>{formData?.nic || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Date of Birth</Text>
          <Paragraph>{formData?.dob || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Gender</Text>
          <Paragraph>{formData?.gender || "-"}</Paragraph>
        </Col>
      </Row>

      <Divider />

      <h3>Contact Information</h3>
      <br />
      <Row>
        <Col span={12}>
          <Text strong>Address</Text>
          <Paragraph>{formData?.address || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Contact Number</Text>
          <Paragraph>{formData?.phone || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Email</Text>
          <Paragraph>{formData?.email || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Emergency Contact</Text>
          <Paragraph>{formData?.emergencyContact || "-"}</Paragraph>
        </Col>
      </Row>

      {personType === "Employee" && (
        <>
          <Divider />
          <h3>Employment Information</h3>
          <br />
          <Row>
            <Col span={12}>
              <Text strong>Job Role</Text>
              <Paragraph>{formData?.jobRole || "-"}</Paragraph>
            </Col>
            <Col span={12}>
              <Text strong>Department</Text>
              <Paragraph>{formData?.department || "-"}</Paragraph>
            </Col>
            <Col span={12}>
              <Text strong>Salary</Text>
              <Paragraph>{formData?.salary || "-"}</Paragraph>
            </Col>
          </Row>
        </>
      )}
      <Divider />
      <h3>More Information</h3>
      <br />
      <Row>
        <Col span={12}>
          <Text strong>Status</Text>
          <Paragraph>{formData?.status || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Added On</Text>
          <Paragraph>{formData?.addedDate || "-"}</Paragraph>
        </Col>
        <Col span={12}>
          <Text strong>Added By</Text>
          <Paragraph>{formData?.addedBy || "-"}</Paragraph>
        </Col>
      </Row>
    </Drawer>
  );
};

export default EditDrawer;
