import Task from "../../../Domain/Entities/Task";
import { ITaskApi } from "../Interfaces/ITaskApi";
import urls from '../urls.json'
import { GeneralApi } from "./GeneralApi";
import { GeneralApiResult } from "../../DataTransferObjects/GeneralApiResult";

export class TaskApi extends GeneralApi implements ITaskApi{
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = urls['steletus-app'];
    }

    async ListTasks(): Promise<GeneralApiResult<Task[]>> {
        let url = `${this.baseUrl}/${urls['tasks-list']}`;
        let result = await this.GeneralApiCaller<Task[]>('GET', url);
        return result;
    }

    async GetTask(taskID: string): Promise<GeneralApiResult<Task>> {
        let url = `${this.baseUrl}/${urls['task-get']}`;
        let result = await this.GeneralApiCaller<Task>('GET', url, {taskID:taskID});
        return result;
        
    }

    async CreateTask(task: Task): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['task-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, task);
        return result;
    }

    async UpdateTask(task: Task): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['task-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, task);
        return result;
    }

    async DeleteTask(taskID: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['task-delete']}`;
        let result = await this.GeneralApiCaller<boolean>('DELETE', url, {taskID:taskID});
        return result;
    }

}