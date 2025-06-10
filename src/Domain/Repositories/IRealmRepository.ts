import Realm from '../Entities/Realm';

export interface IRealmRepository {

  listRealmsByName(name:string): Promise<Realm[]>;  
}