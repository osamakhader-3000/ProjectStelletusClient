import Task from "../../../Domain/Entities/Task";

export interface ITaskApi{
    ListTasks():Promise<Task[]>;

    SaveTask(task:Task):void;

    GetTask(taskID:string):Promise<Task>;

    DeleteTask(taskID:string):Promise<void>;
}