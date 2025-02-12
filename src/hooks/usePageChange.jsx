const usePageChange = (paginationDetails, setPaginationDetails) => {
  // Handle the pagination details and page size
  const handlePageChange = (pagination, filters, sorter) => {
    const isPageSizeChanged =
      pagination.pageSize !== paginationDetails.pageSize;

    setPaginationDetails({
      current: isPageSizeChanged ? 1 : pagination.current,
      pageSize: pagination.pageSize,
      sortBy: sorter.field,
      sortOrder: sorter.order,
      searchQuery: paginationDetails.searchQuery || "",
    });
    window.scrollTo(0, 0);
  };

  const handleCardPageChange = (page, pageSize) => {
    setPaginationDetails({
      ...paginationDetails,
      current: page,
      pageSize: pageSize,
    });
    window.scrollTo(0, 0);
  };

  return { handlePageChange, handleCardPageChange };
};

export default usePageChange;
