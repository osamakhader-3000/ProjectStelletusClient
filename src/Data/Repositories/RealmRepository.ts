import Realm from "../../Domain/Entities/Realm";
import { IRealmRepository } from "../../Domain/Repositories/IRealmRepository";
import { IRealmApi } from "../api/Interfaces/IRealmApi";

export class RealmRepository implements IRealmRepository {
    datasource:IRealmApi

    constructor(datasource:IRealmApi){
        this.datasource = datasource;
    }


    listRealmsByName(name: string): Promise<Realm[]> {
       return this.datasource.listRealmsByName(name);
    }
    

}