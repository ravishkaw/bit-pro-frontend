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
        maskClosable={false}
        width={850}
        footer={null}
      >
        <Title level={1}>Not Finished</Title>
        <Divider />
        <div ref={contentRef}>
          <Title level={5}>Personal Information</Title>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              Full Name : <Text>{selectedPerson?.fullName || "-"}</Text>
            </Col>
            <Col span={12}>
              Calling Name : <Text>{selectedPerson?.callingName || "-"}</Text>
            </Col>
            <Col span={12}>
              Nationality : <Text>{selectedPerson?.nationality || "-"}</Text>
            </Col>
            <Col span={12}>
              Date of Birth : <Text>{selectedPerson?.nationality || "-"}</Text>
            </Col>
            <Col span={12}>
              Id Type : <Text>{selectedPerson?.idType || "-"}</Text>
            </Col>
            <Col span={12}>
              Id Number : <Text>{selectedPerson?.idNumber || "-"}</Text>
            </Col>
          </Row>

          <Divider />
          <Title level={4}>Contact Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              Full Name : <Text>{selectedPerson?.fullName || "-"}</Text>
            </Col>
            <Col span={12}>
              Calling Name : <Text>{selectedPerson?.callingName || "-"}</Text>
            </Col>
            <Col span={12}>
              Nationality : <Text>{selectedPerson?.nationality || "-"}</Text>
            </Col>
            <Col span={12}>
              Date of Birth : <Text>{selectedPerson?.nationality || "-"}</Text>
            </Col>
            <Col span={12}>
              Id Type : <Text>{selectedPerson?.idType || "-"}</Text>
            </Col>
            <Col span={12}>
              Id Number : <Text>{selectedPerson?.idNumber || "-"}</Text>
            </Col>
          </Row>
          <Divider />
          {personType == "Employee" && (
            <>
              <Title level={4}>Employement Information</Title>{" "}
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  Full Name : <Text>{selectedPerson?.fullName || "-"}</Text>
                </Col>
                <Col span={12}>
                  Calling Name :{" "}
                  <Text>{selectedPerson?.callingName || "-"}</Text>
                </Col>
                <Col span={12}>
                  Nationality :{" "}
                  <Text>{selectedPerson?.nationality || "-"}</Text>
                </Col>
                <Col span={12}>
                  Date of Birth :{" "}
                  <Text>{selectedPerson?.nationality || "-"}</Text>
                </Col>
                <Col span={12}>
                  Id Type : <Text>{selectedPerson?.idType || "-"}</Text>
                </Col>
                <Col span={12}>
                  Id Number : <Text>{selectedPerson?.idNumber || "-"}</Text>
                </Col>
              </Row>
              {JSON.stringify(selectedPerson)}
            </>
          )}
        </div>
        <Divider />
        <Flex justify="space-between">
          <Button
            onClick={() => {
              handleEdit(selectedPerson.id);
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
