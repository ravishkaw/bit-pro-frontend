import { useState } from "react";

// Custom hook to handle modal states for various modals
const useModalStates = () => {
  // State for Add/Edit form modal
  const [formModalState, setFormModalState] = useState({
    open: false, // Whether the modal is open
    isEditing: false, // Whether the modal is in edit mode
    selectedObject: null, // The object being edited
  });

  // State for Update Confirmation modal
  const [updateConfirmModal, setUpdateConfirmModal] = useState({
    open: false, // Whether the modal is open
    updatedValues: null, // Updated values to confirm
    selectedObjectId: null, // ID of the Object being updated
    updatedData: null, // Full updated data object
  });

  // State for View modal
  const [viewModal, setViewModal] = useState({
    open: false, // Whether the modal is open
    selectedObject: null, // The object being viewed
  });

  // State for Delete Confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    open: false, // Whether the modal is open
    selectedObject: null, // The object being deleted
  });

  // Open the Add/Edit form modal
  const openFormModal = (isEditing, selectedObject = null) => {
    setFormModalState({
      open: true,
      isEditing: isEditing, // Set to true for editing, false for adding
      selectedObject: selectedObject, // Pass the user object if editing
    });
  };

  // Close the Add/Edit form modal
  const closeFormModal = () => {
    setFormModalState({
      open: false,
      isEditing: false,
      selectedObject: null, // Reset all state values
    });
  };

  // Open the Delete Confirmation modal
  const openDeleteModal = (record) => {
    setDeleteModal({
      open: true,
      selectedObject: record, // Pass the record to be deleted
    });
  };

  // Show the Update Confirmation modal with updated data
  const showUpdateModal = (updatedValues, selectedObjectId, updatedData) => {
    setUpdateConfirmModal({
      open: true,
      updatedValues, // Updated field values
      selectedObjectId, // ID of the Object being updated
      updatedData, // Full updated data object
    });
  };

  // Close the view form modal
  const closeViewModal = () => {
    setViewModal({ open: false, selectedObject: null });
  };

  // Handle view action: Load single object data and open the view modal
  const handleView = async (apiFunction, id) => {
    const singleObject = await apiFunction(id); // fetch single object  with the id like single employee, room
    setViewModal({ open: true, selectedObject: singleObject });
  };

  // Handle edit action: Load single object data and open the form modal
  const handleEdit = async (apiFunction, id) => {
    const singleObject = await apiFunction(id); // fetch single object with the id like single employee, room
    openFormModal(true, singleObject);
  };

  // Return all modal states and functions for external use
  return {
    formModalState,
    setFormModalState,
    updateConfirmModal,
    setUpdateConfirmModal,
    viewModal,
    setViewModal,
    deleteModal,
    setDeleteModal,
    openFormModal,
    closeFormModal,
    closeViewModal,
    openDeleteModal,
    showUpdateModal,
    handleEdit,
    handleView,
  };
};

export default useModalStates;
