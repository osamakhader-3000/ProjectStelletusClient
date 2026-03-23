import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import Task from '../../../Domain/Entities/Task';
import styles from './TasksPage.module.css'
import { DependencyContext } from '../../../context/DependencyContext';

export default function TasksPage() {

  const { taskService } = useContext(DependencyContext);

  const [tasks, setData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      var _tasks = await taskService.ListTask();
      setData(_tasks);
      setIsLoading(false);
    }

    fetchData();


  }, []);


  const handleDeleteTask = async (taskid: string | null) => {

    if (!taskid) return;

    let result = await taskService.DeleteTask(taskid);

    if (result) {
      var _tasks = await taskService.ListTask();
      setData(_tasks);
    }
  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading your tasks ...</h3>
      </div>
    )

  return (
    <div className={styles.maincontainer}>
      <div className={styles.taskpagebuttonspanel}>
        <Link to={'../addtask/'} >
          <button type="button" className={styles.addtaskbuttonclass}>+ Add Task</button>
        </Link>
      </div>

      <div className={styles.taskspanel}>
        <h5 className={styles.taskstatustitle}>
          My Tasks
        </h5>

        {tasks.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.taskstatustitle}>No tasks assigned to you</h5></div>}

        {tasks.length > 0 && tasks.map((task: Task, index) => (
          <div key={index} className={styles.taskcontainer}>
            <span>
              {task.title}
            </span>

            <Link to={`/realm/task/${task.id}`}>
              <button className={styles.tasklistbuttonclass}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" width="20" height="20" fill="none" viewBox="0 0 24 24">
                </svg>
              </button>
            </Link>
            <button className={styles.tasklistbuttonclass} onClick={() => handleDeleteTask(task.id)}>
              <svg width="20" height="20" viewBox="0 0 30 30">
              </svg>
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}


