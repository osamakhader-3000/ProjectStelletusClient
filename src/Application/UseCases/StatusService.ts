import Status from "../../Domain/Entities/Status";
import { IStatusService } from "../Services/IStatusService";
import { IStatusRepository } from "../../Domain/Repositories/IStatusRepository";

export class StatusService implements IStatusService{
    statusRepository:IStatusRepository;

    constructor(statusRepository:IStatusRepository){
        this.statusRepository=statusRepository;
    }

    ListStatuses(realmID: number): Promise<Status[]> {
        return this.statusRepository.ListStatuses(realmID);
    }

}
