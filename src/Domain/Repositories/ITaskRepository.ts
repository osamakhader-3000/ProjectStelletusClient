import Task from "../Entities/Task";

export interface ITaskRepository{
    GetTask(taskID:string):Promise<Task>;
    ListTasks():Promise<Task[]>;
    DeleteTask(taskID:string):Promise<void>;   
    SaveTask(task:Task):Promise<void>; 
}