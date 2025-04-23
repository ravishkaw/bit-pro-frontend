import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Custom hook to handle printing functionality
const usePrintContent = () => {
  const contentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: contentRef, // Refers to the DOM element to be printed
    pageStyle: `
      @media print {
        body, html, div, p, h1, h2, h3, h4, h5, h6, span, table, tr, td, th {
          color: black !important;
          background-color: white !important;
        }
      }
    `,
  });

  return { contentRef, printFn };
};

export default usePrintContent;
