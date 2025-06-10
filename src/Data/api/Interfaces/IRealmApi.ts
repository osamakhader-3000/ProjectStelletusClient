import Realm from "../../DataTransferObjects/Realm"

export interface IRealmApi{
    listRealmsByName(name: string): Promise<Realm[]>
}