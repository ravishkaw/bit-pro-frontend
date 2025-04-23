import useInventory from "../../hooks/inventory/useInventory";

import InventoryForm from "../../components/Forms/InventoryForm";
import { InventoryColumnItems } from "../../components/Table/InventoryColumnItems";
import GenericPage from "../GenericPage";

// Inventory page
const Inventory = () => {
  const module = "Inventory"; // Define the module type for inventory
  const rowKey = "id"; // define row key for table

  // Destructure functions and states
  const hookData = useInventory();

  return (
    <GenericPage
      module={module}
      hookData={hookData}
      rowKey={rowKey}
      columnItems={InventoryColumnItems}
      CustomForm={InventoryForm}
    />
  );
};

export default Inventory;
