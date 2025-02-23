const usePageChange = (paginationDetails, setPaginationDetails) => {
  // Handle pagination details when using table pagination
  const handlePageChange = (pagination, filters, sorter) => {
    // Check if the page size has changed
    const isPageSizeChanged =
      pagination.pageSize !== paginationDetails.pageSize;

    // Update pagination details based on the new page or page size
    setPaginationDetails({
      current: isPageSizeChanged ? 1 : pagination.current, // Reset to page 1 if page size changes
      pageSize: pagination.pageSize,
      sortBy: sorter.field, // Sorting field
      sortOrder: sorter.order, // Sorting order
      searchQuery: paginationDetails.searchQuery || "", // Preserve the search query
    });

    // Scroll to the top of the page after changing pages
    window.scrollTo(0, 0);
  };

  // Handle pagination details when using card-based pagination
  const handleCardPageChange = (page, pageSize) => {
    setPaginationDetails({
      ...paginationDetails,
      current: page,
      pageSize: pageSize, 
    });

    window.scrollTo(0, 0);
  };

  // Return both pagination handlers for external use
  return { handlePageChange, handleCardPageChange };
};

export default usePageChange;
