import Status from "../Entities/Status";

export interface IStatusRepository{
    ListStatuses(realmID:number):Promise<Status[]>;
    
}