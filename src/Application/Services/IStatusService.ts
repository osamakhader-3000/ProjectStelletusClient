import Status from "../../Domain/Entities/Status";

export interface IStatusService{
    ListStatuses(realmID:number):Promise<Status[]>;
}