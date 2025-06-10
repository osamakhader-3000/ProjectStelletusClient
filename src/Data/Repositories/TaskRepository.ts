import Task from "../../Domain/Entities/Task";
import { ITaskRepository } from "../../Domain/Repositories/ITaskRepository";
import { ITaskApi } from "../api/Interfaces/ITaskApi";

export class TaskRepository implements ITaskRepository{

    taskApi:ITaskApi;

    constructor(taskApi:ITaskApi){
        this.taskApi = taskApi;
    }

    async ListTasks(): Promise<Task[]> {
       return this.taskApi.ListTasks();
    }

    async GetTask(taskID: string): Promise<Task> {
        return this.taskApi.GetTask(taskID);
    }

    async DeleteTask(taskID: string): Promise<void> {
        this.taskApi.DeleteTask(taskID);
    }

    async SaveTask(task: Task): Promise<void> {
        this.taskApi.SaveTask(task);
    }



}
