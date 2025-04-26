import urls from './urls.json'
import Task from '../DataTransferObjects/Task'

const tasksdomain = urls['tasksdomain'];

export function ListTasks() {
    const fetchData = async () => {
      try {
  
        var url = tasksdomain + urls["list-tasks"]+'?';   
         

        const token = localStorage.getItem("jwt");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        
        return data;
  
      } catch (error) {
        console.error(error);
      }
    };
    return  fetchData(); // Call the async function
    
  }

  
export function SaveTask(task:Task,afterFunc:Function){
    const saveData = async () => {
      const response = await fetch(tasksdomain + urls["task-create"], {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
        });
        
        if (response.ok) {
          if(afterFunc != null && typeof afterFunc == 'function')
          afterFunc();
        
        } else {
          console.log(JSON.stringify(task));
        }
      }
  
      return saveData();
  
  }
  
  
  export function GetTask(taskid:string) {
    
    const fetchData = async () => {
      try {
        const create = urls["task-create"];
        const url = `${tasksdomain}${create}/${taskid}`;
         
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        return data;
  
      } catch (error) {
        console.error(error);
      }
    };
    return  fetchData(); // Call the async function
  
  }
  
  export function DeleteTask(taskid:string){
    const fetchData = async () => {
      try {
        const deleteUrl = urls["task-delete"];
        const url = `${tasksdomain}${deleteUrl}/${taskid}`;
         
        const response = await fetch(url,{method: 'DELETE',headers: {
          "Content-Type": "application/json"
        }});        
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    return  fetchData(); // Call the async function
  }