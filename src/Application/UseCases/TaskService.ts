import Task from "../../Domain/Entities/Task";
import { ITaskService } from "../Services/ITaskService";
import { ITaskRepository } from "../../Domain/Repositories/ITaskRepository";


export class TaskService implements ITaskService{

    taskRepository:ITaskRepository;

    constructor(taskRepository:ITaskRepository){
        this.taskRepository = taskRepository;
    }

    async ListTask(): Promise<Task[]> {
        return this.taskRepository.ListTasks();
    }

    async DeleteTask(taskID: string): Promise<void> {
        this.taskRepository.DeleteTask(taskID);
    }

    async SaveTask(task: Task): Promise<void> {
        this.taskRepository.SaveTask(task);
    }

    async GetTask(taskID: string): Promise<Task> {
       return this.taskRepository.GetTask(taskID);
    }

    



}


