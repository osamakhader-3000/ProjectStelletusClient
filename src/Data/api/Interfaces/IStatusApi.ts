import Status from "../../../Domain/Entities/Status";

export interface IStatusApi
{
    ListStatuses(realmid:number):Promise<Status[]>
}