import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import handleApiCall from "./useApiHandler";
import usePagination from "./usePagination";

// General hook to manage All CRUD Operations
const useCrudHandler = ({
  service, // api service
  entityName, // name of the entity (E.g., Room, Employee)
  isPaginated = true, // check pagination
  initialLoad = true, // to load when navigated to the page
  formatData = (data) => data, // any specific format function for data or just return as it is
  dependencies = [], // useEffect dependency
}) => {
  const [data, setData] = useState([]); // store the response data
  const [loading, setLoading] = useState(false);
  const { paginationDetails, setPaginationDetails } = usePagination();

  // destructure service
  const { getAll, getById, create, update, remove, restore } = service;

  // fetch all data from the server
  const loadData = async () => {
    try {
      setLoading(true);
      let resp;

      //fetch paginated data
      if (isPaginated) {
        resp = await getAll({
          pageNumber: paginationDetails.current - 1,
          pageSize: paginationDetails.pageSize,
          sortBy: paginationDetails.sortBy,
          sortOrder: paginationDetails.sortOrder,
          searchQuery: paginationDetails.searchQuery,
        });
        setData(resp.data);
        setPaginationDetails((prev) => ({
          ...prev,
          total: resp.totalElements,
        }));
      } else {
        // fetch all data ( not paginated )
        resp = await getAll();
        setData(resp);
      }
    } catch (err) {
      setData([]);
      toast.error(err.message || `Failed to load ${entityName}`);
    } finally {
      setLoading(false);
    }
  };

  // fetch a single item
  const loadOneItem = async (id) => {
    setLoading(true);
    try {
      const item = await getById(id);
      return formatData(item); // format if there is formatter provided
    } catch (err) {
      toast.error(err.message || `Failed to load ${entityName} details`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (values) => {
    handleApiCall(
      () => create(values),
      `${entityName} added successfully`,
      setLoading,
      loadData
    );
  };

  // update an item
  const updateItem = async (id, values) => {
    handleApiCall(
      () => update(id, values),
      `${entityName} updated successfully`,
      setLoading,
      loadData
    );
  };

  // delete a item
  const deleteItem = async (id) => {
    handleApiCall(
      () => remove(id),
      `${entityName} deleted successfully`,
      setLoading,
      loadData
    );
  };

  // restore item ( if restore can be done)
  const restoreItem = async (id) => {
    if (!restore) return;
    handleApiCall(
      () => restore(id),
      `${entityName} restored successfully`,
      setLoading,
      loadData
    );
  };

  // Initial data load
  useEffect(() => {
    if (initialLoad) {
      loadData();
    }
  }, [...dependencies]);

  // Load data when pagination changes (if paginated)
  useEffect(() => {
    if (isPaginated && initialLoad) {
      loadData();
    }
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  return {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadData,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  };
};

export default useCrudHandler;
