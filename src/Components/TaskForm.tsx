
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SaveTask,GetTask } from '../../APIsManagers/TasksManager.ts';
import Task from '../../DataTransferObjects/Task.ts'

interface TaskFormProps {
  taskid: string;
  readonly: boolean;
}


export default function TaskForm({ taskid, readonly }:TaskFormProps) 
{   
    const navigate = useNavigate();

      const [taskFormData, setTaskFormData] = useState({
        id:taskid,
        title: "",
        description: ""
      });
/*
      const isNewTask=()=>{
          if (taskid !== null && taskid.length >0 && taskid !== '00000000-0000-0000-0000-000000000000')
            return false;
          return true; 
      };
*/
      useEffect(() => {
        const fetchTask = async () => {
          const isNewTask = taskid === null || taskid.length === 0 || taskid === '00000000-0000-0000-0000-000000000000';
          let _task = new Task('00000000-0000-0000-0000-000000000000', '', '');
          if (!isNewTask) {
            _task = await GetTask(taskid);
          }
          setTaskFormData(_task);
        };
        fetchTask();
      }, [taskid]);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTaskFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const addTask = () => {
        SaveTask(taskFormData, handleCancel);
      };

      const handleCancel=()=>{
        navigate('/realm/mytasks');

      }



    return (<>
            <div className='taskformcontainer'>
                <div className='taskformelementcontainer'>
                    <div>Title:</div> 
                    <div className="formtextboxdiv">
                        <input type="text" className="formtextbox" 
                        onChange={handleInputChange} value={taskFormData.title} name="title"></input>
                    </div>
                </div>
                <div className='taskformelementcontainer'>
                    <div>Decription:</div> 
                    <div className="formtextboxdiv">
                        <textarea rows={20} className="formtextbox formtextarea" 
                        onChange={handleTextAreaInputChange} value={taskFormData.description} name="description">
                        </textarea>
                    </div>
                </div>
                <div className='taskformelementcontainer taskformelementbuttoncontainer'>
                   
                        <button className="taskformbutton taskformokbutton" onClick={addTask}>
                            Add
                        </button>
                     
                    <button className="taskformbutton" onClick={handleCancel}>cancel</button>
                </div>
            </div>
        </>)

}