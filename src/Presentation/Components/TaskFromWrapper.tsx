import { useParams } from 'react-router';
import TaskForm from './TaskForm.tsx';

function TaskFormWrapper() {
  const { taskid="00000000-0000-0000-0000-000000000000" } = useParams<string>();
  return <TaskForm taskid={taskid} readonly={false} />;
}

export default TaskFormWrapper;
