
import { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../context/DependencyContext';
import Task from '../../Domain/Entities/Task';
import styles from './TaskForm.module.css'

interface TaskFormProps {
  taskid: string;
  readonly: boolean;
}


export default function TaskForm({ taskid }:TaskFormProps) 
{   

     const { taskService } = useContext(DependencyContext); 
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
            _task = await taskService.GetTask(taskid);
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
        taskService.SaveTask(taskFormData);
      };

      const handleCancel=()=>{
        navigate('/realm/mytasks');

      }



    return (<>
            <div className={styles.taskformcontainer}>
                <div className={styles.taskformelementcontainer}>
                    <div>Title:</div> 
                    <div className={styles.formtextboxdiv}>
                        <input type="text" className={styles.formtextbox} 
                        onChange={handleInputChange} value={taskFormData.title} name="title"></input>
                    </div>
                </div>
                <div className={styles.taskformelementcontainer}>
                    <div>Decription:</div> 
                    <div className={styles.formtextboxdiv}>
                        <textarea rows={20} className={`${styles.formtextbox} ${styles.formtextarea}`} 
                        onChange={handleTextAreaInputChange} value={taskFormData.description} name="description">
                        </textarea>
                    </div>
                </div>
                <div className={`${styles.taskformelementcontainer}} ${styles.taskformelementbuttoncontainer}`}>
                   
                        <button className={`${styles.taskformbutton} ${styles.taskformokbutton}`} onClick={addTask}>
                            Add
                        </button>
                     
                    <button className={styles.taskformbutton} onClick={handleCancel}>cancel</button>
                </div>
            </div>
        </>)

}