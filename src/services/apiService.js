import axiosInstance from "./axiosInstance";

// Generic API service for CRUD operations.
export const createApiService = (baseUrl) => {
  // Fetch all records
  const getAll = async (options = {}) => {
    
    const { pageNumber, pageSize, sortBy, sortOrder, searchQuery } = options;

    // Build params for pagination/ search query
    const params = {};

    if (pageNumber !== undefined) params.pageNumber = pageNumber;
    if (pageSize !== undefined) params.pageSize = pageSize;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder === "descend" ? "desc" : "asc";
    if (searchQuery) params.searchQuery = searchQuery;

    const response = await axiosInstance.get(baseUrl, { params });
    return response.data;
  };

  // Fetch a single record by ID
  const getById = async (id) => {
    const response = await axiosInstance.get(`${baseUrl}/${id}`);
    return response.data;
  };

  // Create a new record
  const create = async (values) => {
    await axiosInstance.post(baseUrl, values);
  };

  // Update an existing record by ID
  const update = async (id, values) => {
    await axiosInstance.put(`${baseUrl}/${id}`, values);
  };

  // Delete a record by ID
  const remove = async (id) => {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.data;
  };

  // Restore a deleted record by ID
  const restore = async (id) => {
    const response = await axiosInstance.put(`${baseUrl}/${id}/restore`);
    return response.data;
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    restore,
  };
};
