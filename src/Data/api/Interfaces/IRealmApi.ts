import Realm from "../../../Domain/Entities/Realm"

export interface IRealmApi{
    listRealmsByName(name: string): Promise<Realm[]>
}