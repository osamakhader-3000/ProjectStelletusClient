import { useState, useEffect } from 'react';
import {ListTasks,DeleteTask} from '../../APIsManagers/TasksManager.ts'
import { Link } from 'react-router';
import Task from '../../DataTransferObjects/Task.ts'

export default function TasksPage(){

     
    const [tasks, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
    
        var _tasks = await ListTasks();  
        setData(_tasks);
      }
  
      fetchData();  
  
  
    }, []);

      
    const handleDeleteTask=async(taskid: string)=>{
      
      await DeleteTask(taskid);
      var _tasks = await ListTasks();  
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
          <div className='taskpagebuttonspanel'>           
            <Link to={'../realm/task/00000000-0000-0000-0000-000000000000'} >
              <button type="button" className="addtaskbuttonclass">+ Add Task</button>  
            </Link>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>
      <div className='taskpagebuttonspanel'> 
        <h5 className='taskstatustitle'>
          Pending Tasks
        </h5>       
        
          {tasks.map((task:Task, index) => (
              <div key={index} className='taskcontainer'>                
                <span>
                  {task.title}                   
                </span>
                 
                <Link to={`/realm/task/${task.id}`}>                
                  <button className='tasklistbuttonclass'>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                    </svg>
                  </button>
                </Link> 
                <button className='tasklistbuttonclass' onClick={() => handleDeleteTask(task.id)}>
                  <svg width="20" height="20" viewBox="0 0 30 30">
                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
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


