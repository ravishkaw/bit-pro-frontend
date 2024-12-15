import { useEffect, useState } from "react";
import { message } from "antd";

import {
  fetchGuests,
  addGuest,
  updateGuest,
  deleteGuest,
} from "../../Services/guest";

const useGuests = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const msgSuccess = (value) => {
    messageApi.success(`Guest ${value} Succesfully`);
  };
  const msgError = (value) => {
    messageApi.error(`Guest ${value} failed`);
  };
  const msgWarn = (value) => {
    messageApi.warning(`Guest ${value} canceled`);
  };

  const loadGuests = async () => {
    try {
      const data = await fetchGuests();
      setGuests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const createGuest = async (values) => {
    try {
      await addGuest(values);
      msgSuccess("added");
      loadGuests();
    } catch (err) {
      msgError("adding");
      throw new Error();
    }
  };

  const updateGuestRecord = async (id, values) => {
    try {
      await updateGuest(id, values);
      msgSuccess("updated");
      loadGuests();
    } catch (err) {
      msgError("updateding");
      throw new Error();
    }
  };

  const deleteGuestRecord = async (id) => {
    try {
      await deleteGuest(id);
      msgSuccess("deleted");
      loadGuests();
    } catch (err) {
      msgError("deleting");
      throw new Error();
    }
  };

  return {
    guests,
    loading,
    error,
    createGuest,
    updateGuestRecord,
    deleteGuestRecord,
    contextHolder,
  };
};

export default useGuests;
