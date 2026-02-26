import { IRealmService } from "../Interfaces/IRealmService";
import { IRealmRepository } from "../../Domain/Repositories/IRealmRepository";
import Realm from "../../Domain/Entities/Realm";


export class RealmService implements IRealmService {

    realmsRepository:IRealmRepository;

    constructor(realmsRepository:IRealmRepository){
        this.realmsRepository = realmsRepository;
    }

    async listRealmsByName(name: string): Promise<Realm[]> {
       return this.realmsRepository.listRealmsByName(name);
    }

}