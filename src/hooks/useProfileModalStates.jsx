import { useState } from "react";

const useProfileModalStates = () => {
  const [profileFormModalState, setProfileFormModalState] = useState({
    open: false,
    isEditing: false,
    selectedPerson: null,
  });

  const [updateConfirmModal, setUpdateConfirmModal] = useState({
    open: false,
    updatedValues: null,
    selectedPersonId: null,
    updatedData: null,
  });

  const [viewModal, setViewModal] = useState({
    open: false,
    selectedPerson: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    selectedPerson: null,
  });
  return {
    profileFormModalState,
    setProfileFormModalState,
    updateConfirmModal,
    setUpdateConfirmModal,
    viewModal,
    setViewModal,
    deleteModal,
    setDeleteModal,
  };
};
export default useProfileModalStates;
