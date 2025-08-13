import Task from "../../../Domain/Entities/Task";
import { ITaskApi } from "../Interfaces/ITaskApi";
import urls from '../urls.json'
import axios from 'axios';

export class TaskApi implements ITaskApi{
    private token:string;
    private baseUrl:string;

    constructor(){
        this.baseUrl = urls['tasksdomain'];
        this.token = localStorage.getItem("token")??'';
    }

    async ListTasks(): Promise<Task[]> {
        let url = urls["list-tasks"];
        const response = await axios.get(`${this.baseUrl}/${url}`,
           {
            headers:{
                Authorization: `Bearer ${this.token}`
            }
           }
        );
        return response.data.map((t:Task)=>({
            id:t.id,
            title:t.title,
            description:t.description
        }));
    }

    async GetTask(taskID: string): Promise<Task> {
        let url = urls['task-get'];
        const response = await axios.get(`${this.baseUrl}/${url}`,
            {
                params:{taskID:taskID},
                headers:{Authorization: `Bearer ${this.token}`}
            }
        );
        return response.data.map((t:Task)=>({
            id:t.id,
            title:t.title,
            description:t.description
        }));
    }

    async SaveTask(task: Task): Promise<void> {
        let url = urls['task-create'];
         await axios.post(`${this.baseUrl}/${url}`
            ,task
            ,{
                headers:{Authorization: `Bearer ${this.token}`}
            }
        );
    }

    async DeleteTask(taskID: string): Promise<void> {
        let url = urls['task-delete'];
        await axios.delete(`${this.baseUrl}/${url}`,
            {
                headers:{Authorization: `Bearer ${this.token}`},
                params:{taskID:taskID}
            });
    }

}