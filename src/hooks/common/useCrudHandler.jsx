import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import usePagination from "./usePagination";

// General hook to manage All CRUD Operations
const useCrudHandler = ({
  service, // axios service function
  entityName,
  formatData = (data) => data, // special formattings
  additionalFunc = [], // additional useEffect funtions
  disableAutoLoad = false, // load data on mount or not
}) => {
  const [data, setData] = useState([]); // list of data
  const [loading, setLoading] = useState(false);

  // destructure service
  const { getAll, getById, create, update, remove, restore } = service;

  // Pagination and sorting details
  const { paginationDetails, setPaginationDetails } = usePagination();

  // Fetch all data based on pagination and sorting
  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await getAll({
        pageNumber: paginationDetails.current - 1, // Convert to 0-based index to match with backend and antd
        pageSize: paginationDetails.pageSize,
        sortBy: paginationDetails.sortBy,
        sortOrder: paginationDetails.sortOrder,
        searchQuery: paginationDetails.searchQuery,
      });
      setData(resp.data || resp);
      setPaginationDetails((prev) => ({ ...prev, total: resp.totalElements })); // Update total count
    } catch (err) {
      setData([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data when pagination or sorting changes
  useEffect(() => {
    if (!disableAutoLoad) {
      loadData();
    }
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  useEffect(() => {
    additionalFunc.forEach((func) => func());
  }, []);

  // fetch a single item
  const loadOneItem = async (id) => {
    try {
      const item = await getById(id);
      return formatData(item); // format if there is formatter provided
    } catch (err) {
      toast.error(err.message || `Failed to load ${entityName} details`);
      return null;
    }
  };

  const handleApiCall = async (apiCallFn, successMessage) => {
    setLoading(true);
    try {
      await apiCallFn();
      toast.success(successMessage);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      loadData();
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (values) => {
    handleApiCall(() => create(values), `${entityName} added successfully`);
  };

  // update an item
  const updateItem = async (id, values) => {
    handleApiCall(
      () => update(id, values),
      `${entityName} updated successfully`
    );
  };

  // delete a item
  const deleteItem = async (id) => {
    handleApiCall(() => remove(id), `${entityName} deleted successfully`);
  };

  // restore item ( if restore can be done)
  const restoreItem = async (id) => {
    if (!restore) return;
    handleApiCall(() => restore(id), `${entityName} restored successfully`);
  };

  return {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useCrudHandler;
