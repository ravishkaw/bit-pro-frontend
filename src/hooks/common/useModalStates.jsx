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

  // State for DeleteRestore Confirmation modal
  const [deleteRestoreModal, setdeleteRestoreModal] = useState({
    open: false, // Whether the modal is open
    isDelete: true, // Whether model is delete or restore
    selectedObject: null, // The object being delete / Restore
  });

  // Open the Add/Edit form modal
  const openFormModal = (isEditing, selectedObject = null) => {
    setFormModalState({
      open: true,
      isEditing: isEditing, // Set to true for editing, false for adding
      selectedObject: selectedObject, // Pass the user object if editing
    });
  };

  // Load single object data and open the form modal
  const handleEdit = async (apiFunction, id) => {
    const singleObject = await apiFunction(id); // fetch single object with the id like single employee, room
    openFormModal(true, singleObject);
  };

  // Close the Add/Edit form modal
  const closeFormModal = () => {
    setFormModalState({
      open: false,
      isEditing: false,
      selectedObject: null, // Reset all state values
    });
  };

  // Open the deleteRestore Confirmation modal
  const opendeleteRestoreModal = (isDelete, record) => {
    setdeleteRestoreModal({
      open: true,
      isDelete: isDelete, // Set to true for delete, false for restore
      selectedObject: record, // Pass the record to be delete/Restore
    });
  };

  // close the deleteRestore Confirmation modal
  const closedeleteRestoreModal = () => {
    setdeleteRestoreModal({
      open: false,
      isDelete: true, // reset to true / default delete
      selectedObject: null, // Reset all state values
    });
  };

  // Show the Update Confirmation modal with updated data
  const showUpdateConfirmModal = (
    updatedValues,
    selectedObjectId,
    updatedData
  ) => {
    setUpdateConfirmModal({
      open: true,
      updatedValues, // Updated field values
      selectedObjectId, // ID of the Object being updated
      updatedData, // Full updated data object
    });
  };

  // close the Update Confirmation modal
  const closeUpdateConfirmModal = () => {
    setUpdateConfirmModal({
      open: false,
      updatedValues: null,
      selectedObjectId: null,
      updatedData: null,
    });
  };

  // Load single object data and open the view modal
  const handleView = async (apiFunction, id) => {
    const singleObject = await apiFunction(id); // fetch single object  with the id like single employee, room
    setViewModal({ open: true, selectedObject: singleObject });
  };

  // Close the view form modal
  const closeViewModal = () => {
    setViewModal({ open: false, selectedObject: null });
  };

  // Return all modal states and functions for external use
  return {
    formModalState,
    setFormModalState,
    handleEdit,
    openFormModal,
    closeFormModal,
    viewModal,
    setViewModal,
    handleView,
    closeViewModal,
    deleteRestoreModal,
    opendeleteRestoreModal,
    closedeleteRestoreModal,
    updateConfirmModal,
    showUpdateConfirmModal,
    closeUpdateConfirmModal,
  };
};

export default useModalStates;
