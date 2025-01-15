import { useRef } from "react";
import {
  Button,
  Col,
  Divider,
  Flex,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ViewPerson = ({ personType, viewModal, setViewModal, handleEdit }) => {
  const { open, selectedPerson } = viewModal;

  const closeViewModal = () => {
    setViewModal({ open: false, selectedPerson: null });
  };

  const contentRef = useRef(null);
  const printFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `${personType} Details`,
    pageStyle: true,
    copyShadowRoots: true,
  });

  return (
    <>
      <Modal
        title={`${personType} Details`}
        open={open}
        onCancel={closeViewModal}
        maskClosable={false}
        width={850}
        footer={null}
      >
        <div ref={contentRef}>
          <Title level={5}>Personal Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <b> Full Name : </b>
              <Text>{selectedPerson?.fullName || "-"}</Text>
            </Col>
            <Col span={12}>
              <b> Calling Name : </b>
              <Text>{selectedPerson?.callingName || "-"}</Text>
            </Col>
            <Col span={12}>
              <b> Nationality : </b>
              <Text>{selectedPerson?.nationality || "-"}</Text>
            </Col>
            <Col span={12}>
              <b> Gender : </b>
              <Text>{selectedPerson?.gender || "-"}</Text>
            </Col>
            <Col span={12}>
              <b> Date of Birth :</b>
              <Text>
                {dayjs(selectedPerson?.dob).format("YYYY-MM-DD") || "-"}
              </Text>
            </Col>
            <Col span={12}>
              <b> Civil Status : </b>
              <Text>{selectedPerson?.civilStatus || "-"}</Text>
            </Col>
          </Row>

          <Divider />
          <Title level={5}>Contact Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              Address : <Text>{selectedPerson?.address || "-"}</Text>
            </Col>
            <Col span={12}>
              Mobile No : <Text>{selectedPerson?.mobileNo || "-"}</Text>
            </Col>
            <Col span={12}>
              Email : <Text>{selectedPerson?.email || "-"}</Text>
            </Col>
            <Col span={12}>
              Emergency No : <Text>{selectedPerson?.emergencyNo || "-"}</Text>
            </Col>
          </Row>

          {personType === "Employee" && (
            <>
              <Divider />
              <Title level={5}>Employment Information</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  Employee No : <Text>{selectedPerson?.empNo || "-"}</Text>
                </Col>
                <Col span={12}>
                  Designation :<Text>{selectedPerson?.designation || "-"}</Text>
                </Col>
                <Col span={12}>
                  Employee Status :
                  <Text>{selectedPerson?.employeeStatus || "-"}</Text>
                </Col>
              </Row>
            </>
          )}
        </div>

        <Divider />
        <Flex justify="space-between">
          <Button
            onClick={() => {
              handleEdit(selectedPerson?.id);
              closeViewModal();
            }}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
          <Space>
            <Button onClick={() => closeViewModal()}>Close</Button>
            <Button color="primary" variant="solid" onClick={() => printFn()}>
              Print
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  );
};

export default ViewPerson;
