import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../context/DependencyContext';
import Task from '../../Domain/Entities/Task';
import styles from './TaskForm.module.css'
import { TextBox } from './GeneralComponents/TextBox';
import { MultiLineTextBox } from './GeneralComponents/MultiLineTextBox';

interface TaskFormProps {
  taskId?: string|null;
  taskTitle?: string|null;
  taskDescription?: string|null;
  editMode?: boolean;
}


export default function TaskForm({ taskId = null, taskTitle = null, taskDescription = null, editMode: editMode = false }: TaskFormProps) {

  const { taskService } = useContext(DependencyContext);
  const navigate = useNavigate();

  

  const [title, setTitle] = useState(taskTitle ?? "");
  const [description, setDescription] = useState(taskDescription ?? "");

  useEffect(() => {
    setTitle(taskTitle ?? "");
    setDescription(taskDescription ?? "");
  }, [taskTitle, taskDescription]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const addTask = () => {
    let _task = new Task(taskId , title, description);
    taskService.CreateTask(_task);
  };


  const updateTask = () => {
    let _task = new Task(taskId , title, description);
    taskService.UpdateTask(_task);
  }

  const handleCancel = () => {
    navigate('/mytasks');

  }



  return (
    <div className={styles.maincontainer}>
      <div className={styles.taskformcontainer}>
        <div className={styles.taskformelementcontainer}>         
         
            <TextBox onChange={handleInputChange} value={title} placeholder="Title"></TextBox>
        
        </div>
        <div className={styles.taskformelementcontainer}>
            <MultiLineTextBox rows={20} onChange={handleTextAreaInputChange} value={description} placeholder="Description"></MultiLineTextBox>
        </div>

        <div className={`${styles.taskformelementcontainer} ${styles.taskformelementbuttoncontainer}`}>

          {!editMode && <button className={`${styles.taskformbutton} ${styles.taskformokbutton}`} onClick={addTask}>
            Add
          </button>}
          {editMode && <button className={`${styles.taskformbutton} ${styles.taskformokbutton}`} onClick={updateTask}>
            Save
          </button>
          }

          <button className={styles.taskformbutton} onClick={handleCancel}>cancel</button>
        </div>



      </div>


    </div>
  )

}