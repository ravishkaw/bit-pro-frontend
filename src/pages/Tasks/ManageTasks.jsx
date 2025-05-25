import useRoomTasks from "../../hooks/room/useRoomTasks";

import { TaskColumnItems } from "../../components/Table/TaskColumnItems";

import TaskForm from "../../components/Forms/TaskForm";
import GenericPage from "../GenericPage";

const ManageTasks = () => {
  const roomTaskModule = "Task";
  const rowKey = "id";
  const rooms = [];

  // Destructure functions and states
  const roomTasksHookData = useRoomTasks();

  return (
    <GenericPage
      module={roomTaskModule}
      hookData={roomTasksHookData}
      rowKey={rowKey}
      columnItems={TaskColumnItems}
      CustomForm={(props) => <TaskForm {...props} rooms={rooms} />}
    />
  );
};
export default ManageTasks;
