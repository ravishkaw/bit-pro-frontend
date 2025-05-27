import { Modal, Button, Space, Typography, Flex } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const { Text } = Typography;

const ReceiptModal = ({
  receiptModalOpen,
  setReceiptModalOpen,
  receiptUrl,
}) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    let url;
    if (receiptUrl) {
      axiosInstance
        .get(receiptUrl, { responseType: "blob" })
        .then((response) => {
          url = URL.createObjectURL(response.data);
          setPdfBlobUrl(url);
        })
        .catch(() => setPdfBlobUrl(null));
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
      setPdfBlobUrl(null);
    };
  }, [receiptUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleBrowserPrint = () => {
    if (pdfBlobUrl) {
      const printWindow = window.open(pdfBlobUrl, "_blank");
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
      } else {
        console.error("Failed to open print window. Please allow popups.");
      }
    }
  };

  return (
    <Modal
      open={receiptModalOpen}
      onCancel={() => setReceiptModalOpen(false)}
      footer={null}
      title={
        <Flex
          justify="space-between"
          align="center"
          style={{ marginRight: 40 }}
        >
          <Text strong>Receipt</Text>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handleBrowserPrint}
            size="small"
            disabled={!pdfBlobUrl}
          >
            Print
          </Button>
        </Flex>
      }
      width={800}
      styles={{ body: { minHeight: 600 } }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>Your receipt is ready:</Text>
        <div
          style={{
            border: "1px solid #eee",
          }}
        >
          <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={750}
              />
            ))}
          </Document>
        </div>
      </Space>
    </Modal>
  );
};

export default ReceiptModal;
