import Task from "../../Domain/Entities/Task";

export interface ITaskService{
    ListTask():Promise<Task[]>;
    DeleteTask(taskID:string):Promise<void>;
    GetTask(taskID:string):Promise<Task>;
    SaveTask(task:Task):Promise<void>;
}