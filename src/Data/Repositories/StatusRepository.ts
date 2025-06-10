import Status from "../../Domain/Entities/Status";
import { IStatusRepository } from "../../Domain/Repositories/IStatusRepository";
import { IStatusApi } from "../api/Interfaces/IStatusApi";

export class StatusRepository implements IStatusRepository{

    statusApi:IStatusApi;

    constructor(statusApi:IStatusApi){
        this.statusApi = statusApi;
    }

    async ListStatuses(realmID: number): Promise<Status[]> {
        return this.ListStatuses(realmID);
    }

}