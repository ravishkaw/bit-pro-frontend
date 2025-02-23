import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Custom hook to handle printing functionality
const usePrintContent = () => {
  // Reference to the content that needs to be printed
  const contentRef = useRef(null);

  // Configure the print functionality using react-to-print
  const printFn = useReactToPrint({
    contentRef: contentRef, // Refers to the DOM element to be printed
    pageStyle: true, // Use default page styles for printing
  });

  // Return the reference and print function for external use
  return { contentRef, printFn };
};

export default usePrintContent;
