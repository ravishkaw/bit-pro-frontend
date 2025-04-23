import { useState } from "react";

const usePagination = () => {
  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    sortBy: "id",
    sortOrder: "descend",
    total: 0,
    searchQuery: "",
  });

  return { paginationDetails, setPaginationDetails };
};
export default usePagination;
