import { useState } from "react";

// Handle modal states
// Profile Form Modal, Update Confirmation Modal, view Modal, Delete Confirmation Modal )
const useModalStates = () => {
  // Form modal state for Add / Edit forms
  const [formModalState, setFormModalState] = useState({
    open: false,
    isEditing: false,
    selectedObject: null,
  });

  // Form modal state for update confirmation modal
  const [updateConfirmModal, setUpdateConfirmModal] = useState({
    open: false,
    updatedValues: null,
    selectedPersonId: null,
    updatedData: null,
  });

  // Form modal state for data view modal
  const [viewModal, setViewModal] = useState({
    open: false,
    selectedObject: null,
  });

  // Form modal state for delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    selectedObject: null,
  });

  // Open the add/ edit form modal
  const openFormModal = (isEditing, selectedUser = null) => {
    setFormModalState({
      open: true,
      isEditing: isEditing,
      selectedObject: selectedUser,
    });
  };

  // Close the add/ edit form modal
  const closeFormModal = () => {
    setFormModalState({
      open: false,
      isEditing: false,
      selectedObject: null,
    });
  };

  // Open the delete confirmation modal
  const openDeleteModal = (record) => {
    setDeleteModal({ open: true, selectedObject: record });
  };

  // Show the update confirmation modal with updated data
  const showUpdateModal = (updatedValues, selectedPersonId, updatedData) => {
    setUpdateConfirmModal({
      open: true,
      updatedValues,
      selectedPersonId,
      updatedData,
    });
  };

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
    openDeleteModal,
    showUpdateModal,
  };
};
export default useModalStates;
