import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const usePrintContent = () => {
  // React print configuration
  const contentRef = useRef(null);
  const printFn = useReactToPrint({
    contentRef: contentRef,
    pageStyle: true,
  });

  return { contentRef, printFn };
};

export default usePrintContent;
