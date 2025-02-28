import { Col, Row } from "antd";

import { useAuth } from "../../contexts/AuthContext";
import usePricingRules from "../../hooks/usePricingRules";
import useModalStates from "../../hooks/useModalStates";

import TableCard from "../../components/DataDisplay/TableCard";
import { PricingRulesColumnItems } from "../../components/Table/RoomPricingRuleColumnItems";
import GenericModal from "../../components/Modals/GenericModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";
import RoomPricingRuleForm from "../../components/Forms/RoomPricingRuleForm";

const ManageRoomPricingRules = () => {
  const object = "room pricing rule"; // Define the object type for pricing rule

  // Find the module related to "Pricing Rule" in the privileges
  const { privileges } = useAuth();

  const pricingRuleModulePrivileges = privileges?.find(
    (privilegedModule) => privilegedModule.module_name === "Room Pricing Rule"
  );

  // Destructure functions and states from custom hooks
  const {
    pricingRules,
    loadOnePricingRule,
    loading,
    paginationDetails,
    setPaginationDetails,
    addPricingRule,
    updatePricingRule,
    deletePricingRule,
    roomTypes,
  } = usePricingRules();

  const {
    formModalState,
    openFormModal,
    closeFormModal,
    deleteModal,
    setDeleteModal,
    openDeleteModal,
    handleEdit,
  } = useModalStates();

  const { open, isEditing, selectedObject } = formModalState; // Extract modal state details

  // Generate table columns dynamically using PrivilegeColumnItems
  const columns = PricingRulesColumnItems(
    pricingRuleModulePrivileges,
    openDeleteModal,
    handleEdit,
    loadOnePricingRule
  );

  return (
    <>
      <Row>
        <Col span={24}>
          {/* TableCard Component: Displays the list of room pricing rule */}
          <TableCard
            object={object}
            columns={columns}
            rowKey="id"
            dataSource={pricingRules}
            privileges={pricingRuleModulePrivileges}
            loading={loading}
            paginationDetails={paginationDetails}
            setPaginationDetails={setPaginationDetails}
            handleEdit={handleEdit}
            openFormModal={openFormModal}
            openDeleteModal={openDeleteModal}
          />

          {/* Generic Modal: Used for adding or editing a privilege */}
          <GenericModal
            title={`${!isEditing ? "Add" : "Update"} pricing rule`}
            open={open}
            onCancel={closeFormModal}
            width={600}
            footer={null}
          >
            <RoomPricingRuleForm
              roomTypes={roomTypes} // Pass room Types to the form for role selection
              closeFormModal={closeFormModal}
              isEditing={isEditing}
              selectedObject={selectedObject}
              addPricingRule={addPricingRule}
              updatePricingRule={updatePricingRule}
            />
          </GenericModal>

          {/* Delete Confirmation Modal: Appears when deleting a pricing rule */}
          {pricingRules && pricingRules.length > 0 && (
            <DeleteConfirmModal
              object={object}
              deleteModal={deleteModal}
              setDeleteModal={setDeleteModal}
              deleteFunction={deletePricingRule}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ManageRoomPricingRules;
