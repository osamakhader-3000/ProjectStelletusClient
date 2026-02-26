import Realm from '../../Domain/Entities/Realm'

export interface IRealmService{
    
    listRealmsByName(name:string): Promise<Realm[]>;
}