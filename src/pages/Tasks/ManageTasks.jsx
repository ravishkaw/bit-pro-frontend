import { TaskColumnItems } from "../../components/Table/TaskColumnItems";

import TaskForm from "../../components/Forms/TaskForm";
import GenericPage from "../GenericPage";
import useTasks from "../../hooks/tasks/useTasks";

const ManageTasks = () => {
  const roomTaskModule = "Task";
  const rowKey = "id";

  // Destructure functions and states
  const roomTasksHookData = useTasks();

  return (
    <GenericPage
      module={roomTaskModule}
      hookData={roomTasksHookData}
      rowKey={rowKey}
      columnItems={TaskColumnItems}
      CustomForm={TaskForm}
    />
  );
};
export default ManageTasks;
