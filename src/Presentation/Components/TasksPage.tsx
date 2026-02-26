import { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router';
import Task from '../../Domain/Entities/Task'; 
import styles from './TasksPage.module.css'
import { DependencyContext } from '../../context/DependencyContext';

export default function TasksPage(){

     const { taskService } = useContext(DependencyContext);
     
    const [tasks, setData] = useState<Task[]>([]);

    useEffect(() => {
      const fetchData = async () => {

    
        var _tasks = await taskService.ListTask();  
        setData(_tasks);
      }
  
      fetchData();  
  
  
    }, []);

      
    const handleDeleteTask=async(taskid: string)=>{
      
      await taskService.DeleteTask(taskid);
      var _tasks = await taskService.ListTask();  
        setData(_tasks);

    }

    if(tasks.length == 0)
      return(
    <p>loading...</p>
      )

  return (
    <table>
      <thead>
      <tr>
        <th>
          <div className={styles.taskpagebuttonspanel}>           
            <Link to={'../realm/task/00000000-0000-0000-0000-000000000000'} >
              <button type="button" className={styles.addtaskbuttonclass}>+ Add Task</button>  
            </Link>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>
      <div className={styles.taskpagebuttonspanel}> 
        <h5 className={styles.taskstatustitle}>
          Pending Tasks
        </h5>       
        
          {tasks.map((task:Task, index) => (
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
      </td>
      </tr>
      </tbody>
      
    </table>
  );
}


