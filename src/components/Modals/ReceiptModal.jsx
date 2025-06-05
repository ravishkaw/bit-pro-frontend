import { Modal, Button, Space, Typography, Flex } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  } catch (error) {
    // Fallback for if public worker fails
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }
}

const { Text } = Typography;

const ReceiptModal = ({
  receiptModalOpen,
  setReceiptModalOpen,
  receiptUrl,
}) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url;
    if (receiptUrl) {
      setLoading(true);
      setError(null);

      axiosInstance
        .get(receiptUrl, { responseType: "blob" })
        .then((response) => {
          url = URL.createObjectURL(response.data);
          setPdfBlobUrl(url);
        })
        .catch((error) => {
          console.error("Error loading PDF:", error);
          setError("Failed to load receipt");
          setPdfBlobUrl(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
      setPdfBlobUrl(null);
    };
  }, [receiptUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setError("Failed to display PDF");
  };

  const handleBrowserPrint = () => {
    if (pdfBlobUrl) {
      const printWindow = window.open(pdfBlobUrl, "_blank");
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
      } else {
        console.error("Failed to open print window. Please allow popups.");
        // Fallback: try to download the file
        const link = document.createElement("a");
        link.href = pdfBlobUrl;
        link.download = "receipt.pdf";
        link.click();
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
            disabled={!pdfBlobUrl || loading}
            loading={loading}
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
            minHeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading && <Text>Loading receipt...</Text>}
          {error && <Text type="danger">{error}</Text>}
          {pdfBlobUrl && !loading && !error && (
            <Document
              file={pdfBlobUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<Text>Loading PDF...</Text>}
              error={<Text type="danger">Failed to load PDF</Text>}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={750}
                  loading={<Text>Loading page...</Text>}
                  error={<Text type="danger">Failed to load page</Text>}
                />
              ))}
            </Document>
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default ReceiptModal;
